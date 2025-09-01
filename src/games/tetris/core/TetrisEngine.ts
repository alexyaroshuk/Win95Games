import { 
  GameState, 
  Board, 
  Cell, 
  Tetromino, 
  TetrominoType,
  GameConfig,
  TETROMINO_SHAPES,
  TETROMINO_COLORS
} from './types';
import { TetrominoGenerator } from './TetrominoGenerator';
import { CollisionDetector } from './CollisionDetector';

export class TetrisEngine {
  private state: GameState;
  private config: GameConfig;
  private generator: TetrominoGenerator;
  private collisionDetector: CollisionDetector;

  constructor(config?: Partial<GameConfig>) {
    this.config = {
      boardWidth: 10,
      boardHeight: 20,
      initialDropTime: 1000,
      dropTimeDecrement: 50,
      minDropTime: 100,
      scoreMultiplier: {
        single: 100,
        double: 300,
        triple: 500,
        tetris: 800
      },
      ...config
    };

    this.generator = new TetrominoGenerator();
    this.collisionDetector = new CollisionDetector();
    this.state = this.createInitialState();
  }

  private createInitialState(): GameState {
    const board = this.createEmptyBoard();
    const nextType = this.generator.getNext();
    
    // Create piece without collision check for initial state
    // Start at y=-2 to give room for piece to appear
    const currentPiece = this.generator.createTetromino(
      nextType,
      Math.floor(this.config.boardWidth / 2) - 2,
      -2
    );

    const initialState: GameState = {
      board,
      currentPiece,
      nextPiece: this.generator.peek(),
      score: 0,
      lines: 0,
      level: 1,
      gameOver: false,
      isPaused: false,
      dropTime: this.config.initialDropTime
    };

    // Check if initial piece placement is valid
    if (!this.collisionDetector.isValidPosition(board, currentPiece)) {
      initialState.gameOver = true;
    }

    return initialState;
  }

  private createEmptyBoard(): Board {
    return Array(this.config.boardHeight).fill(null).map(() =>
      Array(this.config.boardWidth).fill(null).map(() => ({
        filled: false,
        color: '#000000'
      }))
    );
  }

  private spawnPiece(type: TetrominoType, board: Board): Tetromino {
    const piece = this.generator.createTetromino(
      type,
      Math.floor(this.config.boardWidth / 2) - 2,
      -2
    );
    
    if (!this.collisionDetector.isValidPosition(board, piece)) {
      this.state.gameOver = true;
      return piece;
    }
    
    return piece;
  }

  getState(): GameState {
    return { ...this.state };
  }

  moveLeft(): GameState {
    if (!this.state.currentPiece || this.state.gameOver || this.state.isPaused) {
      return this.getState();
    }

    const newPiece = {
      ...this.state.currentPiece,
      position: { 
        ...this.state.currentPiece.position, 
        x: this.state.currentPiece.position.x - 1 
      }
    };

    if (this.collisionDetector.isValidPosition(this.state.board, newPiece)) {
      this.state.currentPiece = newPiece;
    }

    return this.getState();
  }

  moveRight(): GameState {
    if (!this.state.currentPiece || this.state.gameOver || this.state.isPaused) {
      return this.getState();
    }

    const newPiece = {
      ...this.state.currentPiece,
      position: { 
        ...this.state.currentPiece.position, 
        x: this.state.currentPiece.position.x + 1 
      }
    };

    if (this.collisionDetector.isValidPosition(this.state.board, newPiece)) {
      this.state.currentPiece = newPiece;
    }

    return this.getState();
  }

  rotate(): GameState {
    if (!this.state.currentPiece || this.state.gameOver || this.state.isPaused) {
      return this.getState();
    }

    const newRotation = (this.state.currentPiece.rotation + 1) % 4;
    const newShape = TETROMINO_SHAPES[this.state.currentPiece.type][newRotation];
    
    const newPiece = {
      ...this.state.currentPiece,
      rotation: newRotation,
      shape: newShape
    };

    if (this.collisionDetector.isValidPosition(this.state.board, newPiece)) {
      this.state.currentPiece = newPiece;
    } else {
      // Try wall kicks
      const kicks = [
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: -2, y: 0 },
        { x: 2, y: 0 }
      ];

      for (const kick of kicks) {
        const kickedPiece = {
          ...newPiece,
          position: {
            x: newPiece.position.x + kick.x,
            y: newPiece.position.y + kick.y
          }
        };

        if (this.collisionDetector.isValidPosition(this.state.board, kickedPiece)) {
          this.state.currentPiece = kickedPiece;
          break;
        }
      }
    }

    return this.getState();
  }

  softDrop(): GameState {
    if (!this.state.currentPiece || this.state.gameOver || this.state.isPaused) {
      return this.getState();
    }

    const newPiece = {
      ...this.state.currentPiece,
      position: { 
        ...this.state.currentPiece.position, 
        y: this.state.currentPiece.position.y + 1 
      }
    };

    if (this.collisionDetector.isValidPosition(this.state.board, newPiece)) {
      this.state.currentPiece = newPiece;
      this.state.score += 1;
    } else {
      this.lockPiece();
    }

    return this.getState();
  }

  hardDrop(): GameState {
    if (!this.state.currentPiece || this.state.gameOver || this.state.isPaused) {
      return this.getState();
    }

    const dropY = this.collisionDetector.getDropPosition(this.state.board, this.state.currentPiece);
    const dropDistance = dropY - this.state.currentPiece.position.y;
    
    this.state.currentPiece.position.y = dropY;
    this.state.score += dropDistance * 2;
    this.lockPiece();

    return this.getState();
  }

  tick(): GameState {
    if (!this.state.currentPiece || this.state.gameOver || this.state.isPaused) {
      return this.getState();
    }

    const newY = this.state.currentPiece.position.y + 1;
    const testPiece = {
      ...this.state.currentPiece,
      position: { 
        x: this.state.currentPiece.position.x,
        y: newY 
      }
    };

    if (this.collisionDetector.isValidPosition(this.state.board, testPiece)) {
      this.state.currentPiece = testPiece;
    } else {
      this.lockPiece();
    }

    return this.getState();
  }

  private lockPiece(): void {
    if (!this.state.currentPiece) return;

    // Check if piece is locked above the visible board (game over)
    if (this.state.currentPiece.position.y < 0) {
      this.state.gameOver = true;
      return;
    }

    // Place piece on board
    const shape = this.state.currentPiece.shape;
    const color = TETROMINO_COLORS[this.state.currentPiece.type];
    
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          const boardY = this.state.currentPiece.position.y + row;
          const boardX = this.state.currentPiece.position.x + col;
          
          if (boardY >= 0 && boardY < this.state.board.length &&
              boardX >= 0 && boardX < this.state.board[0].length) {
            this.state.board[boardY][boardX] = { filled: true, color };
          } else if (boardY < 0) {
            // Piece is locked partially above the board - game over
            this.state.gameOver = true;
          }
        }
      }
    }

    // If game is over, don't spawn new piece
    if (this.state.gameOver) {
      return;
    }

    // Check for completed lines
    const completedLines = this.clearCompletedLines();
    this.updateScore(completedLines);

    // Spawn new piece
    const nextType = this.generator.getNext();
    this.state.currentPiece = this.spawnPiece(nextType, this.state.board);
    this.state.nextPiece = this.generator.peek();
  }

  private clearCompletedLines(): number {
    let linesCleared = 0;
    
    for (let row = this.state.board.length - 1; row >= 0; row--) {
      if (this.state.board[row].every(cell => cell.filled)) {
        this.state.board.splice(row, 1);
        this.state.board.unshift(
          Array(this.config.boardWidth).fill(null).map(() => ({
            filled: false,
            color: '#000000'
          }))
        );
        linesCleared++;
        row++; // Check the same row again
      }
    }

    return linesCleared;
  }

  private updateScore(linesCleared: number): void {
    if (linesCleared === 0) return;

    this.state.lines += linesCleared;
    
    const multipliers = [0, 
      this.config.scoreMultiplier.single,
      this.config.scoreMultiplier.double,
      this.config.scoreMultiplier.triple,
      this.config.scoreMultiplier.tetris
    ];
    
    this.state.score += (multipliers[linesCleared] || 0) * this.state.level;

    // Update level every 10 lines
    const newLevel = Math.floor(this.state.lines / 10) + 1;
    if (newLevel > this.state.level) {
      this.state.level = newLevel;
      this.state.dropTime = Math.max(
        this.config.minDropTime,
        this.config.initialDropTime - (newLevel - 1) * this.config.dropTimeDecrement
      );
    }
  }

  togglePause(): GameState {
    this.state.isPaused = !this.state.isPaused;
    return this.getState();
  }

  reset(): GameState {
    this.generator = new TetrominoGenerator();
    this.state = this.createInitialState();
    return this.getState();
  }

  getGhostPiece(): Tetromino | null {
    if (!this.state.currentPiece) return null;

    const dropY = this.collisionDetector.getDropPosition(this.state.board, this.state.currentPiece);
    
    return {
      ...this.state.currentPiece,
      position: {
        ...this.state.currentPiece.position,
        y: dropY
      }
    };
  }
}