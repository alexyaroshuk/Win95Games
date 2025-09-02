'use client';

import React from 'react';
import { SnakeGame } from '@/games/snake/SnakeGame';

export default function SnakePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <SnakeGame />
    </main>
  );
}