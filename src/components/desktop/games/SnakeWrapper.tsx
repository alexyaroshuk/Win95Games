'use client';

import React, { useState, useRef } from 'react';
import { SnakeGame } from '@/games/snake/components/SnakeGame';
import GameMenuBar, { Menu } from '../GameMenuBar';
import { SoundManager } from '@/utils/SoundManager';

interface SnakeWrapperProps {
  isActive?: boolean;
}

export default function SnakeWrapper({ isActive = false }: SnakeWrapperProps) {
  const [gameKey, setGameKey] = useState(0);
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const soundManager = useRef(SoundManager.getInstance());

  const handleNewGame = () => {
    setGameKey(prev => prev + 1);
  };

  const handleSpeedChange = (newSpeed: 'slow' | 'normal' | 'fast') => {
    setSpeed(newSpeed);
    setGameKey(prev => prev + 1);
  };

  const menus: Menu[] = [
    {
      label: 'Game',
      underline: 0,
      items: [
        { label: 'New Game', action: handleNewGame, hotkey: 'F2' },
        { separator: true },
        { 
          label: 'Slow', 
          action: () => handleSpeedChange('slow'),
          checked: speed === 'slow'
        },
        { 
          label: 'Normal', 
          action: () => handleSpeedChange('normal'),
          checked: speed === 'normal'
        },
        { 
          label: 'Fast', 
          action: () => handleSpeedChange('fast'),
          checked: speed === 'fast'
        },
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
        { label: 'About Snake', action: () => {} }
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
        <SnakeGame key={gameKey} initialSpeed={speed} isActive={isActive} />
      </div>
    </div>
  );
}