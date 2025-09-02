'use client';

import React from 'react';
import { SnakeGame } from '@/games/snake/components/SnakeGame';

interface SnakeWrapperProps {
  isActive?: boolean;
}

export default function SnakeWrapper({ isActive = false }: SnakeWrapperProps) {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <SnakeGame isActive={isActive} />
    </div>
  );
}