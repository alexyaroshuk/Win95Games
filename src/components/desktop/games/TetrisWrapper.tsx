'use client';

import React from 'react';
import { TetrisGame } from '@/games/tetris/components/TetrisGame';

interface TetrisWrapperProps {
  isActive?: boolean;
}

export default function TetrisWrapper({ isActive = false }: TetrisWrapperProps) {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <TetrisGame isActive={isActive} />
    </div>
  );
}