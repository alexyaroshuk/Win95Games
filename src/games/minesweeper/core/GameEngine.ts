import { Board, Cell, Position, GameState, GameSettings, GameConfig, DIFFICULTY_CONFIGS } from './types';
import { BoardGenerator } from './BoardGenerator';

export class GameEngine {
  private state: GameState;
  private firstClick: boolean = true;

  constructor(settings: GameSettings) {
    this.state = this.initializeGame(settings);
  }

  private initializeGame(settings: GameSettings): GameState {
    const config = this.getGameConfig(settings);
    const board = BoardGenerator.createEmptyBoard(config);

    return {
      board,
      status: 'idle',
      mineCount: config.mines,
      flaggedCount: 0,
      revealedCount: 0,
      startTime: null,
      endTime: null,
      settings
    };
  }

  private getGameConfig(settings: GameSettings): GameConfig {
    if (settings.difficulty === 'custom' && settings.customConfig) {
      return settings.customConfig;
    }
    return DIFFICULTY_CONFIGS[settings.difficulty as keyof typeof DIFFICULTY_CONFIGS];
  }

  getState(): GameState {
    return { ...this.state };
  }

  revealCell(position: Position): GameState {
    if (this.state.status === 'won' || this.state.status === 'lost') {
      return this.getState();
    }

    const cell = this.state.board[position.row][position.col];
    
    if (cell.isRevealed || cell.isFlagged) {
      return this.getState();
    }

    // Handle first click - ensure no mine at clicked position
    if (this.firstClick) {
      this.firstClick = false;
      this.state.board = BoardGenerator.placeMines(
        this.state.board, 
        this.state.mineCount,
        position
      );
      this.state.status = 'playing';
      this.state.startTime = Date.now();
    }

    // Clone board for immutability
    const newBoard = this.cloneBoard(this.state.board);
    
    if (cell.isMine) {
      this.handleMineClick(newBoard, position);
      this.state.board = newBoard;
      this.state.status = 'lost';
      this.state.endTime = Date.now();
    } else {
      const revealed = this.floodFillReveal(newBoard, position);
      this.state.board = newBoard;
      this.state.revealedCount += revealed;
      
      // Check win condition
      const totalCells = newBoard.length * newBoard[0].length;
      if (this.state.revealedCount === totalCells - this.state.mineCount) {
        this.state.status = 'won';
        this.state.endTime = Date.now();
      }
    }

    return this.getState();
  }

  private handleMineClick(board: Board, position: Position): void {
    // Mark clicked mine
    board[position.row][position.col].isClickedMine = true;
    board[position.row][position.col].isQuestionMark = false;
    
    // Reveal all mines and incorrect flags
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        const cell = board[row][col];
        if (cell.isMine) {
          cell.isRevealed = true;
          cell.isQuestionMark = false;
        } else if (cell.isFlagged) {
          cell.isIncorrectFlag = true;
          cell.isRevealed = true;
        } else if (cell.isQuestionMark) {
          cell.isRevealed = true;
          cell.isQuestionMark = false;
        }
      }
    }
  }

  private floodFillReveal(board: Board, startPos: Position): number {
    const toReveal: Position[] = [];
    const visited = new Set<string>();
    const queue: Position[] = [startPos];
    
    while (queue.length > 0) {
      const pos = queue.shift()!;
      const key = `${pos.row},${pos.col}`;
      
      if (visited.has(key) || !this.isValidPosition(board, pos)) {
        continue;
      }
      
      visited.add(key);
      const cell = board[pos.row][pos.col];
      
      if (cell.isFlagged || cell.isRevealed || cell.isMine) {
        continue;
      }
      
      toReveal.push(pos);
      
      // If empty cell, add neighbors
      if (cell.neighborMines === 0) {
        const neighbors = BoardGenerator.getNeighbors(board, pos);
        queue.push(...neighbors);
      }
    }
    
    // Reveal all cells
    toReveal.forEach(pos => {
      board[pos.row][pos.col].isRevealed = true;
      board[pos.row][pos.col].isQuestionMark = false;
    });
    
    return toReveal.length;
  }

  toggleFlag(position: Position): GameState {
    if (this.state.status === 'won' || this.state.status === 'lost') {
      return this.getState();
    }

    const newBoard = this.cloneBoard(this.state.board);
    const cell = newBoard[position.row][position.col];
    
    if (cell.isRevealed) {
      return this.getState();
    }

    if (this.state.settings.allowQuestionMarks) {
      // Cycle: unmarked -> flag -> question -> unmarked
      if (!cell.isFlagged && !cell.isQuestionMark) {
        cell.isFlagged = true;
        cell.isQuestionMark = false;
        this.state.flaggedCount++;
      } else if (cell.isFlagged && !cell.isQuestionMark) {
        cell.isFlagged = false;
        cell.isQuestionMark = true;
        this.state.flaggedCount--;
      } else if (!cell.isFlagged && cell.isQuestionMark) {
        cell.isFlagged = false;
        cell.isQuestionMark = false;
      }
    } else {
      // Toggle flag only
      cell.isFlagged = !cell.isFlagged;
      cell.isQuestionMark = false;
      this.state.flaggedCount += cell.isFlagged ? 1 : -1;
    }

    this.state.board = newBoard;
    
    // Start timer if first interaction
    if (this.state.status === 'idle') {
      this.state.status = 'playing';
      this.state.startTime = Date.now();
    }

    return this.getState();
  }

  reset(): GameState {
    this.firstClick = true;
    this.state = this.initializeGame(this.state.settings);
    return this.getState();
  }

  updateSettings(settings: GameSettings): GameState {
    // Check if we need to reset the game
    const needsReset = 
      this.state.settings.difficulty !== settings.difficulty ||
      this.state.settings.customConfig?.rows !== settings.customConfig?.rows ||
      this.state.settings.customConfig?.cols !== settings.customConfig?.cols ||
      this.state.settings.customConfig?.mines !== settings.customConfig?.mines;

    if (!needsReset) {
      // Just update the allowQuestionMarks setting without resetting
      this.state.settings.allowQuestionMarks = settings.allowQuestionMarks;
      return this.getState();
    }

    // Reset the game with new settings
    this.firstClick = true;
    this.state = this.initializeGame(settings);
    return this.getState();
  }

  private cloneBoard(board: Board): Board {
    return board.map(row => row.map(cell => ({ ...cell })));
  }

  private isValidPosition(board: Board, pos: Position): boolean {
    return pos.row >= 0 && pos.row < board.length && 
           pos.col >= 0 && pos.col < board[0].length;
  }
}