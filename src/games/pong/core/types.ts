export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  dx: number;
  dy: number;
}

export interface Paddle {
  y: number;
  height: number;
  width: number;
  speed: number;
}

export interface Ball {
  x: number;
  y: number;
  radius: number;
  velocity: Velocity;
}

export interface GameDimensions {
  width: number;
  height: number;
}

export type GameState = 'idle' | 'playing' | 'paused' | 'gameOver' | 'scored';

export interface PongGameState {
  playerPaddle: Paddle;
  aiPaddle: Paddle;
  ball: Ball;
  playerScore: number;
  aiScore: number;
  gameState: GameState;
  lastScorer: 'player' | 'ai' | null;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const GAME_CONFIG = {
  WIDTH: 600,
  HEIGHT: 400,
  PADDLE_HEIGHT: 80,
  PADDLE_WIDTH: 10,
  PADDLE_OFFSET: 20,
  BALL_RADIUS: 8,
  BALL_SPEED: 8,
  PADDLE_SPEED: 12,
  WINNING_SCORE: 11
};