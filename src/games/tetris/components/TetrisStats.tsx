'use client';

import React from 'react';
import { TetrominoType, TETROMINO_SHAPES, TETROMINO_COLORS } from '../core/types';
import { win95Theme } from '@/styles/theme';
import { LEDDisplay } from '../../common/components/ui/LEDDisplay';
import { Win95Button } from '../../common/components/ui/Win95Button';

interface TetrisStatsProps {
  score: number;
  lines: number;
  level: number;
  nextPiece: TetrominoType;
  isPaused: boolean;
  gameOver: boolean;
  onReset: () => void;
  onPause: () => void;
}

export const TetrisStats: React.FC<TetrisStatsProps> = ({
  score,
  lines,
  level,
  nextPiece,
  isPaused,
  gameOver,
  onReset,
  onPause
}) => {
  const { colors, borders, spacing, fonts } = win95Theme;

  const renderNextPiece = () => {
    const shape = TETROMINO_SHAPES[nextPiece][0];
    const color = TETROMINO_COLORS[nextPiece];
    const cellSize = 15;
    const maxSize = 4;

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${maxSize}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${maxSize}, ${cellSize}px)`,
        gap: '1px',
        backgroundColor: '#1a1a1a',
        padding: '2px'
      }}>
        {Array(maxSize).fill(null).map((_, row) =>
          Array(maxSize).fill(null).map((_, col) => {
            const filled = row < shape.length && col < shape[row].length && shape[row][col] === 1;
            return (
              <div
                key={`${row}-${col}`}
                style={{
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: filled ? color : '#000000',
                  border: filled ? '1px solid rgba(255,255,255,0.3)' : 'none',
                  boxSizing: 'border-box'
                }}
              />
            );
          })
        )}
      </div>
    );
  };

  return (
    <div style={{
      ...borders.raised,
      backgroundColor: colors.background,
      padding: spacing.md,
      width: '200px'
    }}>
      <div style={{ marginBottom: spacing.lg }}>
        <h3 style={{
          fontFamily: fonts.system,
          fontSize: '14px',
          fontWeight: 'bold',
          marginBottom: spacing.sm,
          color: colors.text
        }}>
          SCORE
        </h3>
        <div style={{ ...borders.inset, padding: spacing.xs, backgroundColor: colors.backgroundDark }}>
          <LEDDisplay value={score} digits={6} />
        </div>
      </div>

      <div style={{ marginBottom: spacing.lg }}>
        <h3 style={{
          fontFamily: fonts.system,
          fontSize: '14px',
          fontWeight: 'bold',
          marginBottom: spacing.sm,
          color: colors.text
        }}>
          LINES
        </h3>
        <div style={{ ...borders.inset, padding: spacing.xs, backgroundColor: colors.backgroundDark }}>
          <LEDDisplay value={lines} digits={3} />
        </div>
      </div>

      <div style={{ marginBottom: spacing.lg }}>
        <h3 style={{
          fontFamily: fonts.system,
          fontSize: '14px',
          fontWeight: 'bold',
          marginBottom: spacing.sm,
          color: colors.text
        }}>
          LEVEL
        </h3>
        <div style={{ ...borders.inset, padding: spacing.xs, backgroundColor: colors.backgroundDark }}>
          <LEDDisplay value={level} digits={2} />
        </div>
      </div>

      <div style={{ marginBottom: spacing.lg }}>
        <h3 style={{
          fontFamily: fonts.system,
          fontSize: '14px',
          fontWeight: 'bold',
          marginBottom: spacing.sm,
          color: colors.text
        }}>
          NEXT
        </h3>
        <div style={{ ...borders.inset, padding: spacing.xs, backgroundColor: colors.backgroundDark }}>
          {renderNextPiece()}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
        <Win95Button 
          variant="primary" 
          onClick={onPause}
          disabled={gameOver}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </Win95Button>
        <Win95Button variant="default" onClick={onReset}>
          New Game
        </Win95Button>
      </div>

      {gameOver && (
        <div style={{
          marginTop: spacing.md,
          padding: spacing.sm,
          ...borders.inset,
          backgroundColor: colors.error,
          textAlign: 'center'
        }}>
          <span style={{
            fontFamily: fonts.system,
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#FFFFFF'
          }}>
            GAME OVER
          </span>
        </div>
      )}
    </div>
  );
};

TetrisStats.displayName = 'TetrisStats';