'use client';

import React from 'react';
import { Game2048 } from '@/games/2048/Game2048';

export default function Game2048Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <Game2048 />
    </main>
  );
}