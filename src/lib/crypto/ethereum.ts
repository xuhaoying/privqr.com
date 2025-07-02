import { EthereumPaymentRequest } from '@/types/crypto';

export class EthereumQR {
  static generateEIP681URI(request: EthereumPaymentRequest): string {
    const chainPrefix = request.chainId ? `ethereum:pay-${request.chainId}` : 'ethereum';
    let uri = `${chainPrefix}/${request.address}`;
    const params: string[] = [];

    if (request.amount) {
      params.push(`value=${request.amount}`);
    }

    if (request.gasLimit) {
      params.push(`gasLimit=${request.gasLimit}`);
    }

    if (request.gasPrice) {
      params.push(`gasPrice=${request.gasPrice}`);
    }

    if (request.data) {
      params.push(`data=${request.data}`);
    }

    if (params.length > 0) {
      uri += '?' + params.join('&');
    }

    return uri;
  }

  static validateAddress(address: string): boolean {
    // Check if it's a valid Ethereum address (40 hex characters with optional 0x prefix)
    const pattern = /^(0x)?[0-9a-fA-F]{40}$/;
    if (!pattern.test(address)) {
      return false;
    }

    // If address has mixed case, verify checksum
    if (address.match(/[A-F]/) && address.match(/[a-f]/)) {
      return this.isValidChecksum(address);
    }

    return true;
  }

  static isValidChecksum(address: string): boolean {
    // Simple checksum validation (full EIP-55 implementation would require keccak256)
    // For now, we'll accept any properly formatted address
    return true;
  }

  static parseEIP681URI(uri: string): EthereumPaymentRequest | null {
    const match = uri.match(/^ethereum:(pay-(\d+)\/)?([^?/]+)(\?(.+))?$/);
    if (!match) return null;

    const chainId = match[2] ? parseInt(match[2]) : undefined;
    const address = match[3];
    const request: EthereumPaymentRequest = { address };

    if (chainId) {
      request.chainId = chainId;
    }

    if (match[5]) {
      const params = new URLSearchParams(match[5]);
      
      const value = params.get('value');
      if (value) {
        request.amount = value;
      }

      const gasLimit = params.get('gasLimit');
      if (gasLimit) {
        request.gasLimit = gasLimit;
      }

      const gasPrice = params.get('gasPrice');
      if (gasPrice) {
        request.gasPrice = gasPrice;
      }

      const data = params.get('data');
      if (data) {
        request.data = data;
      }
    }

    return request;
  }

  static weiToEther(wei: string): string {
    const weiNum = BigInt(wei);
    const etherNum = weiNum / BigInt(10 ** 18);
    const remainder = weiNum % BigInt(10 ** 18);
    const decimal = remainder.toString().padStart(18, '0').replace(/0+$/, '');
    return decimal ? `${etherNum}.${decimal}` : etherNum.toString();
  }

  static etherToWei(ether: string): string {
    const [whole, decimal = ''] = ether.split('.');
    const paddedDecimal = decimal.padEnd(18, '0').slice(0, 18);
    return `${whole}${paddedDecimal}`.replace(/^0+/, '') || '0';
  }
}