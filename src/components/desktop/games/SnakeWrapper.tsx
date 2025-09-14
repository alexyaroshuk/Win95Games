'use client';

import React, { useState, useRef } from 'react';
import { SnakeGame } from '@/games/snake/components/SnakeGame';
import GameMenuBar, { Menu } from '../GameMenuBar';
import GameContainer from '../GameContainer';
import { SoundManager } from '@/utils/SoundManager';
import { HelpDialog } from '@/games/common/components/HelpDialog';
import { snakeInfo } from '@/games/common/gameData';

interface SnakeWrapperProps {
  isActive?: boolean;
}

export default function SnakeWrapper({ isActive = false }: SnakeWrapperProps) {
  const [gameKey, setGameKey] = useState(0);
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [helpActiveTab, setHelpActiveTab] = useState<'about' | 'howToPlay'>('about');
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
        { 
          label: 'How to Play', 
          action: () => {
            setHelpActiveTab('howToPlay');
            setHelpDialogOpen(true);
          }
        },
        { separator: true },
        { 
          label: 'About Snake', 
          action: () => {
            setHelpActiveTab('about');
            setHelpDialogOpen(true);
          }
        }
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <GameMenuBar menus={menus} />
      <GameContainer>
        <SnakeGame key={gameKey} initialSpeed={speed} isActive={isActive} />
      </GameContainer>
      <HelpDialog
        isOpen={helpDialogOpen}
        onClose={() => setHelpDialogOpen(false)}
        gameInfo={snakeInfo}
        activeTab={helpActiveTab}
      />
    </div>
  );
}