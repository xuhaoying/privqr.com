import { MatterDeviceInfo, MatterQROptions, MatterValidationResult } from '@/types/matter';
import { QROptions } from '@/types/qr';
import { TLVEncoder } from './tlv';

export class MatterQRGenerator {
  private static readonly VERSION = 0;
  private static readonly MATTER_PREFIX = 'MT:';
  
  // Known vendor IDs (partial list for validation)
  private static readonly KNOWN_VENDOR_IDS = new Set([
    0x0000, // Test Vendor
    0xFFF1, // Test Vendor 1
    0xFFF2, // Test Vendor 2
    0xFFF3, // Test Vendor 3
    0xFFF4, // Test Vendor 4
    // Add more as needed
  ]);

  static generateMatterQR(options: MatterQROptions): QROptions {
    const { device } = options;
    const validation = this.validateDevice(device, options.validateVidPid);
    
    if (!validation.valid) {
      throw new Error(`Invalid Matter device: ${validation.errors.join(', ')}`);
    }

    const payload = this.generatePayload(device, options);
    
    return {
      type: 'matter',
      data: this.MATTER_PREFIX + payload,
      errorCorrectionLevel: 'M',
    };
  }

  static validateDevice(device: MatterDeviceInfo, validateVidPid = true): MatterValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Convert hex string to number if needed
    const vendorId = typeof device.vendorId === 'string' 
      ? parseInt(device.vendorId, 16) 
      : device.vendorId;
    const productId = typeof device.productId === 'string'
      ? parseInt(device.productId, 16)
      : device.productId;

    // Validate Vendor ID
    if (vendorId < 0 || vendorId > 0xFFFF) {
      errors.push('Vendor ID must be between 0x0000 and 0xFFFF');
    } else if (validateVidPid && !this.KNOWN_VENDOR_IDS.has(vendorId)) {
      warnings.push('Vendor ID not in known vendor list');
    }

    // Validate Product ID
    if (productId < 0 || productId > 0xFFFF) {
      errors.push('Product ID must be between 0x0000 and 0xFFFF');
    }

    // Validate Setup PIN (8 digits, not all same, not sequential)
    if (!/^\d{8}$/.test(device.setupPin)) {
      errors.push('Setup PIN must be exactly 8 digits');
    } else {
      const pin = device.setupPin;
      if (pin === '11111111' || pin === '22222222' || pin === '12345678' || pin === '87654321') {
        warnings.push('Setup PIN should not be easily guessable');
      }
      
      // Check if PIN is valid (not 00000000, 11111111, etc.)
      const pinNum = parseInt(pin);
      if (pinNum < 1 || pinNum > 99999998) {
        errors.push('Setup PIN must be between 00000001 and 99999998');
      }
    }

    // Validate Discriminator (12 bits)
    if (device.discriminator < 0 || device.discriminator > 4095) {
      errors.push('Discriminator must be between 0 and 4095 (12 bits)');
    }

    // Validate Commissioning Flow
    if (device.commissioningFlow !== undefined) {
      if (![0, 1, 2].includes(device.commissioningFlow)) {
        errors.push('Commissioning flow must be 0 (Standard), 1 (User Action), or 2 (Custom)');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  static generatePayload(device: MatterDeviceInfo, options: MatterQROptions): string {
    const vendorId = typeof device.vendorId === 'string' 
      ? parseInt(device.vendorId, 16) 
      : device.vendorId;
    const productId = typeof device.productId === 'string'
      ? parseInt(device.productId, 16)
      : device.productId;

    // Create the onboarding payload
    // Format: Version(3) || VendorID(16) || ProductID(16) || Flow(2) || DiscoveryCapabilities(8) || Discriminator(12) || Passcode(27)
    let payload = 0n;
    let offset = 0;

    // Version (3 bits)
    payload |= BigInt(this.VERSION) << BigInt(offset);
    offset += 3;

    // Vendor ID (16 bits)
    payload |= BigInt(vendorId) << BigInt(offset);
    offset += 16;

    // Product ID (16 bits)
    payload |= BigInt(productId) << BigInt(offset);
    offset += 16;

    // Commissioning Flow (2 bits)
    const flow = device.commissioningFlow ?? 0;
    payload |= BigInt(flow) << BigInt(offset);
    offset += 2;

    // Discovery Capabilities (8 bits)
    const discoveryCapabilities = device.discoveryCapabilities ?? 0x04; // BLE by default
    payload |= BigInt(discoveryCapabilities) << BigInt(offset);
    offset += 8;

    // Discriminator (12 bits)
    payload |= BigInt(device.discriminator) << BigInt(offset);
    offset += 12;

    // Passcode (27 bits)
    const passcode = parseInt(device.setupPin);
    payload |= BigInt(passcode) << BigInt(offset);

    // Convert to base38 string
    return this.toBase38(payload);
  }

  private static toBase38(value: bigint): string {
    const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-.';
    let result = '';
    
    while (value > 0n) {
      result = charset[Number(value % 38n)] + result;
      value = value / 38n;
    }
    
    return result || '0';
  }

  static parsePayload(payload: string): MatterDeviceInfo | null {
    try {
      // Remove prefix if present
      const data = payload.replace(this.MATTER_PREFIX, '');
      
      // Convert from base38 to bigint
      const value = this.fromBase38(data);
      
      // Extract fields
      let offset = 0;
      
      // Version (3 bits)
      const version = Number((value >> BigInt(offset)) & 0x7n);
      offset += 3;
      
      // Vendor ID (16 bits)
      const vendorId = Number((value >> BigInt(offset)) & 0xFFFFn);
      offset += 16;
      
      // Product ID (16 bits)
      const productId = Number((value >> BigInt(offset)) & 0xFFFFn);
      offset += 16;
      
      // Commissioning Flow (2 bits)
      const commissioningFlow = Number((value >> BigInt(offset)) & 0x3n) as 0 | 1 | 2;
      offset += 2;
      
      // Discovery Capabilities (8 bits)
      const discoveryCapabilities = Number((value >> BigInt(offset)) & 0xFFn);
      offset += 8;
      
      // Discriminator (12 bits)
      const discriminator = Number((value >> BigInt(offset)) & 0xFFFn);
      offset += 12;
      
      // Passcode (27 bits)
      const passcode = Number((value >> BigInt(offset)) & 0x7FFFFFFn);
      const setupPin = passcode.toString().padStart(8, '0');
      
      return {
        vendorId,
        productId,
        setupPin,
        discriminator,
        commissioningFlow,
        discoveryCapabilities,
        version,
      };
    } catch (error) {
      return null;
    }
  }

  private static fromBase38(str: string): bigint {
    const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-.';
    let result = 0n;
    
    for (const char of str) {
      const value = charset.indexOf(char);
      if (value === -1) {
        throw new Error(`Invalid character in base38 string: ${char}`);
      }
      result = result * 38n + BigInt(value);
    }
    
    return result;
  }

  static generateTLVPayload(device: MatterDeviceInfo): Uint8Array {
    const encoder = new TLVEncoder();
    
    // Add TLV fields based on Matter specification
    encoder.writeField({ tag: 0, type: 'uint', value: parseInt(device.setupPin) });
    encoder.writeField({ tag: 1, type: 'uint', value: device.discriminator });
    
    const vendorId = typeof device.vendorId === 'string' 
      ? parseInt(device.vendorId, 16) 
      : device.vendorId;
    const productId = typeof device.productId === 'string'
      ? parseInt(device.productId, 16)
      : device.productId;
      
    encoder.writeField({ tag: 2, type: 'uint', value: vendorId });
    encoder.writeField({ tag: 3, type: 'uint', value: productId });
    
    if (device.version !== undefined) {
      encoder.writeField({ tag: 4, type: 'uint', value: device.version });
    }
    
    return encoder.getBuffer();
  }
}