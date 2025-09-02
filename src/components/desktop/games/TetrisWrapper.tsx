'use client';

import React, { useState, useRef } from 'react';
import { TetrisGame } from '@/games/tetris/components/TetrisGame';
import GameMenuBar, { Menu } from '../GameMenuBar';
import { SoundManager } from '@/utils/SoundManager';

interface TetrisWrapperProps {
  isActive?: boolean;
}

export default function TetrisWrapper({ isActive = false }: TetrisWrapperProps) {
  const [gameKey, setGameKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const soundManager = useRef(SoundManager.getInstance());

  const handleNewGame = () => {
    setGameKey(prev => prev + 1);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const menus: Menu[] = [
    {
      label: 'Game',
      underline: 0,
      items: [
        { label: 'New Game', action: handleNewGame, hotkey: 'F2' },
        { label: 'Pause', action: handlePause, hotkey: 'P' },
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
        { label: 'About Tetris', action: () => {} }
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
        <TetrisGame key={gameKey} isActive={isActive} />
      </div>
    </div>
  );
}