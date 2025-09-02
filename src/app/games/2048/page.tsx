'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { WindowsWindow } from '@/games/common/components/WindowsWindow';
import { GameMenu } from '@/games/common/components/GameMenu';
import Link from 'next/link';
import { Win95Button } from '@/games/common/components/ui/Win95Button';

const Game2048 = dynamic(
  () => import('@/games/2048/Game2048').then(mod => ({ default: mod.Game2048 })),
  { 
    loading: () => <div>Loading 2048...</div>,
    ssr: false 
  }
);

export default function Game2048Page() {
  const [gameKey, setGameKey] = useState(0);
  const [targetScore, setTargetScore] = useState(2048);

  const handleNewGame = () => {
    setGameKey(prev => prev + 1);
  };

  const handleTargetChange = (target: number) => {
    setTargetScore(target);
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
            🎯 2048
          </h1>
        </div>

        <WindowsWindow
          title="2048"
          menuBar={
            <GameMenu
              gameName="2048"
              onNewGame={handleNewGame}
              customMenuItems={[
                {
                  label: 'Options',
                  items: [
                    { 
                      label: 'Target: 2048', 
                      onClick: () => handleTargetChange(2048),
                      checked: targetScore === 2048
                    },
                    { 
                      label: 'Target: 4096', 
                      onClick: () => handleTargetChange(4096),
                      checked: targetScore === 4096
                    },
                    { 
                      label: 'Target: 8192', 
                      onClick: () => handleTargetChange(8192),
                      checked: targetScore === 8192
                    }
                  ]
                }
              ]}
            />
          }
        >
          <Game2048 key={gameKey} targetScore={targetScore} />
        </WindowsWindow>
      </div>
    </main>
  );
}