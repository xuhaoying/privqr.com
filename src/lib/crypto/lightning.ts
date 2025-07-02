import { LightningInvoice } from '@/types/crypto';

export class LightningQR {
  static formatInvoice(invoice: LightningInvoice): string {
    // Lightning invoices are already in the correct format (lnbc...)
    // Just ensure it's uppercase for QR code compatibility
    return invoice.invoice.toUpperCase();
  }

  static validateInvoice(invoice: string): boolean {
    // Basic validation for Lightning invoice format
    // Real validation would require bech32 decoding and signature verification
    const pattern = /^ln(bc|tb|tbs|bcrt)\d+[munp]?[0-9a-z]+$/i;
    return pattern.test(invoice);
  }

  static parseInvoice(invoice: string): Partial<LightningInvoice> {
    // Basic parsing - full implementation would decode the bech32 invoice
    const result: Partial<LightningInvoice> = {
      invoice: invoice.toLowerCase(),
    };

    // Extract amount if present
    const amountMatch = invoice.match(/^ln(?:bc|tb|tbs|bcrt)(\d+)([munp]?)/i);
    if (amountMatch) {
      const [, amount, multiplier] = amountMatch;
      const multipliers: { [key: string]: number } = {
        m: 0.001,
        u: 0.000001,
        n: 0.000000001,
        p: 0.000000000001,
      };
      
      const satoshis = multiplier
        ? parseFloat(amount) * multipliers[multiplier] * 100000000
        : parseFloat(amount);
      
      result.amount = satoshis;
    }

    return result;
  }

  static generateLNURL(url: string): string {
    // LNURL is just a bech32-encoded URL
    // For simplicity, we'll return the URL prefixed with "lightning:"
    return `lightning:${url}`;
  }

  static isLNURL(data: string): boolean {
    return data.toLowerCase().startsWith('lnurl') || data.startsWith('lightning:lnurl');
  }

  static getInvoiceExpiry(invoice: string): number | null {
    // In a real implementation, this would decode the invoice and extract the expiry
    // Default Lightning invoice expiry is 3600 seconds (1 hour)
    return 3600;
  }
}