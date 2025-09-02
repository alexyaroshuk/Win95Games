import { useState, useEffect, useRef, useCallback } from 'react';
import { Position, Direction, GameState, INITIAL_SPEED } from '../core/types';
import { SnakeGameEngine } from '../core/GameEngine';
import { SoundManager } from '@/utils/SoundManager';

const SPEED_SETTINGS = {
  slow: 200,
  normal: 150,
  fast: 100
};

export const useSnakeGame = (initialSpeed: 'slow' | 'normal' | 'fast' = 'normal', isActive: boolean = true) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(SPEED_SETTINGS[initialSpeed]);
  const [isPaused, setIsPaused] = useState(false);
  
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const directionRef = useRef<Direction>(direction);
  const soundManager = useRef(SoundManager.getInstance());

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('snakeHighScore');
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Save high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  }, [score, highScore]);

  const moveSnake = useCallback(() => {
    const currentState = {
      snake,
      food,
      direction: directionRef.current,
      gameState,
      score,
      highScore,
      speed
    };

    const updates = SnakeGameEngine.moveSnake(currentState);

    if (updates.snake) setSnake(updates.snake);
    if (updates.food) {
      setFood(updates.food);
      // Play eat sound when food is eaten (score increases)
      if (updates.score !== undefined && updates.score > score) {
        soundManager.current.playEatFood();
      }
    }
    if (updates.gameState) {
      setGameState(updates.gameState);
      // Play game over sound
      if (updates.gameState === 'gameOver') {
        soundManager.current.playGameOver();
      }
    }
    if (updates.score !== undefined) setScore(updates.score);
    if (updates.speed !== undefined) setSpeed(updates.speed);
  }, [snake, food, gameState, score, highScore, speed]);

  // Game loop
  useEffect(() => {
    if (gameState === 'playing' && !isPaused) {
      gameLoopRef.current = setInterval(moveSnake, speed);
      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      };
    }
  }, [gameState, moveSnake, speed, isPaused]);

  // Keyboard controls
  useEffect(() => {
    if (!isActive) return;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      const newDirection = SnakeGameEngine.getDirectionFromKey(e.key, directionRef.current);
      if (newDirection) {
        directionRef.current = newDirection;
        setDirection(newDirection);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, isActive]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setScore(0);
    setSpeed(SPEED_SETTINGS[initialSpeed]);
    setGameState('playing');
    setIsPaused(false);
  };

  const pauseGame = () => {
    if (gameState === 'playing') {
      setGameState(gameState === 'paused' ? 'playing' : 'paused');
    }
  };
  
  const setGamePaused = (paused: boolean) => {
    setIsPaused(paused);
  };

  const handleDirectionClick = (newDirection: Direction) => {
    if (gameState !== 'playing') return;
    
    if (SnakeGameEngine.isValidDirectionChange(directionRef.current, newDirection)) {
      directionRef.current = newDirection;
      setDirection(newDirection);
    }
  };

  return {
    snake,
    food,
    direction,
    gameState,
    score,
    highScore,
    speed,
    startGame,
    pauseGame,
    handleDirectionClick,
    setGamePaused
  };
};