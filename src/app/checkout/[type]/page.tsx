'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import StarField from '@/components/StarField';
import PromptPayQR from '@/components/PromptPayQR';
import { READING_CONFIGS, ReadingType } from '@/types/tarot';
import { createSession } from '@/utils/session';

const PROMPTPAY_ID = process.env.NEXT_PUBLIC_PROMPTPAY_ID || '0812345678';
const PAYMENT_WINDOW = 15 * 60;

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const type = params.type as ReadingType;
  const config = READING_CONFIGS[type];

  const [timeLeft, setTimeLeft] = useState(PAYMENT_WINDOW);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!config) {
      router.replace('/readings');
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          router.replace('/readings');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [config, router]);

  const handleConfirm = useCallback(() => {
    setConfirmed(true);
    const sessionId = createSession(type);
    setTimeout(() => router.push(`/reading/${sessionId}`), 800);
  }, [type, router]);

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');

  if (!config) return null;

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <StarField />

      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="flex justify-between items-center px-6 py-5 sm:px-10">
          <Link href="/" className="font-cinzel text-gold text-base tracking-widest">
            ✦ ดาวแห่งโชคชะตา
          </Link>
          <Link href="/readings" className="text-purple-light/70 hover:text-gold font-sarabun text-sm transition-colors">
            ← เปลี่ยนรูปแบบ
          </Link>
        </nav>

        <section className="flex-1 flex flex-col items-center justify-center px-6 py-10">
          <motion.div
            className="w-full max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Order summary */}
            <div className="card-mystic mb-6 text-center">
              <p className="font-sarabun text-purple-light/60 text-xs mb-1">รูปแบบที่เลือก</p>
              <h2 className="font-cinzel text-gold text-xl mb-1">{config.label}</h2>
              <p className="font-sarabun text-purple-light/70 text-sm mb-4">{config.description}</p>
              <div className="border-t border-purple-dark/40 pt-4 flex justify-between items-center">
                <span className="font-sarabun text-purple-light/60 text-sm">ยอดชำระ</span>
                <span className="font-cinzel text-gold text-2xl">฿{config.price}</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="card-mystic mb-6">
              <h3 className="font-cinzel text-white text-center text-base mb-4">
                สแกน QR เพื่อชำระเงิน
              </h3>
              <div className="flex justify-center">
                <PromptPayQR amount={config.price} promptPayId={PROMPTPAY_ID} />
              </div>
            </div>

            {/* Timer */}
            <div className="text-center mb-6">
              <p className="font-sarabun text-purple-light/60 text-xs mb-1">QR หมดอายุใน</p>
              <p
                className={`font-cinzel text-3xl ${
                  timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-gold'
                }`}
              >
                {mm}:{ss}
              </p>
            </div>

            {/* Confirm button */}
            <motion.button
              onClick={handleConfirm}
              disabled={confirmed}
              className={`w-full py-4 rounded-xl font-cinzel text-lg transition-all duration-300 ${
                confirmed
                  ? 'bg-green-700/60 text-green-300 cursor-not-allowed'
                  : 'btn-gold'
              }`}
              whileTap={!confirmed ? { scale: 0.97 } : {}}
            >
              {confirmed ? '✓ กำลังเข้าสู่ห้องดูดวง...' : 'ฉันชำระเงินแล้ว ✓'}
            </motion.button>

            <p className="font-sarabun text-purple-light/40 text-xs text-center mt-4">
              กดปุ่มหลังจากโอนเงินสำเร็จแล้วเท่านั้น
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
