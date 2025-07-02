import { BitcoinPaymentRequest } from '@/types/crypto';

export class BitcoinQR {
  static generateBIP21URI(request: BitcoinPaymentRequest): string {
    let uri = `bitcoin:${request.address}`;
    const params: string[] = [];

    if (request.amount !== undefined && request.amount > 0) {
      params.push(`amount=${request.amount}`);
    }

    if (request.label) {
      params.push(`label=${encodeURIComponent(request.label)}`);
    }

    if (request.message) {
      params.push(`message=${encodeURIComponent(request.message)}`);
    }

    if (params.length > 0) {
      uri += '?' + params.join('&');
    }

    return uri;
  }

  static validateAddress(address: string): boolean {
    // Basic validation for different Bitcoin address formats
    const patterns = {
      // P2PKH addresses start with 1
      p2pkh: /^1[a-km-zA-HJ-NP-Z1-9]{25,34}$/,
      // P2SH addresses start with 3
      p2sh: /^3[a-km-zA-HJ-NP-Z1-9]{25,34}$/,
      // Native SegWit (bech32) addresses start with bc1
      bech32: /^bc1[a-z0-9]{39,59}$/,
      // Testnet addresses
      testnet: /^(tb1|[mn2])[a-km-zA-HJ-NP-Z1-9]{25,59}$/,
    };

    return Object.values(patterns).some(pattern => pattern.test(address));
  }

  static parseBIP21URI(uri: string): BitcoinPaymentRequest | null {
    const match = uri.match(/^bitcoin:([^?]+)(\?(.+))?$/);
    if (!match) return null;

    const address = match[1];
    const request: BitcoinPaymentRequest = { address };

    if (match[3]) {
      const params = new URLSearchParams(match[3]);
      
      const amount = params.get('amount');
      if (amount) {
        request.amount = parseFloat(amount);
      }

      const label = params.get('label');
      if (label) {
        request.label = decodeURIComponent(label);
      }

      const message = params.get('message');
      if (message) {
        request.message = decodeURIComponent(message);
      }
    }

    return request;
  }
}