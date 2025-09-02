'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { WindowsWindow } from '@/games/common/components/WindowsWindow';
import { GameMenu } from '@/games/common/components/GameMenu';
import Link from 'next/link';
import { Win95Button } from '@/games/common/components/ui/Win95Button';

const SnakeGame = dynamic(
  () => import('@/games/snake/SnakeGame').then(mod => ({ default: mod.SnakeGame })),
  { 
    loading: () => <div>Loading Snake...</div>,
    ssr: false 
  }
);

export default function SnakePage() {
  const [gameKey, setGameKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');

  const handleNewGame = () => {
    setGameKey(prev => prev + 1);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(prev => !prev);
  };

  const handleSpeedChange = (newSpeed: 'slow' | 'normal' | 'fast') => {
    setSpeed(newSpeed);
    setGameKey(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/games">
            <Win95Button variant="secondary">← Back to Games</Win95Button>
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center tracking-wider">
            🐍 Snake
          </h1>
        </div>

        <WindowsWindow
          title="Snake"
          menuBar={
            <GameMenu
              gameName="Snake"
              onNewGame={handleNewGame}
              onPauseGame={handlePause}
              isPaused={isPaused}
              customMenuItems={[
                {
                  label: 'Options',
                  items: [
                    { 
                      label: 'Slow Speed', 
                      onClick: () => handleSpeedChange('slow'),
                      checked: speed === 'slow'
                    },
                    { 
                      label: 'Normal Speed', 
                      onClick: () => handleSpeedChange('normal'),
                      checked: speed === 'normal'
                    },
                    { 
                      label: 'Fast Speed', 
                      onClick: () => handleSpeedChange('fast'),
                      checked: speed === 'fast'
                    }
                  ]
                }
              ]}
            />
          }
        >
          <SnakeGame key={gameKey} initialSpeed={speed} isPaused={isPaused} />
        </WindowsWindow>
      </div>
    </main>
  );
}