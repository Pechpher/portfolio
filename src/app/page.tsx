'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import StarField from '@/components/StarField';

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <StarField />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-dark/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-purple-mid/10 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="flex justify-between items-center px-6 py-5 sm:px-10">
          <span className="font-cinzel text-gold text-base sm:text-lg tracking-widest">
            ✦ ดาวแห่งโชคชะตา
          </span>
          <Link
            href="/readings"
            className="text-purple-light/70 hover:text-gold font-sarabun text-sm transition-colors"
          >
            เริ่มดูดวง →
          </Link>
        </nav>

        <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-7xl sm:text-8xl mb-6 animate-float inline-block">🔮</div>

            <motion.h1
              className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="shimmer-text">ดาวแห่ง</span>
              <br />
              <span className="shimmer-text">โชคชะตา</span>
            </motion.h1>

            <motion.p
              className="font-sarabun text-purple-light/90 text-base sm:text-xl max-w-md mx-auto mb-3 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              ค้นหาคำตอบและทิศทางชีวิตของคุณ
            </motion.p>
            <motion.p
              className="font-sarabun text-purple-light/60 text-sm sm:text-base max-w-sm mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ผ่านไพ่ยิปซีโบราณที่ถ่ายทอดปัญญาแห่งจักรวาล
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/readings" className="btn-gold text-base sm:text-lg px-10 py-4">
                เริ่มดูดวง
              </Link>
              <a href="#about" className="btn-outline-gold text-base sm:text-lg px-10 py-4">
                เรียนรู้เพิ่มเติม
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-16 flex gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {['🌙', '⭐', '🔮', '⚡', '🌟'].map((symbol, i) => (
              <motion.div
                key={i}
                className="w-12 h-20 sm:w-14 sm:h-24 bg-card-bg border border-purple-dark/60 rounded-lg flex items-center justify-center text-xl sm:text-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                style={{ boxShadow: '0 0 15px rgba(107, 33, 168, 0.3)' }}
              >
                {symbol}
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section id="about" className="relative z-10 px-6 py-16 sm:py-24 max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-cinzel text-2xl sm:text-3xl text-gold text-center mb-12">
              ✦ ไพ่ยิปซีคืออะไร ✦
            </h2>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  icon: '🌙',
                  title: 'ปัญญาโบราณ',
                  desc: 'ไพ่ยิปซีหรือ Tarot มีประวัติยาวนานกว่า 600 ปี เป็นเครื่องมือสะท้อนจิตใต้สำนึกและทิศทางชีวิต',
                },
                {
                  icon: '✨',
                  title: 'การสะท้อนตัวเอง',
                  desc: 'ไม่ใช่การทำนายอนาคตที่ตายตัว แต่เป็นกระจกสะท้อนสถานการณ์ ความคิด และพลังงานรอบข้างคุณ',
                },
                {
                  icon: '🔮',
                  title: '78 ใบ · ความหมายลึกซึ้ง',
                  desc: 'ประกอบด้วย Major Arcana 22 ใบ และ Minor Arcana 56 ใบ แต่ละใบมีความหมายเฉพาะตัว',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="card-mystic text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-cinzel text-gold text-base mb-2">{item.title}</h3>
                  <p className="font-sarabun text-purple-light/70 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="relative z-10 px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-cinzel text-2xl sm:text-3xl text-white mb-4">
              พร้อมรับคำทำนายแล้วหรือยัง?
            </h2>
            <p className="font-sarabun text-purple-light/70 mb-8 text-sm sm:text-base">
              เริ่มต้นเพียง ฿49 · ชำระผ่านพร้อมเพย์ · ผลทันที
            </p>
            <Link href="/readings" className="btn-gold text-lg px-12 py-4">
              เลือกรูปแบบดูดวง
            </Link>
          </motion.div>
        </section>

        <footer className="relative z-10 border-t border-purple-dark/30 px-6 py-8 text-center">
          <p className="font-sarabun text-purple-light/40 text-xs">
            © 2026 ดาวแห่งโชคชะตา · การดูดวงเพื่อความบันเทิงและการสะท้อนตัวเอง ไม่ใช่คำแนะนำด้านการแพทย์หรือกฎหมาย
          </p>
        </footer>
      </div>
    </main>
  );
}
