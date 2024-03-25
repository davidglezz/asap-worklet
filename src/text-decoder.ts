export function TextDecoderInstall() {
  // TextDecoder polyfill
  if (typeof TextDecoder === 'undefined') {
    globalThis.TextDecoder = class TextDecoder {
      decode(buffer: Uint8Array) {
        return String.fromCharCode(...buffer);
      }
    };
  }
}
