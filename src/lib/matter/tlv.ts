import { MatterTLVField } from '@/types/matter';

export class TLVEncoder {
  private buffer: number[] = [];

  writeUInt8(value: number): void {
    this.buffer.push(value & 0xFF);
  }

  writeUInt16(value: number): void {
    this.buffer.push(value & 0xFF);
    this.buffer.push((value >> 8) & 0xFF);
  }

  writeUInt32(value: number): void {
    this.buffer.push(value & 0xFF);
    this.buffer.push((value >> 8) & 0xFF);
    this.buffer.push((value >> 16) & 0xFF);
    this.buffer.push((value >> 24) & 0xFF);
  }

  writeTag(tag: number): void {
    if (tag < 16) {
      this.writeUInt8((tag << 4) | 0x00);
    } else if (tag < 256) {
      this.writeUInt8(0x20);
      this.writeUInt8(tag);
    } else {
      this.writeUInt8(0x40);
      this.writeUInt16(tag);
    }
  }

  writeLength(length: number): void {
    if (length < 256) {
      this.writeUInt8(length);
    } else if (length < 65536) {
      this.writeUInt8(0xFF);
      this.writeUInt16(length);
    } else {
      this.writeUInt8(0xFF);
      this.writeUInt8(0xFF);
      this.writeUInt32(length);
    }
  }

  writeField(field: MatterTLVField): void {
    this.writeTag(field.tag);

    switch (field.type) {
      case 'uint':
        if (typeof field.value !== 'number') {
          throw new Error('Invalid value type for uint field');
        }
        if (field.value < 256) {
          this.writeUInt8(0x04); // UInt8
          this.writeUInt8(field.value);
        } else if (field.value < 65536) {
          this.writeUInt8(0x05); // UInt16
          this.writeUInt16(field.value);
        } else {
          this.writeUInt8(0x06); // UInt32
          this.writeUInt32(field.value);
        }
        break;

      case 'string':
        if (typeof field.value !== 'string') {
          throw new Error('Invalid value type for string field');
        }
        const strBytes = new TextEncoder().encode(field.value);
        this.writeUInt8(0x0C); // UTF8String
        this.writeLength(strBytes.length);
        strBytes.forEach(byte => this.writeUInt8(byte));
        break;

      case 'bytes':
        if (!(field.value instanceof Uint8Array)) {
          throw new Error('Invalid value type for bytes field');
        }
        this.writeUInt8(0x10); // ByteString
        this.writeLength(field.value.length);
        field.value.forEach(byte => this.writeUInt8(byte));
        break;
    }
  }

  getBuffer(): Uint8Array {
    return new Uint8Array(this.buffer);
  }

  getBase64(): string {
    const bytes = this.getBuffer();
    let binary = '';
    bytes.forEach(byte => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  }
}

export class TLVDecoder {
  private buffer: Uint8Array;
  private offset: number = 0;

  constructor(buffer: Uint8Array | string) {
    if (typeof buffer === 'string') {
      // Assume base64 encoded
      const binary = atob(buffer);
      this.buffer = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        this.buffer[i] = binary.charCodeAt(i);
      }
    } else {
      this.buffer = buffer;
    }
  }

  readUInt8(): number {
    if (this.offset >= this.buffer.length) {
      throw new Error('Buffer underflow');
    }
    return this.buffer[this.offset++];
  }

  readUInt16(): number {
    const low = this.readUInt8();
    const high = this.readUInt8();
    return low | (high << 8);
  }

  readUInt32(): number {
    const b0 = this.readUInt8();
    const b1 = this.readUInt8();
    const b2 = this.readUInt8();
    const b3 = this.readUInt8();
    return b0 | (b1 << 8) | (b2 << 16) | (b3 << 24);
  }

  readTag(): number {
    const control = this.readUInt8();
    const tagControl = control >> 5;
    
    switch (tagControl) {
      case 0: // Anonymous tag
        return 0;
      case 1: // Context tag
        return control & 0x1F;
      case 2: // Common profile tag (2 bytes)
        return this.readUInt16();
      case 3: // Common profile tag (4 bytes)
        return this.readUInt32();
      case 4: // Implicit profile tag (2 bytes)
        return this.readUInt16();
      case 5: // Implicit profile tag (4 bytes)
        return this.readUInt32();
      case 6: // Fully qualified tag (6 bytes)
        this.readUInt16(); // vendor id
        this.readUInt16(); // profile id
        return this.readUInt16(); // tag
      case 7: // Fully qualified tag (8 bytes)
        this.readUInt32(); // vendor id
        this.readUInt16(); // profile id
        return this.readUInt16(); // tag
      default:
        throw new Error('Invalid tag control');
    }
  }

  readLength(): number {
    const firstByte = this.readUInt8();
    if (firstByte < 0xFF) {
      return firstByte;
    }
    
    const secondByte = this.readUInt8();
    if (secondByte < 0xFF) {
      return this.readUInt16();
    }
    
    return this.readUInt32();
  }

  readField(): MatterTLVField | null {
    if (this.offset >= this.buffer.length) {
      return null;
    }

    const tag = this.readTag();
    const elementType = this.readUInt8();

    switch (elementType) {
      case 0x04: // UInt8
        return { tag, type: 'uint', value: this.readUInt8() };
      
      case 0x05: // UInt16
        return { tag, type: 'uint', value: this.readUInt16() };
      
      case 0x06: // UInt32
        return { tag, type: 'uint', value: this.readUInt32() };
      
      case 0x0C: { // UTF8String
        const length = this.readLength();
        const bytes = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
          bytes[i] = this.readUInt8();
        }
        const value = new TextDecoder().decode(bytes);
        return { tag, type: 'string', value };
      }
      
      case 0x10: { // ByteString
        const length = this.readLength();
        const value = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
          value[i] = this.readUInt8();
        }
        return { tag, type: 'bytes', value };
      }
      
      default:
        throw new Error(`Unsupported element type: 0x${elementType.toString(16)}`);
    }
  }

  readAllFields(): MatterTLVField[] {
    const fields: MatterTLVField[] = [];
    let field: MatterTLVField | null;
    
    while ((field = this.readField()) !== null) {
      fields.push(field);
    }
    
    return fields;
  }
}