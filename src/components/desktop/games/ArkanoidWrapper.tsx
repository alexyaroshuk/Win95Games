'use client';

import React from 'react';
import { ArkanoidGame } from '@/games/arkanoid/components/ArkanoidGame';

interface ArkanoidWrapperProps {
  isActive?: boolean;
}

export default function ArkanoidWrapper({ isActive = false }: ArkanoidWrapperProps) {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <ArkanoidGame isActive={isActive} />
    </div>
  );
}