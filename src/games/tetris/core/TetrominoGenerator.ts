import { TetrominoType, Tetromino, TETROMINO_SHAPES } from './types';

export class TetrominoGenerator {
  private bag: TetrominoType[] = [];
  private readonly tetrominoTypes: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

  constructor() {
    this.refillBag();
  }

  private refillBag(): void {
    this.bag = [...this.tetrominoTypes];
    this.shuffleBag();
  }

  private shuffleBag(): void {
    for (let i = this.bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]];
    }
  }

  getNext(): TetrominoType {
    if (this.bag.length === 0) {
      this.refillBag();
    }
    return this.bag.pop()!;
  }

  peek(): TetrominoType {
    if (this.bag.length === 0) {
      this.refillBag();
    }
    return this.bag[this.bag.length - 1];
  }

  createTetromino(type: TetrominoType, x: number, y: number): Tetromino {
    return {
      type,
      position: { x, y },
      rotation: 0,
      shape: TETROMINO_SHAPES[type][0]
    };
  }
}