export type Arcana = 'major' | 'minor';
export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles';
export type ReadingType = 'single' | 'three-card' | 'celtic-cross';

export interface TarotCard {
  id: number;
  name: string;
  nameThai: string;
  arcana: Arcana;
  suit?: Suit;
  symbol: string;
  meaningUpright: string;
  meaningReversed: string;
  keywords: string[];
  reversed?: boolean;
}

export interface ReadingSession {
  type: ReadingType;
  paidAt: number;
  drawnCards: number[];
  reversals: boolean[];
}

export interface ReadingConfig {
  type: ReadingType;
  label: string;
  description: string;
  cardCount: number;
  price: number;
  positions: string[];
  symbol: string;
}

export const READING_CONFIGS: Record<ReadingType, ReadingConfig> = {
  single: {
    type: 'single',
    label: 'ไพ่ใบเดียว',
    description: 'คำถามสั้น ๆ คำตอบตรงประเด็น เหมาะกับคำถามเดี่ยว',
    cardCount: 1,
    price: 49,
    positions: ['คำตอบ'],
    symbol: '🌙',
  },
  'three-card': {
    type: 'three-card',
    label: '3 ใบ · อดีต-ปัจจุบัน-อนาคต',
    description: 'เข้าใจเส้นทางชีวิต เห็นอดีตที่ผ่านมา ปัจจุบันที่เป็นอยู่ และอนาคตที่กำลังจะมา',
    cardCount: 3,
    price: 149,
    positions: ['อดีต', 'ปัจจุบัน', 'อนาคต'],
    symbol: '✨',
  },
  'celtic-cross': {
    type: 'celtic-cross',
    label: 'Celtic Cross · 10 ใบ',
    description: 'การดูดวงเชิงลึก ครอบคลุมทุกด้านของชีวิต สถานการณ์ ความหวัง และผลลัพธ์',
    cardCount: 10,
    price: 349,
    positions: [
      'สถานการณ์หลัก',
      'สิ่งที่ขัดขวาง',
      'รากฐาน',
      'อดีต',
      'ศักยภาพ',
      'อนาคตใกล้',
      'ตัวคุณเอง',
      'สภาพแวดล้อม',
      'ความหวัง/ความกลัว',
      'ผลลัพธ์สุดท้าย',
    ],
    symbol: '⚜️',
  },
};
