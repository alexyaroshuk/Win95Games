export interface Position {
  row: number;
  col: number;
}

export interface Cell {
  id: string;
  position: Position;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  isQuestionMark: boolean;
  neighborMines: number;
  isClickedMine?: boolean;
  isIncorrectFlag?: boolean;
}

export type Board = Cell[][];

export type Difficulty = 'beginner' | 'intermediate' | 'expert' | 'custom';

export interface GameConfig {
  rows: number;
  cols: number;
  mines: number;
}

export interface GameSettings {
  difficulty: Difficulty;
  customConfig?: GameConfig;
  allowQuestionMarks: boolean;
}

export interface GameState {
  board: Board;
  status: 'idle' | 'playing' | 'won' | 'lost';
  mineCount: number;
  flaggedCount: number;
  revealedCount: number;
  startTime: number | null;
  endTime: number | null;
  settings: GameSettings;
}

export interface GameStats {
  mineCount: number;
  flaggedCount: number;
  timeElapsed: number;
}

export const DIFFICULTY_CONFIGS: Record<Exclude<Difficulty, 'custom'>, GameConfig> = {
  beginner: { rows: 9, cols: 9, mines: 10 },
  intermediate: { rows: 16, cols: 16, mines: 40 },
  expert: { rows: 16, cols: 30, mines: 99 }
};