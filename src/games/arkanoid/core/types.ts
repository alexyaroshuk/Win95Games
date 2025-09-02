export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  dx: number;
  dy: number;
}

export interface Ball {
  position: Position;
  velocity: Velocity;
  radius: number;
  speed: number;
}

export interface Paddle {
  position: Position;
  width: number;
  height: number;
  speed: number;
}

export interface Brick {
  id: string;
  position: Position;
  width: number;
  height: number;
  hits: number;
  maxHits: number;
  color: string;
  points: number;
  destroyed: boolean;
}

export interface PowerUp {
  id: string;
  type: PowerUpType;
  position: Position;
  velocity: Velocity;
  width: number;
  height: number;
  active: boolean;
}

export type PowerUpType = 'expand' | 'shrink' | 'multiball' | 'slow' | 'fast' | 'extralife' | 'laser';

export interface GameState {
  balls: Ball[];
  paddle: Paddle;
  bricks: Brick[];
  powerUps: PowerUp[];
  score: number;
  lives: number;
  level: number;
  gameStatus: 'idle' | 'playing' | 'paused' | 'won' | 'lost';
  activePowerUps: Set<PowerUpType>;
}

export interface GameConfig {
  canvasWidth: number;
  canvasHeight: number;
  paddleWidth: number;
  paddleHeight: number;
  ballRadius: number;
  ballSpeed: number;
  brickRows: number;
  brickCols: number;
  brickWidth: number;
  brickHeight: number;
  brickPadding: number;
  brickOffsetTop: number;
  brickOffsetLeft: number;
  initialLives: number;
  powerUpChance: number;
  powerUpDuration: number;
}

export const BRICK_COLORS = [
  '#ff0000', // Red - 3 hits
  '#ff8c00', // Orange - 2 hits
  '#ffd700', // Gold - 2 hits
  '#00ff00', // Green - 1 hit
  '#00ffff', // Cyan - 1 hit
  '#0000ff', // Blue - 1 hit
];

export const BRICK_POINTS = [50, 40, 30, 20, 15, 10];

export const DEFAULT_CONFIG: GameConfig = {
  canvasWidth: 480,
  canvasHeight: 400,
  paddleWidth: 75,
  paddleHeight: 10,
  ballRadius: 4,
  ballSpeed: 250, // pixels per second
  brickRows: 8,
  brickCols: 13,
  brickWidth: 30,
  brickHeight: 15,
  brickPadding: 2,
  brickOffsetTop: 50,
  brickOffsetLeft: 20,
  initialLives: 3,
  powerUpChance: 0.1,
  powerUpDuration: 10000,
};