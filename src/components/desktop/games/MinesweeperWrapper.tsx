'use client';

import React, { useState, useRef } from 'react';
import { MinesweeperGame } from '@/games/minesweeper/components/MinesweeperGame';
import { GameSettings } from '@/games/minesweeper/core/types';
import GameMenuBar, { Menu } from '../GameMenuBar';
import { SoundManager } from '@/utils/SoundManager';
import { CustomGameDialog } from '../dialogs/CustomGameDialog';
import { HelpDialog } from '@/games/common/components/HelpDialog';
import { minesweeperInfo } from '@/games/common/gameData';

const defaultSettings: GameSettings = {
  difficulty: 'beginner',
  allowQuestionMarks: true
};

interface MinesweeperWrapperProps {
  isActive?: boolean;
}

export default function MinesweeperWrapper({}: MinesweeperWrapperProps) {
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);
  const [gameKey, setGameKey] = useState(0);
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [helpActiveTab, setHelpActiveTab] = useState<'about' | 'howToPlay'>('about');
  const [allowQuestionMarks, setAllowQuestionMarks] = useState(true);
  const soundManager = useRef(SoundManager.getInstance());

  const handleNewGame = () => {
    setGameKey(prev => prev + 1);
  };

  const handleDifficultyChange = (difficulty: 'beginner' | 'intermediate' | 'expert') => {
    const newSettings: GameSettings = {
      difficulty,
      allowQuestionMarks: settings.allowQuestionMarks
    };
    setSettings(newSettings);
    setGameKey(prev => prev + 1);
  };


  const handleCustomGame = (rows: number, cols: number, mines: number) => {
    const newSettings: GameSettings = {
      difficulty: 'custom',
      customConfig: { rows, cols, mines },
      allowQuestionMarks: settings.allowQuestionMarks
    };
    setSettings(newSettings);
    setGameKey(prev => prev + 1);
    setCustomDialogOpen(false);
  };

  const handleToggleQuestionMarks = () => {
    const newValue = !allowQuestionMarks;
    setAllowQuestionMarks(newValue);
    const newSettings = {
      ...settings,
      allowQuestionMarks: newValue
    };
    setSettings(newSettings);
  };

  const menus: Menu[] = [
    {
      label: 'Game',
      underline: 0,
      items: [
        { label: 'New', action: handleNewGame, hotkey: 'F2' },
        { separator: true },
        { 
          label: 'Beginner', 
          action: () => handleDifficultyChange('beginner'),
          checked: settings.difficulty === 'beginner'
        },
        { 
          label: 'Intermediate', 
          action: () => handleDifficultyChange('intermediate'),
          checked: settings.difficulty === 'intermediate'
        },
        { 
          label: 'Expert', 
          action: () => handleDifficultyChange('expert'),
          checked: settings.difficulty === 'expert'
        },
        { separator: true },
        { 
          label: 'Custom...', 
          action: () => setCustomDialogOpen(true)
        },
        { separator: true },
        { 
          label: 'Marks (?)', 
          action: handleToggleQuestionMarks,
          checked: allowQuestionMarks
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
          label: 'About Minesweeper', 
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
      <MinesweeperGame 
        key={gameKey} 
        initialSettings={settings}
        onSettingsChange={(newSettings) => setSettings(newSettings)}
      />
      <CustomGameDialog
        isOpen={customDialogOpen}
        onConfirm={handleCustomGame}
        onCancel={() => setCustomDialogOpen(false)}
        currentRows={settings.customConfig?.rows || (settings.difficulty === 'beginner' ? 9 : settings.difficulty === 'intermediate' ? 16 : 16)}
        currentCols={settings.customConfig?.cols || (settings.difficulty === 'beginner' ? 9 : settings.difficulty === 'intermediate' ? 16 : 30)}
        currentMines={settings.customConfig?.mines || (settings.difficulty === 'beginner' ? 10 : settings.difficulty === 'intermediate' ? 40 : 99)}
      />
      <HelpDialog
        isOpen={helpDialogOpen}
        onClose={() => setHelpDialogOpen(false)}
        gameInfo={minesweeperInfo}
        activeTab={helpActiveTab}
      />
    </div>
  );
}