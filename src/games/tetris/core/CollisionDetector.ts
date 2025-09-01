import { Board, Tetromino } from './types';

export class CollisionDetector {
  isValidPosition(board: Board, piece: Tetromino): boolean {
    const shape = piece.shape;
    
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          const newX = piece.position.x + col;
          const newY = piece.position.y + row;
          
          // Check boundaries
          if (newX < 0 || newX >= board[0].length || newY >= board.length) {
            return false;
          }
          
          // Check collision with filled cells (only if Y is within board)
          if (newY >= 0 && board[newY][newX].filled) {
            return false;
          }
        }
      }
    }
    
    return true;
  }

  willCollideOnDrop(board: Board, piece: Tetromino): boolean {
    const testPiece = {
      ...piece,
      position: { ...piece.position, y: piece.position.y + 1 }
    };
    return !this.isValidPosition(board, testPiece);
  }

  getDropPosition(board: Board, piece: Tetromino): number {
    let dropY = piece.position.y;
    const testPiece = { 
      ...piece,
      position: { ...piece.position }
    };
    
    while (true) {
      testPiece.position.y = dropY + 1;
      if (!this.isValidPosition(board, testPiece)) {
        break;
      }
      dropY++;
    }
    
    return dropY;
  }
}