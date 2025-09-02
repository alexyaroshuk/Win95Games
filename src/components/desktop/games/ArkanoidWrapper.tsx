'use client';

import React, { useState, useRef } from 'react';
import { ArkanoidGame } from '@/games/arkanoid/components/ArkanoidGame';
import GameMenuBar, { Menu } from '../GameMenuBar';
import { SoundManager } from '@/utils/SoundManager';

interface ArkanoidWrapperProps {
  isActive?: boolean;
}

export default function ArkanoidWrapper({ isActive = false }: ArkanoidWrapperProps) {
  const [gameKey, setGameKey] = useState(0);
  const soundManager = useRef(SoundManager.getInstance());

  const handleNewGame = () => {
    setGameKey(prev => prev + 1);
  };

  const menus: Menu[] = [
    {
      label: 'Game',
      underline: 0,
      items: [
        { label: 'New Game', action: handleNewGame, hotkey: 'F2' },
        { label: 'Pause', action: () => {}, hotkey: 'P' },
        { separator: true },
        { 
          label: 'Sound', 
          action: () => {
            soundManager.current.setEnabled(!soundManager.current.isEnabled());
          },
          checked: soundManager.current.isEnabled()
        }
      ]
    },
    {
      label: 'Help',
      underline: 0,
      items: [
        { label: 'Controls', action: () => {} },
        { label: 'About Arkanoid', action: () => {} }
      ]
    }
  ];

  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <GameMenuBar menus={menus} />
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <ArkanoidGame key={gameKey} isActive={isActive} />
      </div>
    </div>
  );
}