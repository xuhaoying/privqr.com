'use client';

export function QuotaInfo() {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🚀</span>
          <span className="text-sm text-green-800">
            <strong>Unlimited</strong> QR code generation - completely free!
          </span>
        </div>
        <span className="text-sm text-green-600 font-medium">
          Forever Free
        </span>
      </div>
    </div>
  );
}