'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { WindowsWindow } from '@/games/common/components/WindowsWindow';
import { Win95Button } from '@/games/common/components/ui/Win95Button';
import { win95Theme } from '@/styles/theme';

type Grid = (number | null)[][];
type Direction = 'up' | 'down' | 'left' | 'right';
type AnimationState = {
  newTiles: Set<string>;
  mergedTiles: Set<string>;
};

const GRID_SIZE = 4;

const tileColors: { [key: number]: { bg: string; text: string } } = {
  2: { bg: '#ffffff', text: '#000000' },
  4: { bg: '#dfdfdf', text: '#000000' },
  8: { bg: '#008080', text: '#ffffff' },
  16: { bg: '#000080', text: '#ffffff' },
  32: { bg: '#800080', text: '#ffffff' },
  64: { bg: '#808000', text: '#ffffff' },
  128: { bg: '#008000', text: '#ffffff' },
  256: { bg: '#ff0000', text: '#ffffff' },
  512: { bg: '#0000ff', text: '#ffffff' },
  1024: { bg: '#ff00ff', text: '#ffffff' },
  2048: { bg: '#ffff00', text: '#000000' },
};

export function Game2048() {
  const [grid, setGrid] = useState<Grid>(() => initializeGrid());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [animationState, setAnimationState] = useState<AnimationState>({
    newTiles: new Set(),
    mergedTiles: new Set()
  });
  
  const { colors, spacing, fonts, borders } = win95Theme;

  function initializeGrid(): Grid {
    const newGrid: Grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
    const result1 = addRandomTile(newGrid);
    const result2 = addRandomTile(newGrid);
    const initialNewTiles = new Set<string>();
    if (result1.position) initialNewTiles.add(result1.position);
    if (result2.position) initialNewTiles.add(result2.position);
    setTimeout(() => {
      setAnimationState({ newTiles: initialNewTiles, mergedTiles: new Set() });
    }, 0);
    return newGrid;
  }

  function addRandomTile(grid: Grid): { success: boolean; position?: string } {
    const emptyCells: [number, number][] = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === null) {
          emptyCells.push([i, j]);
        }
      }
    }
    
    if (emptyCells.length === 0) return { success: false };
    
    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    return { success: true, position: `${row}-${col}` };
  }

  function moveGrid(grid: Grid, direction: Direction): { newGrid: Grid; points: number; moved: boolean; mergedPositions: Set<string> } {
    let newGrid = grid.map(row => [...row]);
    let points = 0;
    let moved = false;
    const mergedPositions = new Set<string>();

    const rotate = (grid: Grid): Grid => {
      const rotated: Grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          rotated[i][j] = grid[GRID_SIZE - 1 - j][i];
        }
      }
      return rotated;
    };

    const moveLeft = (grid: Grid): { grid: Grid; points: number; moved: boolean; mergedCells: [number, number][] } => {
      let moved = false;
      let points = 0;
      const newGrid = grid.map(row => [...row]);
      const mergedCells: [number, number][] = [];

      for (let i = 0; i < GRID_SIZE; i++) {
        const row = newGrid[i].filter(cell => cell !== null);
        const merged: number[] = [];
        
        for (let j = 0; j < row.length - 1; j++) {
          if (row[j] === row[j + 1]) {
            row[j] = (row[j] as number) * 2;
            points += row[j] as number;
            row.splice(j + 1, 1);
            merged.push(j);
            mergedCells.push([i, j]);
          }
        }
        
        const newRow = [...row, ...Array(GRID_SIZE - row.length).fill(null)];
        
        if (newRow.some((cell, index) => cell !== newGrid[i][index])) {
          moved = true;
        }
        
        newGrid[i] = newRow;
      }

      return { grid: newGrid, points, moved, mergedCells };
    };

    if (direction === 'left') {
      const result = moveLeft(newGrid);
      result.mergedCells.forEach(([row, col]) => mergedPositions.add(`${row}-${col}`));
      return { newGrid: result.grid, points: result.points, moved: result.moved, mergedPositions };
    } else if (direction === 'right') {
      newGrid = newGrid.map(row => row.reverse());
      const result = moveLeft(newGrid);
      newGrid = result.grid.map(row => row.reverse());
      result.mergedCells.forEach(([row, col]) => mergedPositions.add(`${row}-${GRID_SIZE - 1 - col}`));
      return { newGrid, points: result.points, moved: result.moved, mergedPositions };
    } else if (direction === 'up') {
      newGrid = rotate(rotate(rotate(newGrid)));
      const result = moveLeft(newGrid);
      newGrid = rotate(result.grid);
      result.mergedCells.forEach(([row, col]) => mergedPositions.add(`${col}-${row}`));
      return { newGrid, points: result.points, moved: result.moved, mergedPositions };
    } else {
      newGrid = rotate(newGrid);
      const result = moveLeft(newGrid);
      newGrid = rotate(rotate(rotate(result.grid)));
      result.mergedCells.forEach(([row, col]) => mergedPositions.add(`${GRID_SIZE - 1 - col}-${row}`));
      return { newGrid, points: result.points, moved: result.moved, mergedPositions };
    }
  }

  function checkGameOver(grid: Grid): boolean {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === null) return false;
        if (grid[i][j] === 2048 && !won) {
          setWon(true);
          return false;
        }
        if (i < GRID_SIZE - 1 && grid[i][j] === grid[i + 1][j]) return false;
        if (j < GRID_SIZE - 1 && grid[i][j] === grid[i][j + 1]) return false;
      }
    }
    return true;
  }

  const handleMove = useCallback((direction: Direction) => {
    if (gameOver && !won) return;
    
    const { newGrid, points, moved, mergedPositions } = moveGrid(grid, direction);
    
    if (moved) {
      const tileResult = addRandomTile(newGrid);
      setGrid(newGrid);
      setScore(prev => prev + points);
      setHasMoved(true);
      
      const newTiles = new Set<string>();
      if (tileResult.position) {
        newTiles.add(tileResult.position);
      }
      
      setAnimationState({
        newTiles,
        mergedTiles: mergedPositions
      });
      
      setTimeout(() => {
        setAnimationState({
          newTiles: new Set(),
          mergedTiles: new Set()
        });
      }, 300);
      
      if (checkGameOver(newGrid)) {
        setGameOver(true);
      }
    }
  }, [grid, gameOver, won]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          handleMove('up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          handleMove('down');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          handleMove('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          handleMove('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleMove]);

  useEffect(() => {
    const saved = localStorage.getItem('2048BestScore');
    if (saved) {
      setBestScore(parseInt(saved, 10));
    }
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('2048BestScore', score.toString());
    }
  }, [score, bestScore]);

  const resetGame = () => {
    setGrid(initializeGrid());
    setScore(0);
    setGameOver(false);
    setWon(false);
    setHasMoved(false);
    setAnimationState({ newTiles: new Set(), mergedTiles: new Set() });
  };

  const handleSwipeStart = useRef<{ x: number; y: number } | null>(null);
  const swipeRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    handleSwipeStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!handleSwipeStart.current) return;
    
    const deltaX = e.changedTouches[0].clientX - handleSwipeStart.current.x;
    const deltaY = e.changedTouches[0].clientY - handleSwipeStart.current.y;
    const minSwipeDistance = 50;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        handleMove(deltaX > 0 ? 'right' : 'left');
      }
    } else {
      if (Math.abs(deltaY) > minSwipeDistance) {
        handleMove(deltaY > 0 ? 'down' : 'up');
      }
    }
    
    handleSwipeStart.current = null;
  };

  return (
    <WindowsWindow title="2048">
      <div style={{
        padding: spacing.md,
        backgroundColor: colors.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: spacing.md
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '320px',
          fontFamily: fonts.system,
          fontSize: '14px',
          marginBottom: spacing.sm
        }}>
          <div>Score: {score}</div>
          <div>Best: {bestScore}</div>
        </div>

        <div 
          ref={swipeRef}
          style={{
            ...borders.inset,
            backgroundColor: colors.background,
            padding: '4px',
            position: 'relative',
            touchAction: 'none'
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 70px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 70px)`,
            gap: '4px'
          }}>
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const key = `${rowIndex}-${colIndex}`;
                const isNew = animationState.newTiles.has(key);
                const isMerged = animationState.mergedTiles.has(key);
                
                return (
                  <div
                    key={key}
                    className={isNew ? 'tile-spawn' : isMerged ? 'tile-merge' : ''}
                    style={{
                      width: '70px',
                      height: '70px',
                      backgroundColor: cell ? tileColors[cell]?.bg || '#800000' : '#c0c0c0',
                      color: cell ? tileColors[cell]?.text || '#ffffff' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: fonts.system,
                      fontSize: cell && cell >= 1024 ? '20px' : cell && cell >= 128 ? '24px' : '28px',
                      fontWeight: 'bold',
                      ...(cell ? borders.raised : borders.inset),
                      transition: 'all 0.15s ease-in-out'
                    }}
                  >
                    {cell || ''}
                  </div>
                );
              })
            )}
          </div>

          {(gameOver || won) && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: colors.background,
              ...borders.raised,
              padding: spacing.lg,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <h2 style={{
                fontFamily: fonts.system,
                fontSize: '20px',
                marginBottom: spacing.md,
                color: colors.text
              }}>
                {won ? 'You Win!' : 'Game Over!'}
              </h2>
              <p style={{
                fontFamily: fonts.system,
                fontSize: '14px',
                marginBottom: spacing.md,
                color: colors.text
              }}>
                Score: {score}
              </p>
              <Win95Button onClick={resetGame} variant="primary">
                {won ? 'Play Again' : 'Try Again'}
              </Win95Button>
              {won && !gameOver && (
                <Win95Button 
                  onClick={() => setWon(false)} 
                  variant="default"
                  style={{ marginTop: spacing.sm }}
                >
                  Continue Playing
                </Win95Button>
              )}
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: spacing.sm
        }}>
          <Win95Button onClick={resetGame} variant="default">
            New Game
          </Win95Button>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: spacing.xs,
            width: '120px',
            marginTop: spacing.sm
          }}>
            <div />
            <Win95Button 
              onClick={() => handleMove('up')}
              variant="default"
              style={{ padding: '4px 8px' }}
            >
              ↑
            </Win95Button>
            <div />
            <Win95Button 
              onClick={() => handleMove('left')}
              variant="default"
              style={{ padding: '4px 8px' }}
            >
              ←
            </Win95Button>
            <Win95Button 
              onClick={() => handleMove('down')}
              variant="default"
              style={{ padding: '4px 8px' }}
            >
              ↓
            </Win95Button>
            <Win95Button 
              onClick={() => handleMove('right')}
              variant="default"
              style={{ padding: '4px 8px' }}
            >
              →
            </Win95Button>
          </div>
          
          <div style={{
            fontFamily: fonts.system,
            fontSize: '12px',
            color: colors.textSecondary,
            textAlign: 'center',
            marginTop: spacing.xs
          }}>
            Use Arrow Keys or WASD to play
          </div>
        </div>
      </div>
      <style>{`
        @keyframes tileSpawn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes tileMerge {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .tile-spawn {
          animation: tileSpawn 0.3s ease-out;
        }
        
        .tile-merge {
          animation: tileMerge 0.3s ease-out;
        }
      `}</style>
    </WindowsWindow>
  );
}

const { useRef } = React;