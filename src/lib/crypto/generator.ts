import { CryptoQROptions, CryptoPaymentRequest } from '@/types/crypto';
import { QROptions } from '@/types/qr';
import { BitcoinQR } from './bitcoin';
import { EthereumQR } from './ethereum';
import { LightningQR } from './lightning';

export class CryptoQRGenerator {
  static generateCryptoQR(options: CryptoQROptions): QROptions {
    const { payment } = options;
    let data = '';

    switch (payment.type) {
      case 'bitcoin':
        data = BitcoinQR.generateBIP21URI(payment.data);
        break;
      case 'ethereum':
        data = EthereumQR.generateEIP681URI(payment.data);
        break;
      case 'lightning':
        data = LightningQR.formatInvoice(payment.data);
        break;
    }

    return {
      type: 'crypto',
      data,
      errorCorrectionLevel: 'M', // Medium error correction for crypto QRs
    };
  }

  static validateCryptoAddress(type: CryptoPaymentRequest['type'], address: string): boolean {
    switch (type) {
      case 'bitcoin':
        return BitcoinQR.validateAddress(address);
      case 'ethereum':
        return EthereumQR.validateAddress(address);
      case 'lightning':
        return LightningQR.validateInvoice(address);
      default:
        return false;
    }
  }

  static parseCryptoURI(uri: string): CryptoPaymentRequest | null {
    if (uri.startsWith('bitcoin:')) {
      const data = BitcoinQR.parseBIP21URI(uri);
      return data ? { type: 'bitcoin', data } : null;
    }

    if (uri.startsWith('ethereum:')) {
      const data = EthereumQR.parseEIP681URI(uri);
      return data ? { type: 'ethereum', data } : null;
    }

    if (uri.match(/^ln(bc|tb|tbs|bcrt)/i) || uri.startsWith('lightning:')) {
      const invoice = uri.replace('lightning:', '');
      const parsed = LightningQR.parseInvoice(invoice);
      return {
        type: 'lightning',
        data: {
          invoice,
          ...parsed,
        },
      };
    }

    return null;
  }

  static getCryptoIcon(type: CryptoPaymentRequest['type']): string {
    const icons = {
      bitcoin: '₿',
      ethereum: 'Ξ',
      lightning: '⚡',
    };
    return icons[type] || '';
  }
}