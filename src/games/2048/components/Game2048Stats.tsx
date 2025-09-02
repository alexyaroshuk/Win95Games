'use client';

import React from 'react';
import { LEDDisplay } from '../../common/components/ui/LEDDisplay';
import { Win95Button } from '../../common/components/ui/Win95Button';
import { win95Theme } from '@/styles/theme';

interface Game2048StatsProps {
  score: number;
  bestScore: number;
  onReset: () => void;
}

export const Game2048Stats: React.FC<Game2048StatsProps> = ({ 
  score, 
  bestScore, 
  onReset
}) => {
  const { colors, borders, spacing, fonts } = win95Theme;

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
          BEST
        </h3>
        <div style={{ ...borders.inset, padding: spacing.xs, backgroundColor: colors.backgroundDark }}>
          <LEDDisplay value={bestScore} digits={6} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm, marginBottom: spacing.lg }}>
        <Win95Button variant="primary" onClick={onReset}>
          New Game
        </Win95Button>
      </div>

      <div style={{
        marginTop: spacing.lg,
        ...borders.raised,
        padding: spacing.md,
        backgroundColor: colors.background
      }}>
        <h3 style={{
          fontFamily: fonts.system,
          fontSize: '14px',
          fontWeight: 'bold',
          marginBottom: spacing.sm,
          color: colors.text
        }}>
          CONTROLS
        </h3>
        <div style={{
          fontFamily: fonts.mono,
          fontSize: '11px',
          lineHeight: '1.5',
          color: colors.textSecondary
        }}>
          <div>↑↓←→ : Move tiles</div>
          <div>WASD : Move tiles</div>
          <div>R : New game</div>
        </div>
      </div>
    </div>
  );
};

Game2048Stats.displayName = 'Game2048Stats';