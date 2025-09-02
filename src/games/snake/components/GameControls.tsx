'use client';

import React from 'react';
import { Win95Button } from '../../common/components/ui/Win95Button';
import { Direction, GameState } from '../core/types';
import { win95Theme } from '@/styles/theme';

interface GameControlsProps {
  gameState: GameState;
  onStart: () => void;
  onPause: () => void;
  onDirectionClick: (direction: Direction) => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  gameState,
  onStart,
  onPause,
  onDirectionClick
}) => {
  const { spacing, fonts, colors } = win95Theme;

  return (
    <div style={{
      display: 'flex',
      gap: spacing.md,
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      {gameState === 'idle' && (
        <Win95Button onClick={onStart} variant="primary">
          Start Game
        </Win95Button>
      )}
      
      {(gameState === 'playing' || gameState === 'paused') && (
        <>
          <div style={{
            display: 'flex',
            gap: spacing.sm
          }}>
            <Win95Button onClick={onStart} variant="default">
              New Game
            </Win95Button>
            <Win95Button onClick={onPause} variant="default">
              {gameState === 'paused' ? 'Resume' : 'Pause'}
            </Win95Button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: spacing.xs,
            width: '120px'
          }}>
            <div />
            <Win95Button 
              onClick={() => onDirectionClick('UP')}
              variant="default"
              style={{ padding: '4px 8px' }}
              disabled={gameState === 'paused'}
            >
              ↑
            </Win95Button>
            <div />
            <Win95Button 
              onClick={() => onDirectionClick('LEFT')}
              variant="default"
              style={{ padding: '4px 8px' }}
              disabled={gameState === 'paused'}
            >
              ←
            </Win95Button>
            <Win95Button 
              onClick={() => onDirectionClick('DOWN')}
              variant="default"
              style={{ padding: '4px 8px' }}
              disabled={gameState === 'paused'}
            >
              ↓
            </Win95Button>
            <Win95Button 
              onClick={() => onDirectionClick('RIGHT')}
              variant="default"
              style={{ padding: '4px 8px' }}
              disabled={gameState === 'paused'}
            >
              →
            </Win95Button>
          </div>
          
          <div style={{
            fontFamily: fonts.system,
            fontSize: '12px',
            color: colors.textSecondary,
            textAlign: 'center'
          }}>
            Use Arrow Keys or WASD to move
          </div>
        </>
      )}
    </div>
  );
};