'use client';

import React from 'react';
import { Game2048 } from '@/games/2048/components/Game2048';

interface Game2048WrapperProps {
  isActive?: boolean;
}

export default function Game2048Wrapper({ isActive = false }: Game2048WrapperProps) {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Game2048 isActive={isActive} />
    </div>
  );
}