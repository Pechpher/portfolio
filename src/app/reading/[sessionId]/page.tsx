'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import StarField from '@/components/StarField';
import TarotCard from '@/components/TarotCard';
import { parseSession, encodeSession } from '@/utils/session';
import { drawCards } from '@/utils/readingUtils';
import { READING_CONFIGS } from '@/types/tarot';
import type { TarotCard as TarotCardType, ReadingSession } from '@/types/tarot';

interface DrawnCard {
  card: TarotCardType;
  reversed: boolean;
  flipped: boolean;
}

export default function ReadingPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;

  const [session, setSession] = useState<ReadingSession | null>(null);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [allFlipped, setAllFlipped] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const parsed = parseSession(sessionId);
    if (!parsed) {
      router.replace('/readings');
      return;
    }
    setSession(parsed);
    const config = READING_CONFIGS[parsed.type];
    const drawn = drawCards(parsed.type, config.cardCount);
    setDrawnCards(drawn.map((d) => ({ ...d, flipped: false })));
    setReady(true);
  }, [sessionId, router]);

  const flipCard = useCallback((index: number) => {
    setDrawnCards((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], flipped: true };
      const flippedCount = next.filter((c) => c.flipped).length;
      if (flippedCount === next.length) {
        setTimeout(() => setAllFlipped(true), 400);
      }
      return next;
    });
  }, []);

  const goToResult = useCallback(() => {
    if (!session) return;
    const updated: ReadingSession = {
      ...session,
      drawnCards: drawnCards.map((d) => d.card.id),
      reversals: drawnCards.map((d) => d.reversed),
    };
    const newSessionId = encodeSession(updated);
    router.push(`/result/${newSessionId}`);
  }, [session, drawnCards, router]);

  if (!ready || !session) {
    return (
      <main className="min-h-screen bg-deep flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  const config = READING_CONFIGS[session.type];
  const flippedCount = drawnCards.filter((c) => c.flipped).length;

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <StarField />

      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="flex justify-between items-center px-6 py-5 sm:px-10">
          <Link href="/" className="font-cinzel text-gold text-base tracking-widest">
            ✦ ดาวแห่งโชคชะตา
          </Link>
          <span className="font-sarabun text-purple-light/60 text-sm">
            {flippedCount}/{drawnCards.length} ใบ
          </span>
        </nav>

        <section className="flex-1 flex flex-col items-center px-4 py-8 sm:py-12">
          <motion.div
            className="text-center mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-cinzel text-2xl sm:text-3xl text-gold mb-2">{config.label}</h1>
            <p className="font-sarabun text-purple-light/70 text-sm">
              {flippedCount < drawnCards.length
                ? 'กดที่ไพ่เพื่อเปิด'
                : 'เปิดไพ่ครบแล้ว · พร้อมอ่านคำทำนาย'}
            </p>
          </motion.div>

          {/* Celtic Cross layout */}
          {session.type === 'celtic-cross' ? (
            <CelticCrossLayout cards={drawnCards} positions={config.positions} onFlip={flipCard} />
          ) : (
            <div
              className={`flex gap-4 sm:gap-8 justify-center items-end flex-wrap ${
                session.type === 'single' ? '' : ''
              }`}
            >
              {drawnCards.map((d, i) => (
                <TarotCard
                  key={i}
                  card={d.card}
                  reversed={d.reversed}
                  flipped={d.flipped}
                  onClick={() => !d.flipped && flipCard(i)}
                  position={config.positions[i]}
                  index={i}
                  disabled={d.flipped}
                />
              ))}
            </div>
          )}

          <AnimatePresence>
            {allFlipped && (
              <motion.div
                className="mt-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <p className="font-sarabun text-purple-light/70 text-sm mb-4">
                  ไพ่ทั้งหมดถูกเปิดแล้ว ✨
                </p>
                <button onClick={goToResult} className="btn-gold text-base sm:text-lg px-10 py-4">
                  อ่านคำทำนาย →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}

function CelticCrossLayout({
  cards,
  positions,
  onFlip,
}: {
  cards: DrawnCard[];
  positions: string[];
  onFlip: (i: number) => void;
}) {
  // Standard Celtic Cross 10-card layout
  // Positions: center, crossing, below, left, above, right, staff-bottom, staff-2, staff-3, staff-top
  const gridPositions = [
    { col: 2, row: 2 }, // 0: center
    { col: 2, row: 2 }, // 1: crossing (rotated visually via label)
    { col: 2, row: 3 }, // 2: below
    { col: 1, row: 2 }, // 3: left (past)
    { col: 2, row: 1 }, // 4: above
    { col: 3, row: 2 }, // 5: right (future)
    { col: 5, row: 4 }, // 6: staff bottom
    { col: 5, row: 3 }, // 7: staff 2
    { col: 5, row: 2 }, // 8: staff 3
    { col: 5, row: 1 }, // 9: staff top
  ];

  return (
    <div className="overflow-x-auto w-full">
      <div
        className="grid gap-2 mx-auto"
        style={{
          gridTemplateColumns: 'repeat(5, 90px)',
          gridTemplateRows: 'repeat(4, 150px)',
          width: 'fit-content',
        }}
      >
        {cards.map((d, i) => {
          const pos = gridPositions[i];
          return (
            <div
              key={i}
              style={{
                gridColumn: pos.col,
                gridRow: pos.row,
                position: i === 1 ? 'relative' : undefined,
              }}
              className={`flex items-center justify-center ${i === 1 ? 'opacity-80' : ''}`}
            >
              <TarotCard
                card={d.card}
                reversed={d.reversed}
                flipped={d.flipped}
                onClick={() => !d.flipped && onFlip(i)}
                position={positions[i]}
                index={i}
                disabled={d.flipped}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
