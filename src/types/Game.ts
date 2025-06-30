export interface Game {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType;
}

export interface GameState {
  isComplete: boolean;
  score?: number;
  message?: string;
}
