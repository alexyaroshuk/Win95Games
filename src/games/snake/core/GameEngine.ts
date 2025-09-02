import { Position, Direction, SnakeGameState, GRID_SIZE, SCORE_PER_FOOD, SPEED_INCREMENT, MIN_SPEED } from './types';

export class SnakeGameEngine {
  static generateFood(snake: Position[]): Position {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }

  static moveSnake(state: SnakeGameState): Partial<SnakeGameState> {
    if (state.gameState !== 'playing') return {};

    const newSnake = [...state.snake];
    const head = { ...newSnake[0] };

    switch (state.direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    // Wrap around edges
    if (head.x < 0) head.x = GRID_SIZE - 1;
    if (head.x >= GRID_SIZE) head.x = 0;
    if (head.y < 0) head.y = GRID_SIZE - 1;
    if (head.y >= GRID_SIZE) head.y = 0;

    // Check collision with self
    if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
      return { gameState: 'gameOver' };
    }

    newSnake.unshift(head);

    const updates: Partial<SnakeGameState> = { snake: newSnake };

    // Check if food eaten
    if (head.x === state.food.x && head.y === state.food.y) {
      updates.score = state.score + SCORE_PER_FOOD;
      updates.food = this.generateFood(newSnake);
      
      // Increase speed
      if (state.speed > MIN_SPEED) {
        updates.speed = state.speed - SPEED_INCREMENT;
      }
    } else {
      newSnake.pop();
    }

    return updates;
  }

  static isValidDirectionChange(current: Direction, next: Direction): boolean {
    return (
      (next === 'UP' && current !== 'DOWN') ||
      (next === 'DOWN' && current !== 'UP') ||
      (next === 'LEFT' && current !== 'RIGHT') ||
      (next === 'RIGHT' && current !== 'LEFT')
    );
  }

  static getDirectionFromKey(key: string, current: Direction): Direction | null {
    switch (key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        return this.isValidDirectionChange(current, 'UP') ? 'UP' : null;
      case 'ArrowDown':
      case 's':
      case 'S':
        return this.isValidDirectionChange(current, 'DOWN') ? 'DOWN' : null;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        return this.isValidDirectionChange(current, 'LEFT') ? 'LEFT' : null;
      case 'ArrowRight':
      case 'd':
      case 'D':
        return this.isValidDirectionChange(current, 'RIGHT') ? 'RIGHT' : null;
      default:
        return null;
    }
  }
}