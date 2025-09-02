'use client';

import React from 'react';
import Link from 'next/link';
import { WindowsWindow } from '@/games/common/components/WindowsWindow';
import { Win95Button } from '@/games/common/components/ui/Win95Button';
import { win95Theme } from '@/styles/theme';

interface GameOption {
  id: string;
  title: string;
  description: string;
  route: string;
  icon: string;
}

const games: GameOption[] = [
  {
    id: 'minesweeper',
    title: 'Minesweeper',
    description: 'Classic mine-sweeping puzzle game',
    route: '/games/minesweeper',
    icon: '💣'
  },
  {
    id: 'tetris',
    title: 'Tetris',
    description: 'Falling blocks puzzle game',
    route: '/games/tetris',
    icon: '🧱'
  },
  {
    id: 'arkanoid',
    title: 'Arkanoid',
    description: 'Brick-breaking arcade game',
    route: '/games/arkanoid',
    icon: '🎮'
  },
  {
    id: 'snake',
    title: 'Snake',
    description: 'Classic snake game',
    route: '/games/snake',
    icon: '🐍'
  },
  {
    id: '2048',
    title: '2048',
    description: 'Number sliding puzzle game',
    route: '/games/2048',
    icon: '🔢'
  }
];

export default function GamesMenu() {
  const { colors, spacing, fonts, borders } = win95Theme;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8 tracking-wider">
          🎮 Game Center
        </h1>

        <WindowsWindow title="Select a Game">
          <div style={{
            padding: spacing.lg,
            minWidth: '400px',
            backgroundColor: colors.background
          }}>
            <div style={{
              display: 'grid',
              gap: spacing.md,
              gridTemplateColumns: '1fr'
            }}>
              {games.map((game) => (
                <Link
                  key={game.id}
                  href={game.route}
                  prefetch={true}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      ...borders.raised,
                      padding: spacing.md,
                      backgroundColor: colors.background,
                      cursor: 'pointer',
                      transition: 'all 0.1s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.backgroundLight;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.background;
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing.md
                    }}>
                      <span style={{ fontSize: '32px' }}>{game.icon}</span>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontFamily: fonts.system,
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: colors.text,
                          marginBottom: spacing.xs
                        }}>
                          {game.title}
                        </h3>
                        <p style={{
                          fontFamily: fonts.system,
                          fontSize: '12px',
                          color: colors.textSecondary
                        }}>
                          {game.description}
                        </p>
                      </div>
                      <Win95Button variant="primary">
                        Play
                      </Win95Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </WindowsWindow>
      </div>
    </main>
  );
}