'use client';

import { MinesweeperGame } from '@/components/MinesweeperGame';
import { WindowsWindow } from '@/components/WindowsWindow';
import { WindowsMenu } from '@/components/WindowsMenu';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useState, useMemo } from 'react';
import { GameSettings, Difficulty } from '@/core/types';

export default function Home() {
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>('beginner');
  const [customConfig, setCustomConfig] = useState({ rows: 9, cols: 9, mines: 10 });
  const [gameKey, setGameKey] = useState(0);
  const [allowQuestionMarks, setAllowQuestionMarks] = useState(false);

  const gameSettings: GameSettings = useMemo(() => ({
    difficulty: currentDifficulty,
    customConfig: currentDifficulty === 'custom' ? customConfig : undefined,
    allowQuestionMarks
  }), [currentDifficulty, customConfig, allowQuestionMarks]);

  const handleNewGame = (difficulty: 'beginner' | 'intermediate' | 'expert') => {
    setCurrentDifficulty(difficulty);
    setGameKey(prev => prev + 1);
  };

  const handleResetGame = () => {
    setGameKey(prev => prev + 1);
  };

  const handleToggleQuestionMarks = () => {
    setAllowQuestionMarks(prev => !prev);
  };

  const handleCustomGame = (rows: number, cols: number, mines: number) => {
    setCustomConfig({ rows, cols, mines });
    setCurrentDifficulty('custom');
    setGameKey(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8 tracking-wider">
          🎯 Minesweeper
        </h1>

        <WindowsWindow
          title="Minesweeper"
          menuBar={
            <WindowsMenu
              onNewGame={handleNewGame}
              onCustomGame={handleCustomGame}
              onResetGame={handleResetGame}
              currentDifficulty={currentDifficulty as 'beginner' | 'intermediate' | 'expert'}
              allowQuestionMarks={allowQuestionMarks}
              onToggleQuestionMarks={handleToggleQuestionMarks}
            />
          }
        >
          <ErrorBoundary>
            <MinesweeperGame 
              key={gameKey} 
              initialSettings={gameSettings}
            />
          </ErrorBoundary>
        </WindowsWindow>
      </div>
    </main>
  );
}
