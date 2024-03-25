import type { InputMessages, OutputMessages } from './asap-worklet';

interface EventMap {
  songInfo: CustomEvent<{ songInfo: any }>;
  position: CustomEvent<{ value: number }>;
  log: CustomEvent<{ severity: 'info' | 'warn' | 'error'; message: string }>;
}

export class ASAPNode extends AudioWorkletNode {
  constructor(context: AudioContext) {
    super(context, 'asap', {
      outputChannelCount: [2],
      numberOfInputs: 0,
      numberOfOutputs: 1,
    });

    this.handleMessages();
  }

  protected handleMessages() {
    this.port.onmessage = (ev: MessageEvent<OutputMessages>) => {
      const { id, ...detail } = ev.data;
      this.dispatchEvent(new CustomEvent(id, { detail }));
    };
  }

  on<K extends keyof EventMap>(id: K, callback: (event: EventMap[K]) => void) {
    this.addEventListener(id, callback as EventListener);
  }

  protected sendMessage(message: InputMessages) {
    this.port.postMessage(message);
  }

  load(songData: ArrayBuffer) {
    this.sendMessage({ id: 'load', songData });
  }

  setPosition(value: number) {
    this.sendMessage({ id: 'setPosition', value });
  }
}
