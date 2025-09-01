'use client';

import React, { useMemo, useCallback } from 'react';
import { Board } from '../core/types';
import { GameCell } from './GameCell';
import { win95Theme } from '@/styles/theme';

interface GameBoardProps {
  board: Board;
  onCellReveal: (row: number, col: number) => void;
  onCellFlag: (row: number, col: number) => void;
  onMouseDownCell: () => void;
  onMouseUpCell: () => void;
  isGameOver: boolean;
  isDragging: boolean;
}

export const GameBoard = React.memo<GameBoardProps>(({
  board,
  onCellReveal,
  onCellFlag,
  onMouseDownCell,
  onMouseUpCell,
  isGameOver,
  isDragging
}) => {
  const { colors, sizes, borders } = win95Theme;

  const boardDimensions = useMemo(() => {
    if (board.length === 0) return { width: 192, cols: 9, rows: 9 };
    
    const cols = board[0].length;
    const rows = board.length;
    const width = cols * sizes.cell + 6; // +6 for borders
    
    return { width, cols, rows };
  }, [board, sizes.cell]);

  const gridStyle = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${boardDimensions.cols}, ${sizes.cell}px)`,
    gridTemplateRows: `repeat(${boardDimensions.rows}, ${sizes.cell}px)`,
    gap: '0px'
  }), [boardDimensions, sizes.cell]);

  const boardStyle = useMemo(() => ({
    ...borders.insetThick,
    width: `${boardDimensions.width}px`,
    boxSizing: 'border-box' as const,
    backgroundColor: colors.backgroundDark
  }), [borders.insetThick, boardDimensions.width, colors.backgroundDark]);

  const createCellHandlers = useCallback((row: number, col: number) => ({
    onReveal: () => onCellReveal(row, col),
    onFlag: () => onCellFlag(row, col)
  }), [onCellReveal, onCellFlag]);

  return (
    <div style={boardStyle}>
      <div style={gridStyle}>
        {board.map((row) =>
          row.map((cell) => {
            const handlers = createCellHandlers(cell.position.row, cell.position.col);
            return (
              <GameCell
                key={cell.id}
                cell={cell}
                onReveal={handlers.onReveal}
                onFlag={handlers.onFlag}
                onMouseDownCell={onMouseDownCell}
                onMouseUpCell={onMouseUpCell}
                isGameOver={isGameOver}
                isDragging={isDragging}
              />
            );
          })
        )}
      </div>
    </div>
  );
});

GameBoard.displayName = 'GameBoard';