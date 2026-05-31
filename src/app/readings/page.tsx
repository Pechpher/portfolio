'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import StarField from '@/components/StarField';
import ReadingTypeCard from '@/components/ReadingTypeCard';
import { READING_CONFIGS } from '@/types/tarot';

export default function ReadingsPage() {
  const configs = Object.values(READING_CONFIGS);

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <StarField />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-dark/15 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="flex justify-between items-center px-6 py-5 sm:px-10">
          <Link href="/" className="font-cinzel text-gold text-base sm:text-lg tracking-widest hover:glow-gold transition-all">
            ✦ ดาวแห่งโชคชะตา
          </Link>
          <Link href="/" className="text-purple-light/70 hover:text-gold font-sarabun text-sm transition-colors">
            ← กลับหน้าแรก
          </Link>
        </nav>

        <section className="flex-1 px-6 py-10 sm:py-16 max-w-5xl mx-auto w-full">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-5xl mb-4 animate-float inline-block">✨</div>
            <h1 className="font-cinzel text-3xl sm:text-4xl text-gold mb-3">
              เลือกรูปแบบการดูดวง
            </h1>
            <p className="font-sarabun text-purple-light/70 text-sm sm:text-base max-w-md mx-auto">
              แต่ละรูปแบบมีความลึกและรายละเอียดที่แตกต่างกัน เลือกตามความต้องการของคุณ
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {configs.map((config, i) => (
              <ReadingTypeCard key={config.type} config={config} index={i} />
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="inline-block border border-purple-dark/40 rounded-xl px-6 py-4 bg-card-bg/50">
              <p className="font-sarabun text-purple-light/60 text-xs sm:text-sm">
                🔒 ชำระเงินผ่านพร้อมเพย์ · ปลอดภัย · ดูดวงได้ทันทีหลังชำระ
              </p>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
