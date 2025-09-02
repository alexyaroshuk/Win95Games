'use client';

import React from 'react';
import { LEDDisplay } from '../../common/components/ui/LEDDisplay';
import { win95Theme } from '@/styles/theme';

interface SnakeStatsProps {
  score: number;
  highScore: number;
  speed: number;
  lives?: number;
}

export const SnakeStats: React.FC<SnakeStatsProps> = ({ score, highScore, speed, lives = 1 }) => {
  const { colors, borders, spacing, fonts } = win95Theme;
  const level = Math.max(1, Math.floor((200 - speed) / 20) + 1);

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
          HIGH SCORE
        </h3>
        <div style={{ ...borders.inset, padding: spacing.xs, backgroundColor: colors.backgroundDark }}>
          <LEDDisplay value={highScore} digits={6} />
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
          <div>↑↓←→ : Move</div>
          <div>WASD : Move</div>
          <div>Space : Start</div>
        </div>
      </div>
    </div>
  );
};

SnakeStats.displayName = 'SnakeStats';