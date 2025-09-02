'use client';

import React from 'react';
import { Win95Button } from '../../common/components/ui/Win95Button';
import { Direction } from '../core/types';
import { win95Theme } from '@/styles/theme';

interface GameControlsProps {
  onMove: (direction: Direction) => void;
  onReset: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({ onMove, onReset }) => {
  const { spacing, fonts, colors } = win95Theme;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.md,
      alignItems: 'center'
    }}>
      <Win95Button onClick={onReset} variant="primary">
        New Game
      </Win95Button>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: spacing.xs,
        width: '120px'
      }}>
        <div />
        <Win95Button 
          onClick={() => onMove('up')}
          variant="default"
          style={{ padding: '4px 8px' }}
        >
          ↑
        </Win95Button>
        <div />
        <Win95Button 
          onClick={() => onMove('left')}
          variant="default"
          style={{ padding: '4px 8px' }}
        >
          ←
        </Win95Button>
        <Win95Button 
          onClick={() => onMove('down')}
          variant="default"
          style={{ padding: '4px 8px' }}
        >
          ↓
        </Win95Button>
        <Win95Button 
          onClick={() => onMove('right')}
          variant="default"
          style={{ padding: '4px 8px' }}
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
        Use Arrow Keys or WASD to move tiles
      </div>
    </div>
  );
};