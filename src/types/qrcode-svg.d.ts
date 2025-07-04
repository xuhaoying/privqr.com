declare module 'qrcode-svg' {
  interface QRCodeSVGOptions {
    content: string;
    padding?: number;
    width?: number;
    height?: number;
    color?: string;
    background?: string;
    ecl?: string;
  }

  class QRCodeSVG {
    constructor(options: QRCodeSVGOptions);
    svg(): string;
  }

  export = QRCodeSVG;
}