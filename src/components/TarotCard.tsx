'use client';

import { motion } from 'framer-motion';
import { TarotCard as TarotCardType } from '@/types/tarot';

interface Props {
  card?: TarotCardType;
  reversed?: boolean;
  flipped: boolean;
  onClick?: () => void;
  position?: string;
  index?: number;
  disabled?: boolean;
}

export default function TarotCard({
  card,
  reversed = false,
  flipped,
  onClick,
  position,
  index = 0,
  disabled = false,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      {position && (
        <p className="text-purple-light text-xs font-sarabun text-center leading-tight max-w-[80px]">
          {position}
        </p>
      )}
      <motion.div
        className={`relative w-[80px] h-[130px] sm:w-[100px] sm:h-[160px] cursor-pointer`}
        style={{ perspective: 1000 }}
        onClick={!disabled ? onClick : undefined}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        whileHover={!disabled && !flipped ? { scale: 1.05, y: -4 } : {}}
        whileTap={!disabled ? { scale: 0.97 } : {}}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Card Back */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-purple-dark to-deep border border-purple-mid/60 rounded-lg flex items-center justify-center relative">
              <div className="absolute inset-1 border border-gold/20 rounded-md" />
              <div className="absolute inset-2 border border-gold/10 rounded-sm" />
              <div className="text-2xl opacity-60">✦</div>
              {!disabled && !flipped && (
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <span className="text-gold/50 text-[9px] font-sarabun">แตะเพื่อเปิด</span>
                </div>
              )}
            </div>
          </div>

          {/* Card Front */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div
              className={`w-full h-full bg-gradient-to-br from-mystic to-card-bg border border-gold/40 rounded-lg flex flex-col items-center justify-between p-2 ${
                reversed ? 'rotate-180' : ''
              }`}
            >
              <div className="text-[28px] sm:text-[34px] leading-none mt-1">
                {card?.symbol || '✦'}
              </div>
              <div className="text-center px-1">
                <p className="text-gold text-[9px] sm:text-[10px] font-sarabun leading-tight">
                  {card?.nameThai}
                </p>
                <p className="text-purple-light/60 text-[8px] mt-0.5 font-cinzel leading-none">
                  {card?.name}
                </p>
              </div>
              <div className="text-gold/30 text-[8px]">{reversed ? '↓' : '↑'}</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
