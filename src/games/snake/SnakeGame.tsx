'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WindowsWindow } from '@/games/common/components/WindowsWindow';
import { Win95Button } from '@/games/common/components/ui/Win95Button';
import { win95Theme } from '@/styles/theme';

interface Position {
  x: number;
  y: number;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

export function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameOver'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const directionRef = useRef<Direction>(direction);
  const { colors, spacing, fonts, borders } = win95Theme;

  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const moveSnake = useCallback(() => {
    setSnake(currentSnake => {
      if (gameState !== 'playing') return currentSnake;

      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      switch (directionRef.current) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Wrap around edges
      if (head.x < 0) head.x = GRID_SIZE - 1;
      if (head.x >= GRID_SIZE) head.x = 0;
      if (head.y < 0) head.y = GRID_SIZE - 1;
      if (head.y >= GRID_SIZE) head.y = 0;

      // Check collision with self only
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameState('gameOver');
        return currentSnake;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
        if (speed > 50) {
          setSpeed(prev => prev - 2);
        }
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [gameState, food, generateFood, speed]);

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(moveSnake, speed);
      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      };
    }
  }, [gameState, moveSnake, speed]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      const newDirection = (() => {
        switch (e.key) {
          case 'ArrowUp':
          case 'w':
          case 'W':
            return directionRef.current !== 'DOWN' ? 'UP' : directionRef.current;
          case 'ArrowDown':
          case 's':
          case 'S':
            return directionRef.current !== 'UP' ? 'DOWN' : directionRef.current;
          case 'ArrowLeft':
          case 'a':
          case 'A':
            return directionRef.current !== 'RIGHT' ? 'LEFT' : directionRef.current;
          case 'ArrowRight':
          case 'd':
          case 'D':
            return directionRef.current !== 'LEFT' ? 'RIGHT' : directionRef.current;
          default:
            return directionRef.current;
        }
      })();

      if (newDirection !== directionRef.current) {
        directionRef.current = newDirection;
        setDirection(newDirection);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState]);

  useEffect(() => {
    const saved = localStorage.getItem('snakeHighScore');
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  }, [score, highScore]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setGameState('playing');
  };

  const handleDirectionClick = (newDirection: Direction) => {
    if (gameState !== 'playing') return;
    
    const isValidMove = 
      (newDirection === 'UP' && directionRef.current !== 'DOWN') ||
      (newDirection === 'DOWN' && directionRef.current !== 'UP') ||
      (newDirection === 'LEFT' && directionRef.current !== 'RIGHT') ||
      (newDirection === 'RIGHT' && directionRef.current !== 'LEFT');
    
    if (isValidMove) {
      directionRef.current = newDirection;
      setDirection(newDirection);
    }
  };

  return (
    <WindowsWindow title="Snake">
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
          padding: `0 ${spacing.sm}`,
          fontFamily: fonts.system,
          fontSize: '14px'
        }}>
          <div>Score: {score}</div>
          <div>High Score: {highScore}</div>
        </div>

        <div style={{
          ...borders.inset,
          position: 'relative',
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
          backgroundColor: '#9b9b9b',
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          boxSizing: 'content-box'
        }}>
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            const isSnake = snake.some(segment => segment.x === x && segment.y === y);
            const isHead = snake[0]?.x === x && snake[0]?.y === y;
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={index}
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  backgroundColor: isHead ? '#004800' : isSnake ? '#00ff00' : isFood ? '#ff0000' : 'transparent',
                  border: (isSnake || isFood) ? '1px solid rgba(0,0,0,0.2)' : 'none'
                }}
              />
            );
          })}

          {gameState === 'gameOver' && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: colors.background,
              ...borders.raised,
              padding: spacing.lg,
              textAlign: 'center'
            }}>
              <h2 style={{
                fontFamily: fonts.system,
                fontSize: '18px',
                marginBottom: spacing.md
              }}>
                Game Over!
              </h2>
              <p style={{
                fontFamily: fonts.system,
                fontSize: '14px',
                marginBottom: spacing.md
              }}>
                Final Score: {score}
              </p>
              <Win95Button onClick={startGame} variant="primary">
                Play Again
              </Win95Button>
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          gap: spacing.md,
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          {gameState === 'idle' && (
            <Win95Button onClick={startGame} variant="primary">
              Start Game
            </Win95Button>
          )}
          
          {gameState === 'playing' && (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: spacing.xs,
                width: '120px'
              }}>
                <div />
                <Win95Button 
                  onClick={() => handleDirectionClick('UP')}
                  variant="default"
                  style={{ padding: '4px 8px' }}
                >
                  ↑
                </Win95Button>
                <div />
                <Win95Button 
                  onClick={() => handleDirectionClick('LEFT')}
                  variant="default"
                  style={{ padding: '4px 8px' }}
                >
                  ←
                </Win95Button>
                <Win95Button 
                  onClick={() => handleDirectionClick('DOWN')}
                  variant="default"
                  style={{ padding: '4px 8px' }}
                >
                  ↓
                </Win95Button>
                <Win95Button 
                  onClick={() => handleDirectionClick('RIGHT')}
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
                textAlign: 'center'
              }}>
                Use Arrow Keys or WASD to move
              </div>
            </>
          )}
        </div>
      </div>
    </WindowsWindow>
  );
}