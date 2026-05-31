'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import StarField from '@/components/StarField';
import { parseSession } from '@/utils/session';
import { getCardById } from '@/data/tarotCards';
import { READING_CONFIGS } from '@/types/tarot';
import type { TarotCard } from '@/types/tarot';

interface CardResult {
  card: TarotCard;
  reversed: boolean;
  position: string;
}

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;

  const [results, setResults] = useState<CardResult[]>([]);
  const [config, setConfig] = useState<(typeof READING_CONFIGS)[keyof typeof READING_CONFIGS] | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const session = parseSession(sessionId);
    if (!session || session.drawnCards.length === 0) {
      router.replace('/readings');
      return;
    }
    const cfg = READING_CONFIGS[session.type];
    setConfig(cfg);
    const parsed: CardResult[] = session.drawnCards.map((id, i) => {
      const card = getCardById(id)!;
      return {
        card,
        reversed: session.reversals[i] ?? false,
        position: cfg.positions[i] ?? `ใบที่ ${i + 1}`,
      };
    });
    setResults(parsed);
  }, [sessionId, router]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  if (!config || results.length === 0) {
    return (
      <main className="min-h-screen bg-deep flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <StarField />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-dark/20 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="flex justify-between items-center px-6 py-5 sm:px-10">
          <Link href="/" className="font-cinzel text-gold text-base tracking-widest">
            ✦ ดาวแห่งโชคชะตา
          </Link>
          <Link href="/readings" className="text-purple-light/70 hover:text-gold font-sarabun text-sm transition-colors">
            ดูดวงอีกครั้ง
          </Link>
        </nav>

        <section className="flex-1 px-4 py-8 sm:py-12 max-w-3xl mx-auto w-full">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-5xl mb-4">✨</div>
            <h1 className="font-cinzel text-2xl sm:text-3xl text-gold mb-2">คำทำนายของคุณ</h1>
            <p className="font-sarabun text-purple-light/60 text-sm">{config.label}</p>
          </motion.div>

          <div className="space-y-6">
            {results.map((result, i) => (
              <motion.div
                key={i}
                className="card-mystic"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-center">
                    <div
                      className={`w-16 h-24 sm:w-20 sm:h-28 bg-gradient-to-br from-mystic to-card-bg border border-gold/40 rounded-lg flex flex-col items-center justify-center gap-1 ${
                        result.reversed ? 'rotate-180' : ''
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl">{result.card.symbol}</span>
                    </div>
                    {result.reversed && (
                      <span className="text-purple-light/50 text-[10px] mt-1 font-sarabun block">
                        กลับหัว
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-sarabun text-purple-light/50 text-xs border border-purple-dark/40 rounded px-2 py-0.5">
                        {result.position}
                      </span>
                      {result.reversed && (
                        <span className="font-sarabun text-orange-400/70 text-xs border border-orange-400/30 rounded px-2 py-0.5">
                          กลับหัว
                        </span>
                      )}
                    </div>
                    <h3 className="font-cinzel text-gold text-base sm:text-lg mb-0.5">
                      {result.card.nameThai}
                    </h3>
                    <p className="font-cinzel text-purple-light/40 text-xs mb-3">
                      {result.card.name}
                    </p>
                    <p className="font-sarabun text-purple-light/80 text-sm leading-relaxed">
                      {result.reversed ? result.card.meaningReversed : result.card.meaningUpright}
                    </p>
                    {result.card.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {result.card.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="font-sarabun text-gold/60 text-xs border border-gold/20 rounded-full px-2 py-0.5"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-10 text-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: results.length * 0.12 + 0.3 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/readings" className="btn-gold px-8 py-3">
                ดูดวงอีกครั้ง ✨
              </Link>
              <button onClick={handleShare} className="btn-outline-gold px-8 py-3">
                {copied ? '✓ คัดลอกแล้ว' : 'แชร์ผล'}
              </button>
            </div>

            <p className="font-sarabun text-purple-light/30 text-xs max-w-sm mx-auto leading-relaxed">
              คำทำนายนี้มีไว้เพื่อการสะท้อนตัวเองและความบันเทิงเท่านั้น
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
