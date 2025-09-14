'use client';

import React from 'react';

interface GameContainerProps {
  children: React.ReactNode;
}

export default function GameContainer({ children }: GameContainerProps) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 0
    }}>
      {children}
    </div>
  );
}