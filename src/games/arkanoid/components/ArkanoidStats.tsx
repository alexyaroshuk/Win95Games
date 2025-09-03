'use client';

import React from 'react';
import { GameState } from '../core/types';
import { LEDDisplay } from '../../common/components/ui/LEDDisplay';
import { Win95Button } from '../../common/components/ui/Win95Button';
import { win95Theme } from '@/styles/theme';

interface ArkanoidStatsProps {
  gameState: GameState;
  onPause: () => void;
  onReset: () => void;
  onSkipLevel?: () => void;
}

export const ArkanoidStats: React.FC<ArkanoidStatsProps> = ({
  gameState,
  onPause,
  onReset,
  onSkipLevel
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
          <LEDDisplay value={gameState.score} digits={6} />
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
          <LEDDisplay value={gameState.level} digits={2} />
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
          LIVES
        </h3>
        <div style={{ 
          ...borders.inset, 
          padding: spacing.sm, 
          backgroundColor: colors.backgroundDark,
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '20px' }}>
            {'❤️'.repeat(Math.max(0, gameState.lives))}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
        <Win95Button 
          variant="primary" 
          onClick={onPause}
          disabled={gameState.gameStatus === 'lost' || gameState.gameStatus === 'idle'}
        >
          {gameState.gameStatus === 'paused' ? 'Resume' : 'Pause'}
        </Win95Button>
        <Win95Button variant="default" onClick={onReset}>
          New Game
        </Win95Button>
        {onSkipLevel && (
          <Win95Button 
            variant="default" 
            onClick={onSkipLevel}
            style={{ backgroundColor: '#ff6b6b' }}
          >
            🔧 Skip Level (Debug)
          </Win95Button>
        )}
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
          <div>← → : Move Paddle</div>
          <div>Mouse : Move Paddle</div>
          <div>Space : Launch Ball</div>
          <div>P : Pause</div>
        </div>
      </div>

      {gameState.gameStatus === 'paused' && (
        <div style={{
          marginTop: spacing.md,
          padding: spacing.sm,
          ...borders.inset,
          backgroundColor: colors.warning,
          textAlign: 'center'
        }}>
          <span style={{
            fontFamily: fonts.system,
            fontSize: '14px',
            fontWeight: 'bold',
            color: colors.text
          }}>
            PAUSED
          </span>
        </div>
      )}
    </div>
  );
};

ArkanoidStats.displayName = 'ArkanoidStats';