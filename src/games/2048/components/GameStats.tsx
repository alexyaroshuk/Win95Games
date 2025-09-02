'use client';

import React from 'react';
import { GameStats as SharedGameStats } from '../../common/components/GameStats';

interface GameStatsProps {
  score: number;
  bestScore: number;
}

export const GameStats: React.FC<GameStatsProps> = ({ score, bestScore }) => {
  return (
    <SharedGameStats 
      stats={[
        { label: 'Score', value: score, minWidth: '120px' },
        { label: 'Best', value: bestScore, minWidth: '120px' }
      ]}
    />
  );
};