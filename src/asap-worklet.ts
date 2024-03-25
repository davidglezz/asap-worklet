import { ASAP, ASAPSampleFormat } from './asap-web/asap.js';

/// <reference types="@types/audioworklet" />

// This is a workaround to make the TextDecoder available in the AudioWorkletGlobalScope
(globalThis as any).TextDecoder = class TextDecoder {
  decode(buffer: Uint8Array) {
    return String.fromCharCode(...buffer);
  }
};

/** Types to define the comunication between the AudioWorklet and the Node. */
export interface InputMessagesMap {
  load: { songData: ArrayBuffer };
  setPosition: { value: number };
}

export interface OutputMessagesMap {
  songInfo: { songInfo: ASAP };
  position: { value: number };
  log: { severity: 'info' | 'warn' | 'error'; message: string };
}

type Id<T extends object, R = { [ID in keyof T]: { id: ID } & T[ID] }[keyof T]> = NonNullable<{
  [P in keyof R]: R[P];
}>;
export type InputMessages = Id<InputMessagesMap>;
export type OutputMessages = Id<OutputMessagesMap>;

type MessageHandler<T = InputMessagesMap> = { [ID in keyof T]: (params: T[ID]) => void };

class ASAPProcessor
  extends AudioWorkletProcessor
  implements AudioWorkletProcessorImpl, MessageHandler
{
  asap = new ASAP();
  channels = 0;

  constructor() {
    super();
    this.port.onmessage = (ev: MessageEvent<InputMessages>) => {
      const { id, ...params } = ev.data;
      // @ts-expect-error - Params depends on the message id
      this[id]?.(params);
    };
  }

  process(_input: never, outputs: Float32Array[][], _params: never): boolean {
    if (this.channels === 0) return true;

    const output = outputs[0];
    const length = output[0].length;
    const left = output[0];
    const right = output[1];

    const buffer = new Uint8Array(length * this.channels);

    this.asap.generate(buffer, buffer.length, ASAPSampleFormat.U8);

    if (this.channels === 1) {
      for (let i = 0; i < length; i++) {
        left[i] = right[i] = (buffer[i] - 128) / 128;
      }
    } else {
      for (let i = 0; i < length; i++) {
        left[i] = (buffer[i * 2] - 128) / 128;
        right[i] = (buffer[i * 2 + 1] - 128) / 128;
      }
    }

    const info = this.asap.getInfo();
    const duration = info.getDuration(info.getDefaultSong());
    const position = this.asap.getPosition();
    const value = (position / duration) % duration;
    this.port.postMessage({ id: 'position', value });

    return true;
  }

  setPosition({ value }: InputMessagesMap['setPosition']) {
    if (!this.channels) return;
    const info = this.asap.getInfo();
    const duration = info.getDuration(info.getDefaultSong());
    this.asap.seek(Math.floor(value * duration));
  }

  load({ songData }: InputMessagesMap['load']) {
    const content = new Uint8Array(songData);
    this.asap.load('x.sap', content, content.length);
    const info = this.asap.getInfo();
    this.channels = info.getChannels();
    const songIndex = info.getDefaultSong();
    this.asap.playSong(songIndex, -1);
    this.port.postMessage({ id: 'songInfo', songInfo: this.getSongInfo() });
    this.port.postMessage({ id: 'position', value: 0 });
  }

  getSongInfo() {
    const info = this.asap.getInfo();
    return {
      Name: `${info.getAuthor()} - ${info.getTitle()}`,
      Duration: info.getDuration(info.getDefaultSong()),
    };
  }
}

registerProcessor('asap', ASAPProcessor);
