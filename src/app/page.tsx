'use client';

import dynamic from 'next/dynamic';

const Desktop = dynamic(() => import('@/components/desktop/Desktop'), { ssr: false });
const MinesweeperWrapper = dynamic(() => import('@/components/desktop/games/MinesweeperWrapper'), { ssr: false });
const TetrisWrapper = dynamic(() => import('@/components/desktop/games/TetrisWrapper'), { ssr: false });
const ArkanoidWrapper = dynamic(() => import('@/components/desktop/games/ArkanoidWrapper'), { ssr: false });
const SnakeWrapper = dynamic(() => import('@/components/desktop/games/SnakeWrapper'), { ssr: false });
const Game2048Wrapper = dynamic(() => import('@/components/desktop/games/Game2048Wrapper'), { ssr: false });
const PongWrapper = dynamic(() => import('@/components/desktop/games/PongWrapper'), { ssr: false });

const games = [
  {
    id: 'minesweeper',
    title: 'Minesweeper',
    icon: '💣',
    component: MinesweeperWrapper
  },
  {
    id: 'tetris',
    title: 'Tetris',
    icon: '🧱',
    component: TetrisWrapper
  },
  {
    id: 'arkanoid',
    title: 'Arkanoid',
    icon: '🎮',
    component: ArkanoidWrapper
  },
  {
    id: 'snake',
    title: 'Snake',
    icon: '🐍',
    component: SnakeWrapper
  },
  {
    id: '2048',
    title: '2048',
    icon: '🔢',
    component: Game2048Wrapper
  },
  {
    id: 'pong',
    title: 'Pong',
    icon: '🏓',
    component: PongWrapper
  }
];

export default function Home() {
  return <Desktop games={games} />;
}