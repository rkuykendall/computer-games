import type { Game } from '../types/Game';
import ABCSequenceGame from './ABCSequenceGame';
import NumberSequenceGame from './NumberSequenceGame';
import ColorReactionGame from './ColorReactionGame';

export const games: Game[] = [
  {
    id: 'abc-sequence',
    title: 'ABC Sequence',
    description: 'Press A, B, then C in order',
    component: ABCSequenceGame
  },
  {
    id: 'number-sequence',
    title: 'Number Sequence',
    description: 'Press numbers 1-5 in order',
    component: NumberSequenceGame
  },
  {
    id: 'color-reaction',
    title: 'Color Reaction',
    description: 'Press the first letter of the displayed color',
    component: ColorReactionGame
  }
];
