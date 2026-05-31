'use client';

import { useEffect, useState } from 'react';

interface Props {
  amount: number;
  promptPayId: string;
}

export default function PromptPayQR({ amount, promptPayId }: Props) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const generatePayload = (await import('promptpay-qr')).default;
        const QRCode = await import('qrcode');
        const payload = generatePayload(promptPayId, { amount });
        const dataUrl = await QRCode.toDataURL(payload, {
          width: 260,
          margin: 2,
          color: { dark: '#1a0533', light: '#f5f0ff' },
        });
        if (!cancelled) {
          setQrDataUrl(dataUrl);
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [amount, promptPayId]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="border-2 border-gold/60 rounded-xl p-3 glow-gold-box bg-card-bg">
        {loading ? (
          <div className="w-[260px] h-[260px] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : qrDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={qrDataUrl} alt="PromptPay QR" width={260} height={260} className="rounded-lg" />
        ) : (
          <div className="w-[260px] h-[260px] flex items-center justify-center text-red-400 text-sm font-sarabun text-center px-4">
            ไม่สามารถสร้าง QR ได้ กรุณาโอนตรงไปที่เบอร์ด้านล่าง
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-purple-light/70 text-xs font-sarabun mb-1">พร้อมเพย์หมายเลข</p>
        <p className="text-gold font-cinzel text-lg tracking-widest">{promptPayId}</p>
        <p className="text-white font-sarabun text-xl font-bold mt-1">
          ฿{amount.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
