'use client';

import { motion } from 'framer-motion';
import { ReadingConfig } from '@/types/tarot';
import Link from 'next/link';

interface Props {
  config: ReadingConfig;
  index: number;
}

export default function ReadingTypeCard({ config, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
    >
      <Link href={`/checkout/${config.type}`}>
        <div className="card-mystic group cursor-pointer h-full flex flex-col">
          <div className="text-4xl mb-4 group-hover:animate-float inline-block">
            {config.symbol}
          </div>

          <h3 className="font-cinzel text-gold text-lg mb-2 group-hover:glow-gold transition-all">
            {config.label}
          </h3>

          <p className="font-sarabun text-purple-light/80 text-sm leading-relaxed flex-1 mb-4">
            {config.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(config.cardCount, 5) }).map((_, i) => (
                <span key={i} className="text-gold/50 text-xs">
                  ▪
                </span>
              ))}
              {config.cardCount > 5 && (
                <span className="text-gold/50 text-xs">+{config.cardCount - 5}</span>
              )}
            </div>
            <div className="text-right">
              <span className="font-cinzel text-2xl text-gold">฿{config.price}</span>
            </div>
          </div>

          <div className="mt-4 w-full py-2 border border-gold/40 rounded-lg text-center font-cinzel text-gold/80 text-sm group-hover:bg-gold group-hover:text-deep transition-all duration-300">
            เลือก
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
