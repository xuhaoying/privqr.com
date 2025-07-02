import QRCode from 'qrcode';
import { QROptions, QRGenerationResult } from '@/types/qr';

interface WorkerMessage {
  id: string;
  type: 'generate' | 'generateBatch';
  payload: QROptions | QROptions[];
}

interface WorkerResponse {
  id: string;
  type: 'result' | 'batchResult';
  payload: QRGenerationResult | QRGenerationResult[];
}

// QR generation logic that runs in worker
async function generateQR(options: QROptions): Promise<QRGenerationResult> {
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
        if (!data.startsWith('http://') && !data.startsWith('https://')) {
          data = 'https://' + data;
        }
        break;
      case 'wifi':
        const wifiData = JSON.parse(data);
        data = `WIFI:T:${wifiData.security || 'WPA'};S:${wifiData.ssid};P:${wifiData.password};;`;
        break;
      case 'contact':
        const contact = JSON.parse(data);
        data = [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `FN:${contact.name || ''}`,
          `TEL:${contact.phone || ''}`,
          `EMAIL:${contact.email || ''}`,
          `ORG:${contact.organization || ''}`,
          'END:VCARD',
        ].join('\\n');
        break;
    }

    const dataUrl = await QRCode.toDataURL(data, qrOptions);

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

// Handle messages from main thread
self.addEventListener('message', async (event: MessageEvent<WorkerMessage>) => {
  const { id, type, payload } = event.data;

  try {
    if (type === 'generate' && !Array.isArray(payload)) {
      const result = await generateQR(payload);
      const response: WorkerResponse = {
        id,
        type: 'result',
        payload: result,
      };
      self.postMessage(response);
    } else if (type === 'generateBatch' && Array.isArray(payload)) {
      const results = await Promise.all(payload.map(generateQR));
      const response: WorkerResponse = {
        id,
        type: 'batchResult',
        payload: results,
      };
      self.postMessage(response);
    }
  } catch (error) {
    const errorResponse: WorkerResponse = {
      id,
      type: 'result',
      payload: {
        success: false,
        error: error instanceof Error ? error.message : 'Worker error',
      },
    };
    self.postMessage(errorResponse);
  }
});

export {};