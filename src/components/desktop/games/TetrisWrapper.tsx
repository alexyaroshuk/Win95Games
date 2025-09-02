'use client';

import React, { useState, useRef } from 'react';
import { TetrisGame } from '@/games/tetris/components/TetrisGame';
import GameMenuBar, { Menu } from '../GameMenuBar';
import { SoundManager } from '@/utils/SoundManager';
import { HelpDialog } from '@/games/common/components/HelpDialog';
import { tetrisInfo } from '@/games/common/gameData';

interface TetrisWrapperProps {
  isActive?: boolean;
}

export default function TetrisWrapper({ isActive = false }: TetrisWrapperProps) {
  const [gameKey, setGameKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [helpActiveTab, setHelpActiveTab] = useState<'about' | 'howToPlay'>('about');
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
        { label: '', separator: true },
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
        { label: '', separator: true },
        { 
          label: 'About Tetris', 
          action: () => {
            setHelpActiveTab('about');
            setHelpDialogOpen(true);
          }
        }
      ]
    }
  ];

  return (
    <div>
      <GameMenuBar menus={menus} />
      <TetrisGame key={gameKey} isActive={isActive} />
      <HelpDialog
        isOpen={helpDialogOpen}
        onClose={() => setHelpDialogOpen(false)}
        gameInfo={tetrisInfo}
        activeTab={helpActiveTab}
      />
    </div>
  );
}