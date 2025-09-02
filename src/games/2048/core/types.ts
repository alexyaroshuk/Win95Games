export type Grid = (number | null)[][];
export type Direction = 'up' | 'down' | 'left' | 'right';
export type GameState = 'playing' | 'won' | 'gameOver';

export interface AnimationState {
  newTiles: Set<string>;
  mergedTiles: Set<string>;
  direction: Direction | null;
  isMoving: boolean;
}

export interface Game2048State {
  grid: Grid;
  score: number;
  bestScore: number;
  gameState: GameState;
  animationState: AnimationState;
}

export const GRID_SIZE = 4;

export const TILE_COLORS: { [key: number]: { bg: string; text: string } } = {
  2: { bg: '#eee4da', text: '#776e65' },
  4: { bg: '#ede0c8', text: '#776e65' },
  8: { bg: '#f2b179', text: '#776e65' },
  16: { bg: '#f59563', text: '#776e65' },
  32: { bg: '#f67c5f', text: '#f9f6f2' },
  64: { bg: '#f65e3b', text: '#f9f6f2' },
  128: { bg: '#edcf72', text: '#776e65' },
  256: { bg: '#edcc61', text: '#776e65' },
  512: { bg: '#edc850', text: '#776e65' },
  1024: { bg: '#edc53f', text: '#776e65' },
  2048: { bg: '#edc22e', text: '#776e65' },
  4096: { bg: '#3c3a32', text: '#f9f6f2' },
  8192: { bg: '#3c3a32', text: '#f9f6f2' },
  16384: { bg: '#3c3a32', text: '#f9f6f2' },
  32768: { bg: '#3c3a32', text: '#f9f6f2' },
  65536: { bg: '#3c3a32', text: '#f9f6f2' }
};