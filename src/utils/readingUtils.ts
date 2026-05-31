import { allCards, majorArcana } from '@/data/tarotCards';
import { TarotCard, ReadingType } from '@/types/tarot';

export function shuffleDeck(type: ReadingType): TarotCard[] {
  const deck = type === 'celtic-cross' ? [...allCards] : [...majorArcana];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function drawCards(type: ReadingType, count: number): { card: TarotCard; reversed: boolean }[] {
  const deck = shuffleDeck(type);
  return deck.slice(0, count).map((card) => ({
    card,
    reversed: Math.random() < 0.3,
  }));
}

export function getCardMeaning(card: TarotCard, reversed: boolean): string {
  return reversed ? card.meaningReversed : card.meaningUpright;
}
