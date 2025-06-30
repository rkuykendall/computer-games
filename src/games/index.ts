import type { Game } from "../types/Game";
import ABCSequenceGame from "./ABCSequenceGame";
import NumberSequenceGame from "./NumberSequenceGame";
import SpacebarSprintGame from "./SpacebarSprintGame";

export const games: Game[] = [
  {
    id: "abc-sequence",
    title: "ABC Sequence",
    description: "Press A, B, then C in order",
    component: ABCSequenceGame,
  },
  {
    id: "number-sequence",
    title: "Number Sequence",
    description: "Press numbers 1-5 in order",
    component: NumberSequenceGame,
  },
  {
    id: "spacebar-sprint",
    title: "Spacebar Sprint",
    description: "Press spacebar 20 times as fast as you can",
    component: SpacebarSprintGame,
  },
];
