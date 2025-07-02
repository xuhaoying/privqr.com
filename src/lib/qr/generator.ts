import QRCode from 'qrcode';
import { QROptions, QRGenerationResult, QRErrorCorrectionLevel } from '@/types/qr';

export class QRGenerator {
  private static instance: QRGenerator;

  private constructor() {}

  static getInstance(): QRGenerator {
    if (!QRGenerator.instance) {
      QRGenerator.instance = new QRGenerator();
    }
    return QRGenerator.instance;
  }

  async generateQR(options: QROptions): Promise<QRGenerationResult> {
    try {
      const qrOptions: QRCode.QRCodeToDataURLOptions = {
        width: options.size || 400,
        margin: options.margin || 4,
        errorCorrectionLevel: options.errorCorrectionLevel || 'M',
        color: {
          dark: options.color?.dark || '#000000',
          light: options.color?.light || '#FFFFFF',
        },
      };

      let data = options.data;

      // Format data based on type
      switch (options.type) {
        case 'url':
          // Ensure URL is properly formatted
          if (!data.startsWith('http://') && !data.startsWith('https://')) {
            data = 'https://' + data;
          }
          break;
        case 'wifi':
          // WiFi format: WIFI:T:WPA;S:mynetwork;P:mypass;;
          const wifiData = JSON.parse(data);
          data = `WIFI:T:${wifiData.security || 'WPA'};S:${wifiData.ssid};P:${wifiData.password};;`;
          break;
        case 'contact':
          // vCard format
          const contact = JSON.parse(data);
          data = this.generateVCard(contact);
          break;
      }

      const dataUrl = await QRCode.toDataURL(data, qrOptions);

      // Apply logo if provided
      if (options.logo) {
        return await this.addLogoToQR(dataUrl, options.logo);
      }

      return {
        success: true,
        data: dataUrl,
        format: 'png',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private generateVCard(contact: any): string {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${contact.name || ''}`,
      `TEL:${contact.phone || ''}`,
      `EMAIL:${contact.email || ''}`,
      `ORG:${contact.organization || ''}`,
      'END:VCARD',
    ];
    return vcard.join('\\n');
  }

  private async addLogoToQR(qrDataUrl: string, logo: QROptions['logo']): Promise<QRGenerationResult> {
    if (!logo) {
      return { success: true, data: qrDataUrl, format: 'png' };
    }

    try {
      // Create canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      // Load QR image
      const qrImg = new Image();
      await new Promise((resolve, reject) => {
        qrImg.onload = resolve;
        qrImg.onerror = reject;
        qrImg.src = qrDataUrl;
      });

      canvas.width = qrImg.width;
      canvas.height = qrImg.height;
      ctx.drawImage(qrImg, 0, 0);

      // Load and draw logo
      const logoImg = new Image();
      await new Promise((resolve, reject) => {
        logoImg.onload = resolve;
        logoImg.onerror = reject;
        logoImg.src = logo.src;
      });

      const logoSize = logo.width || qrImg.width * 0.2;
      const logoX = (qrImg.width - logoSize) / 2;
      const logoY = (qrImg.height - logoSize) / 2;
      const padding = logo.padding || 10;

      // Draw white background for logo
      ctx.fillStyle = 'white';
      ctx.fillRect(logoX - padding, logoY - padding, logoSize + padding * 2, logoSize + padding * 2);

      // Draw logo
      ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

      return {
        success: true,
        data: canvas.toDataURL('image/png'),
        format: 'png',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to add logo',
      };
    }
  }

  async generateSVG(options: QROptions): Promise<QRGenerationResult> {
    try {
      const qrSvg = require('qrcode-svg');
      const svg = new qrSvg({
        content: options.data,
        padding: options.margin || 4,
        width: options.size || 256,
        height: options.size || 256,
        color: options.color?.dark || '#000000',
        background: options.color?.light || '#FFFFFF',
        ecl: options.errorCorrectionLevel || 'M',
      });

      return {
        success: true,
        data: svg.svg(),
        format: 'svg',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate SVG',
      };
    }
  }
}