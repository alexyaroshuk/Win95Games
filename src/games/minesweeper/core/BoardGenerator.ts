import { Board, Cell, Position, GameConfig } from './types';

export class BoardGenerator {
  static createEmptyBoard(config: GameConfig): Board {
    const board: Board = [];
    
    for (let row = 0; row < config.rows; row++) {
      board[row] = [];
      for (let col = 0; col < config.cols; col++) {
        board[row][col] = this.createCell({ row, col });
      }
    }
    
    return board;
  }

  static placeMines(board: Board, mineCount: number, excludePosition?: Position): Board {
    const newBoard = this.cloneBoard(board);
    const positions = this.getAvailablePositions(newBoard, excludePosition);
    const minePositions = this.selectRandomPositions(positions, mineCount);
    
    minePositions.forEach(pos => {
      newBoard[pos.row][pos.col].isMine = true;
    });
    
    this.calculateNeighborMines(newBoard);
    
    return newBoard;
  }

  private static createCell(position: Position): Cell {
    return {
      id: `${position.row}-${position.col}`,
      position,
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      isQuestionMark: false,
      neighborMines: 0,
      isClickedMine: false,
      isIncorrectFlag: false
    };
  }

  private static cloneBoard(board: Board): Board {
    return board.map(row => row.map(cell => ({ ...cell })));
  }

  private static getAvailablePositions(board: Board, excludePosition?: Position): Position[] {
    const positions: Position[] = [];
    
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        if (excludePosition && 
            Math.abs(row - excludePosition.row) <= 1 && 
            Math.abs(col - excludePosition.col) <= 1) {
          continue;
        }
        if (!board[row][col].isMine) {
          positions.push({ row, col });
        }
      }
    }
    
    return positions;
  }

  private static selectRandomPositions(positions: Position[], count: number): Position[] {
    const selected: Position[] = [];
    const available = [...positions];
    
    for (let i = 0; i < count && available.length > 0; i++) {
      const index = Math.floor(Math.random() * available.length);
      selected.push(available[index]);
      available.splice(index, 1);
    }
    
    return selected;
  }

  private static calculateNeighborMines(board: Board): void {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        if (!board[row][col].isMine) {
          board[row][col].neighborMines = this.countNeighborMines(board, { row, col });
        }
      }
    }
  }

  private static countNeighborMines(board: Board, position: Position): number {
    let count = 0;
    const { row, col } = position;
    
    for (let r = Math.max(0, row - 1); r <= Math.min(board.length - 1, row + 1); r++) {
      for (let c = Math.max(0, col - 1); c <= Math.min(board[0].length - 1, col + 1); c++) {
        if (board[r][c].isMine) {
          count++;
        }
      }
    }
    
    return count;
  }

  static getNeighbors(board: Board, position: Position): Position[] {
    const neighbors: Position[] = [];
    const { row, col } = position;
    
    for (let r = Math.max(0, row - 1); r <= Math.min(board.length - 1, row + 1); r++) {
      for (let c = Math.max(0, col - 1); c <= Math.min(board[0].length - 1, col + 1); c++) {
        if (r !== row || c !== col) {
          neighbors.push({ row: r, col: c });
        }
      }
    }
    
    return neighbors;
  }
}