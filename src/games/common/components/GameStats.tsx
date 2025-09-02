'use client';

import React from 'react';
import { win95Theme } from '@/styles/theme';
import { LEDDisplay } from './ui/LEDDisplay';

export interface StatItem {
  label: string;
  value: string | number;
  minWidth?: string;
}

interface GameStatsProps {
  stats: StatItem[];
}

export const GameStats: React.FC<GameStatsProps> = ({ stats }) => {
  const { colors, borders, spacing, fonts } = win95Theme;

  return (
    <div style={{
      display: 'flex',
      gap: spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.md
    }}>
      {stats.map((stat, index) => (
        <div
          key={index}
          style={{
            ...borders.inset,
            padding: spacing.sm,
            backgroundColor: '#000',
            minWidth: stat.minWidth || '100px'
          }}
        >
          <div style={{
            fontFamily: fonts.system,
            fontSize: '11px',
            color: colors.textSecondary,
            marginBottom: '4px',
            textAlign: 'center'
          }}>
            {stat.label.toUpperCase()}
          </div>
          <LEDDisplay 
            value={stat.value.toString().padStart(
              stat.label === 'TIME' ? 3 : 
              stat.label === 'LEVEL' ? 2 : 
              6, '0'
            )} 
          />
        </div>
      ))}
    </div>
  );
};