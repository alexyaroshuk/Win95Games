'use client';

import React from 'react';
import { MinesweeperGame } from '@/games/minesweeper/components/MinesweeperGame';
import { GameSettings } from '@/games/minesweeper/core/types';

const defaultSettings: GameSettings = {
  difficulty: 'beginner',
  rows: 9,
  cols: 9,
  mines: 10
};

interface MinesweeperWrapperProps {
  isActive?: boolean;
}

export default function MinesweeperWrapper({ isActive = false }: MinesweeperWrapperProps) {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <MinesweeperGame initialSettings={defaultSettings} />
    </div>
  );
}