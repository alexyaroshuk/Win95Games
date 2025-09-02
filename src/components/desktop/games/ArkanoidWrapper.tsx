'use client';

import React, { useState, useRef } from 'react';
import { ArkanoidGame } from '@/games/arkanoid/components/ArkanoidGame';
import GameMenuBar, { Menu } from '../GameMenuBar';
import { SoundManager } from '@/utils/SoundManager';
import { HelpDialog } from '@/games/common/components/HelpDialog';
import { arkanoidInfo } from '@/games/common/gameData';

interface ArkanoidWrapperProps {
  isActive?: boolean;
}

export default function ArkanoidWrapper({ isActive = false }: ArkanoidWrapperProps) {
  const [gameKey, setGameKey] = useState(0);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [helpActiveTab, setHelpActiveTab] = useState<'about' | 'howToPlay'>('about');
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
        { 
          label: 'How to Play', 
          action: () => {
            setHelpActiveTab('howToPlay');
            setHelpDialogOpen(true);
          }
        },
        { separator: true },
        { 
          label: 'About Arkanoid', 
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
      <ArkanoidGame key={gameKey} isActive={isActive} />
      <HelpDialog
        isOpen={helpDialogOpen}
        onClose={() => setHelpDialogOpen(false)}
        gameInfo={arkanoidInfo}
        activeTab={helpActiveTab}
      />
    </div>
  );
}