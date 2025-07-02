export interface MatterDeviceInfo {
  vendorId: number | string;
  productId: number | string;
  setupPin: string;
  discriminator: number;
  commissioningFlow?: 0 | 1 | 2;
  discoveryCapabilities?: number;
  version?: number;
}

export interface MatterTLVField {
  tag: number;
  type: 'uint' | 'string' | 'bytes';
  value: any;
}

export interface MatterValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  tlvData?: MatterTLVField[];
}

export interface MatterQROptions {
  device: MatterDeviceInfo;
  includeVersionInfo?: boolean;
  validateVidPid?: boolean;
  generateNdefPayload?: boolean;
}