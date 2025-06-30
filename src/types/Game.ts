export interface Game {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<GameProps>;
}

export interface GameProps {
  onGameComplete?: (score?: number) => void;
}

export interface GameState {
  isComplete: boolean;
  score?: number;
  message?: string;
}
