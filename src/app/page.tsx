'use client';

import { MinesweeperGame } from '@/components/MinesweeperGame';
import { WindowsWindow } from '@/components/WindowsWindow';
import { WindowsMenu } from '@/components/WindowsMenu';
import { useState } from 'react';

export default function Home() {
  const [currentDifficulty, setCurrentDifficulty] = useState<'beginner' | 'intermediate' | 'expert'>('beginner');
  const [gameKey, setGameKey] = useState(0); // Force re-render when difficulty changes

  const handleNewGame = (difficulty: 'beginner' | 'intermediate' | 'expert') => {
    setCurrentDifficulty(difficulty);
    setGameKey(prev => prev + 1); // Force component re-mount
  };

  const handleResetGame = () => {
    setGameKey(prev => prev + 1); // Force component re-mount
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8 tracking-wider">
          🎯 Minesweeper
        </h1>

        {/* Windows 95-style window container */}
        <WindowsWindow
          title="Minesweeper"
          menuBar={
            <WindowsMenu
              onNewGame={handleNewGame}
              onResetGame={handleResetGame}
              currentDifficulty={currentDifficulty}
            />
          }
        >
          <MinesweeperGame key={gameKey} initialDifficulty={currentDifficulty} />
        </WindowsWindow>
      </div>
    </main>
  );
}
