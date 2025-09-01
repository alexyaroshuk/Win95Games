'use client';

import React, { useMemo } from 'react';
import { Board, Tetromino, TETROMINO_COLORS } from '../core/types';
import { win95Theme } from '@/styles/theme';

interface TetrisBoardProps {
  board: Board;
  currentPiece: Tetromino | null;
  ghostPiece: Tetromino | null;
}

export const TetrisBoard: React.FC<TetrisBoardProps> = ({ 
  board, 
  currentPiece,
  ghostPiece 
}) => {
  const { colors, borders } = win95Theme;
  const cellSize = 25;

  const renderBoard = useMemo(() => {
    // Safety check for board
    if (!board || board.length === 0 || !board[0]) {
      return Array(20).fill(null).map(() => 
        Array(10).fill(null).map(() => ({ filled: false, color: '#000000' }))
      );
    }
    
    const displayBoard = board.map(row => [...row]);

    // Add ghost piece
    if (ghostPiece) {
      const shape = ghostPiece.shape;
      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          if (shape[row][col]) {
            const boardY = ghostPiece.position.y + row;
            const boardX = ghostPiece.position.x + col;
            // Only render if within visible board bounds
            if (boardY >= 0 && boardY < displayBoard.length &&
                boardX >= 0 && boardX < displayBoard[0].length &&
                !displayBoard[boardY][boardX].filled) {
              displayBoard[boardY][boardX] = {
                filled: false,
                color: '#333333'
              };
            }
          }
        }
      }
    }

    // Add current piece
    if (currentPiece) {
      const shape = currentPiece.shape;
      const color = TETROMINO_COLORS[currentPiece.type];
      
      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          if (shape[row][col]) {
            const boardY = currentPiece.position.y + row;
            const boardX = currentPiece.position.x + col;
            
            // Only render if within visible board bounds
            if (boardY >= 0 && boardY < displayBoard.length &&
                boardX >= 0 && boardX < displayBoard[0].length) {
              displayBoard[boardY][boardX] = { filled: true, color };
            }
          }
        }
      }
    }

    return displayBoard;
  }, [board, currentPiece, ghostPiece]);

  const boardStyle = useMemo(() => ({
    ...borders.insetThick,
    backgroundColor: colors.backgroundDark,
    padding: '3px',
    display: 'inline-block'
  }), [borders.insetThick, colors.backgroundDark]);

  const gridStyle = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${board && board[0] ? board[0].length : 10}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${board ? board.length : 20}, ${cellSize}px)`,
    gap: '1px',
    backgroundColor: '#1a1a1a'
  }), [board, cellSize]);

  return (
    <div style={boardStyle}>
      <div style={gridStyle}>
        {renderBoard.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: cell.filled ? cell.color : (cell.color === '#333333' ? '#2a2a2a' : '#000000'),
                border: cell.filled ? '1px solid rgba(255,255,255,0.3)' : 'none',
                boxSizing: 'border-box',
                opacity: cell.color === '#333333' ? 0.3 : 1
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

TetrisBoard.displayName = 'TetrisBoard';