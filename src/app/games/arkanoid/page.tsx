'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { WindowsWindow } from '@/games/common/components/WindowsWindow';
import { Win95Button } from '@/games/common/components/ui/Win95Button';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const ArkanoidGame = dynamic(
  () => import('@/games/arkanoid/components/ArkanoidGame').then(mod => ({ default: mod.ArkanoidGame })),
  { 
    loading: () => <div>Loading Arkanoid...</div>,
    ssr: false 
  }
);

export default function ArkanoidPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/games">
            <Win95Button variant="secondary">← Back to Games</Win95Button>
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center tracking-wider">
            🎮 Arkanoid
          </h1>
        </div>

        <WindowsWindow title="Arkanoid">
          <ErrorBoundary>
            <ArkanoidGame />
          </ErrorBoundary>
        </WindowsWindow>
      </div>
    </main>
  );
}