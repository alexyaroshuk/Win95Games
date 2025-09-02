'use client';

import React, { useState, useRef } from 'react';
import { Game2048 } from '@/games/2048/components/Game2048';
import GameMenuBar, { Menu } from '../GameMenuBar';
import { SoundManager } from '@/utils/SoundManager';

interface Game2048WrapperProps {
  isActive?: boolean;
}

export default function Game2048Wrapper({ isActive = false }: Game2048WrapperProps) {
  const [gameKey, setGameKey] = useState(0);
  const [targetScore, setTargetScore] = useState(2048);
  const soundManager = useRef(SoundManager.getInstance());

  const handleNewGame = () => {
    setGameKey(prev => prev + 1);
  };

  const handleTargetChange = (target: number) => {
    setTargetScore(target);
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
          label: 'Target: 2048', 
          action: () => handleTargetChange(2048),
          checked: targetScore === 2048
        },
        { 
          label: 'Target: 4096', 
          action: () => handleTargetChange(4096),
          checked: targetScore === 4096
        },
        { 
          label: 'Target: 8192', 
          action: () => handleTargetChange(8192),
          checked: targetScore === 8192
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
        { label: 'How to Play', action: () => {} },
        { label: 'About 2048', action: () => {} }
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
        <Game2048 key={gameKey} targetScore={targetScore} isActive={isActive} />
      </div>
    </div>
  );
}