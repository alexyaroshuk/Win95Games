'use client';

import React from 'react';
import { Grid, AnimationState, TILE_COLORS, GRID_SIZE } from '../core/types';
import { win95Theme } from '@/styles/theme';

interface GameBoardProps {
  grid: Grid;
  animationState: AnimationState;
}

export const GameBoard: React.FC<GameBoardProps> = ({ grid, animationState }) => {
  const { borders, spacing } = win95Theme;

  const getTileStyle = (value: number | null, row: number, col: number) => {
    const position = `${row}-${col}`;
    const isNew = animationState.newTiles.has(position);
    const isMerged = animationState.mergedTiles.has(position);
    
    if (!value) {
      return {
        backgroundColor: '#c0c0c0',
        color: 'transparent'
      };
    }

    const colors = TILE_COLORS[value] || { bg: '#800000', text: '#ffffff' };
    
    return {
      backgroundColor: colors.bg,
      color: colors.text,
      fontWeight: 'bold',
      fontSize: value >= 1000 ? '20px' : value >= 100 ? '24px' : '28px',
      animation: isNew ? 'slideIn 0.15s ease-in' : isMerged ? 'pop 0.15s ease-in' : 'none',
      transform: isNew ? 'scale(1)' : isMerged ? 'scale(1)' : 'scale(1)',
      transition: 'all 0.15s ease-in-out'
    };
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes pop {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
      
      <div style={{
        ...borders.inset,
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        gap: '4px',
        padding: '4px',
        backgroundColor: '#808080',
        width: '320px',
        height: '320px'
      }}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                ...borders.raised,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...getTileStyle(cell, rowIndex, colIndex)
              }}
            >
              {cell || ''}
            </div>
          ))
        )}
      </div>
    </>
  );
};