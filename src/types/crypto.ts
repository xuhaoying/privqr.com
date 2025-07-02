export type CryptoType = 'bitcoin' | 'ethereum' | 'lightning';

export interface BitcoinPaymentRequest {
  address: string;
  amount?: number;
  label?: string;
  message?: string;
}

export interface EthereumPaymentRequest {
  address: string;
  amount?: string;
  gasLimit?: string;
  gasPrice?: string;
  data?: string;
  chainId?: number;
}

export interface LightningInvoice {
  invoice: string;
  amount?: number;
  description?: string;
  expiry?: number;
}

export type CryptoPaymentRequest = 
  | { type: 'bitcoin'; data: BitcoinPaymentRequest }
  | { type: 'ethereum'; data: EthereumPaymentRequest }
  | { type: 'lightning'; data: LightningInvoice };

export interface CryptoQROptions {
  payment: CryptoPaymentRequest;
  includeIcon?: boolean;
  format?: 'uri' | 'address';
}