'use client';

import React from 'react';
import { Win95Button } from '../../common/components/ui/Win95Button';
import { win95Theme } from '@/styles/theme';

interface GameOverDialogProps {
  score: number;
  onRestart: () => void;
}

export const GameOverDialog: React.FC<GameOverDialogProps> = ({ score, onRestart }) => {
  const { colors, borders, spacing, fonts } = win95Theme;

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: colors.background,
      ...borders.raised,
      padding: spacing.lg,
      textAlign: 'center',
      zIndex: 10
    }}>
      <h2 style={{
        fontFamily: fonts.system,
        fontSize: '18px',
        marginBottom: spacing.md
      }}>
        Game Over!
      </h2>
      <p style={{
        fontFamily: fonts.system,
        fontSize: '14px',
        marginBottom: spacing.md
      }}>
        Final Score: {score}
      </p>
      <Win95Button onClick={onRestart} variant="primary">
        Play Again
      </Win95Button>
    </div>
  );
};