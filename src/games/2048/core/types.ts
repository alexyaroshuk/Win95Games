export type Grid = (number | null)[][];
export type Direction = 'up' | 'down' | 'left' | 'right';
export type GameState = 'playing' | 'won' | 'gameOver';

export interface AnimationState {
  newTiles: Set<string>;
  mergedTiles: Set<string>;
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
  2: { bg: '#ffffff', text: '#000000' },
  4: { bg: '#dfdfdf', text: '#000000' },
  8: { bg: '#008080', text: '#ffffff' },
  16: { bg: '#000080', text: '#ffffff' },
  32: { bg: '#800080', text: '#ffffff' },
  64: { bg: '#808000', text: '#ffffff' },
  128: { bg: '#008000', text: '#ffffff' },
  256: { bg: '#ff0000', text: '#ffffff' },
  512: { bg: '#0000ff', text: '#ffffff' },
  1024: { bg: '#ff00ff', text: '#ffffff' },
  2048: { bg: '#ffff00', text: '#000000' },
  4096: { bg: '#ff8000', text: '#ffffff' },
  8192: { bg: '#00ff00', text: '#000000' },
  16384: { bg: '#00ffff', text: '#000000' },
  32768: { bg: '#ff00ff', text: '#ffffff' },
  65536: { bg: '#000000', text: '#ffffff' }
};