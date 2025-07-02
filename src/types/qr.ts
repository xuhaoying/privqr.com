export type QRType = 'text' | 'url' | 'wifi' | 'contact' | 'crypto' | 'matter';

export type QRErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QROptions {
  type: QRType;
  data: string;
  size?: number;
  margin?: number;
  errorCorrectionLevel?: QRErrorCorrectionLevel;
  color?: {
    dark?: string;
    light?: string;
  };
  logo?: {
    src: string;
    width?: number;
    height?: number;
    padding?: number;
  };
}

export interface QRGenerationResult {
  success: boolean;
  data?: string;
  format?: 'png' | 'svg' | 'pdf' | 'eps';
  error?: string;
}

export interface BatchQRItem {
  id: string;
  type: QRType;
  data: string;
  label?: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  result?: QRGenerationResult;
}

export interface GenerationStats {
  dailyCount: number;
  dailyLimit: number;
  batchCount: number;
  batchLimit: number;
  lastReset: Date;
}