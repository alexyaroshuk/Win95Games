'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { WindowsWindow } from '@/games/common/components/WindowsWindow';
import { GameMenu } from '@/games/common/components/GameMenu';
import { Win95Button } from '@/games/common/components/ui/Win95Button';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const TetrisGame = dynamic(
  () => import('@/games/tetris/components/TetrisGame').then(mod => ({ default: mod.TetrisGame })),
  { 
    loading: () => <div>Loading Tetris...</div>,
    ssr: false 
  }
);

export default function TetrisPage() {
  const [gameKey, setGameKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [startLevel, setStartLevel] = useState(0);

  const handleNewGame = () => {
    setGameKey(prev => prev + 1);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(prev => !prev);
  };

  const handleLevelChange = (level: number) => {
    setStartLevel(level);
    setGameKey(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/games">
            <Win95Button variant="default">← Back to Games</Win95Button>
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center tracking-wider">
            🧱 Tetris
          </h1>
        </div>

        <WindowsWindow
          title="Tetris"
          menuBar={
            <GameMenu
              gameName="Tetris"
              onNewGame={handleNewGame}
              onPauseGame={handlePause}
              isPaused={isPaused}
              customMenuItems={[
                {
                  label: 'Options',
                  items: [
                    { 
                      label: 'Start Level 0', 
                      onClick: () => handleLevelChange(0),
                      checked: startLevel === 0
                    },
                    { 
                      label: 'Start Level 5', 
                      onClick: () => handleLevelChange(5),
                      checked: startLevel === 5
                    },
                    { 
                      label: 'Start Level 10', 
                      onClick: () => handleLevelChange(10),
                      checked: startLevel === 10
                    }
                  ]
                }
              ]}
            />
          }
        >
          <ErrorBoundary>
            <TetrisGame key={gameKey} />
          </ErrorBoundary>
        </WindowsWindow>
      </div>
    </main>
  );
}