'use client';

import React, { useMemo } from 'react';
import { GameSettings } from '../core/types';
import { LEDDisplay } from '../../common/components/ui/LEDDisplay';
import { Win95Button } from '../../common/components/ui/Win95Button';
import { win95Theme } from '@/styles/theme';

interface GameStatsProps {
  mineCount: number;
  flaggedCount: number;
  elapsedTime: number;
  gameStatus: 'idle' | 'playing' | 'won' | 'lost';
  isAnyCellPressed: boolean;
  settings: GameSettings;
  onReset: () => void;
}

export const GameStats = React.memo<GameStatsProps>(({
  mineCount,
  flaggedCount,
  elapsedTime,
  gameStatus,
  isAnyCellPressed,
  settings,
  onReset
}) => {
  const { colors, borders, sizes, spacing } = win95Theme;

  const remainingMines = mineCount - flaggedCount;

  const getSmileyFace = useMemo(() => {
    if (gameStatus === 'won') return '😎';
    if (gameStatus === 'lost') return '💀';
    if (isAnyCellPressed) return '😮';
    return '🙂';
  }, [gameStatus, isAnyCellPressed]);

  const statsWidth = useMemo(() => {
    let cols: number;
    
    if (settings.difficulty === 'custom' && settings.customConfig) {
      cols = settings.customConfig.cols;
    } else if (settings.difficulty !== 'custom') {
      const configMap = { beginner: 9, intermediate: 16, expert: 30 };
      cols = configMap[settings.difficulty];
    } else {
      cols = 9;
    }
    
    return cols * sizes.cell + 6; // +6 for borders
  }, [settings, sizes.cell]);

  const containerStyle = useMemo(() => ({
    ...borders.insetThick,
    padding: spacing.sm,
    width: `${statsWidth}px`,
    boxSizing: 'border-box' as const,
    backgroundColor: colors.backgroundDark
  }), [borders.insetThick, spacing.sm, statsWidth, colors.backgroundDark]);

  const contentStyle = useMemo(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${spacing.xs} ${spacing.md}`
  }), [spacing]);

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <LEDDisplay value={remainingMines} digits={3} />
        
        <Win95Button variant="icon" onClick={onReset}>
          {getSmileyFace}
        </Win95Button>
        
        <LEDDisplay value={elapsedTime} digits={3} />
      </div>
    </div>
  );
});

GameStats.displayName = 'GameStats';