'use client';

import React, { useState, useRef } from 'react';
import { PongGame } from '@/games/pong/components/PongGame';
import GameMenuBar, { Menu } from '../GameMenuBar';
import { SoundManager } from '@/utils/SoundManager';
import { HelpDialog } from '@/games/common/components/HelpDialog';

interface PongWrapperProps {
  isActive?: boolean;
}

const pongInfo = {
  name: 'Pong',
  description: 'The classic arcade game that started it all! Battle against the AI in this timeless tennis-like game.',
  howToPlay: [
    'Use ↑/W to move your paddle up',
    'Use ↓/S to move your paddle down',
    'Press SPACE to start a new game',
    'Press P to pause/resume',
    'Press R to reset the game',
    'First to 11 points wins!',
    'The ball speeds up with each hit',
    'Try different difficulty levels for more challenge'
  ],
  tips: [
    'Position your paddle to hit the ball at different angles',
    'The ball direction changes based on where it hits your paddle',
    'Watch the AI patterns to anticipate the ball movement',
    'On harder difficulties, the AI reacts faster'
  ]
};

export default function PongWrapper({ isActive = false }: PongWrapperProps) {
  const [gameKey, setGameKey] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [helpActiveTab, setHelpActiveTab] = useState<'about' | 'howToPlay'>('about');
  const soundManager = useRef(SoundManager.getInstance());

  const handleNewGame = () => {
    setGameKey(prev => prev + 1);
  };

  const handleDifficultyChange = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDifficulty);
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
          label: 'Easy', 
          action: () => handleDifficultyChange('easy'),
          checked: difficulty === 'easy'
        },
        { 
          label: 'Medium', 
          action: () => handleDifficultyChange('medium'),
          checked: difficulty === 'medium'
        },
        { 
          label: 'Hard', 
          action: () => handleDifficultyChange('hard'),
          checked: difficulty === 'hard'
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
          label: 'About Pong', 
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
      <PongGame key={gameKey} difficulty={difficulty} isActive={isActive} />
      <HelpDialog
        isOpen={helpDialogOpen}
        onClose={() => setHelpDialogOpen(false)}
        gameInfo={pongInfo}
        activeTab={helpActiveTab}
      />
    </div>
  );
}