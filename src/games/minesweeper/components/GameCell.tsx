'use client';

import React, { useCallback, useState } from 'react';
import { Cell } from '../core/types';
import { win95Theme, getNumberColor } from '@/styles/theme';

interface GameCellProps {
  cell: Cell;
  onReveal: () => void;
  onFlag: () => void;
  onMouseDownCell: () => void;
  onMouseUpCell: () => void;
  isGameOver: boolean;
  isDragging: boolean;
}

export const GameCell = React.memo<GameCellProps>(({
  cell,
  onReveal,
  onFlag,
  onMouseDownCell,
  onMouseUpCell,
  isGameOver,
  isDragging
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const { colors, sizes } = win95Theme;

  const handleClick = useCallback(() => {
    if (!isGameOver && !cell.isRevealed && !cell.isFlagged) {
      onReveal();
    }
  }, [isGameOver, cell.isRevealed, cell.isFlagged, onReveal]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!isGameOver && !cell.isRevealed) {
      onFlag();
    }
  }, [isGameOver, cell.isRevealed, onFlag]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0 && !cell.isRevealed && !isGameOver) {
      setIsPressed(true);
      onMouseDownCell();
    }
  }, [cell.isRevealed, isGameOver, onMouseDownCell]);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
    onMouseUpCell();
  }, [onMouseUpCell]);

  const handleMouseEnter = useCallback(() => {
    if (isDragging && !cell.isRevealed && !isGameOver) {
      setIsPressed(true);
    }
  }, [isDragging, cell.isRevealed, isGameOver]);

  const handleMouseLeave = useCallback(() => {
    setIsPressed(false);
  }, []);

  const getCellContent = () => {
    if (cell.isIncorrectFlag) {
      return (
        <span style={{ 
          position: 'relative', 
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%'
        }}>
          <span style={{ fontSize: '12px' }}>💣</span>
          <span style={{ 
            position: 'absolute',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }}>❌</span>
        </span>
      );
    }
    if (cell.isFlagged) return '🚩';
    if (cell.isQuestionMark) {
      return <span style={{ color: colors.text, fontWeight: 'bold', fontSize: '18px' }}>?</span>;
    }
    if (!cell.isRevealed) return '';
    if (cell.isMine) return '💣';
    if (cell.neighborMines === 0) return '';
    
    return (
      <span style={{
        color: getNumberColor(cell.neighborMines),
        fontWeight: 'bold',
        fontSize: '18px'
      }}>
        {cell.neighborMines}
      </span>
    );
  };

  const cellStyle: React.CSSProperties = {
    width: `${sizes.cell}px`,
    height: `${sizes.cell}px`,
    margin: '0',
    padding: '0',
    fontSize: '12px',
    fontWeight: 'bold',
    fontFamily: win95Theme.fonts.mono,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: cell.isRevealed || isGameOver ? 'default' : 'pointer',
    backgroundColor: cell.isRevealed 
      ? (cell.isClickedMine ? colors.mineRed : cell.isIncorrectFlag ? colors.incorrectFlag : colors.cellRevealed)
      : (isPressed ? colors.cellRevealed : colors.background),
    border: cell.isRevealed 
      ? `1px solid ${colors.cellBorder}`
      : (isPressed ? `1px inset ${colors.background}` : `2px outset ${colors.background}`)
  };

  return (
    <button
      style={cellStyle}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={cell.isRevealed || isGameOver}
      aria-label={`Cell ${cell.position.row + 1}, ${cell.position.col + 1}`}
    >
      {getCellContent()}
    </button>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for optimization
  return (
    prevProps.cell === nextProps.cell &&
    prevProps.isGameOver === nextProps.isGameOver &&
    prevProps.isDragging === nextProps.isDragging
  );
});

GameCell.displayName = 'GameCell';