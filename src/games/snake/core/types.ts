export interface Position {
  x: number;
  y: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type GameState = 'idle' | 'playing' | 'paused' | 'gameOver';

export interface SnakeGameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  gameState: GameState;
  score: number;
  highScore: number;
  speed: number;
}

export const GRID_SIZE = 20;
export const CELL_SIZE = 20;
export const INITIAL_SPEED = 150;
export const SPEED_INCREMENT = 2;
export const MIN_SPEED = 50;
export const SCORE_PER_FOOD = 10;