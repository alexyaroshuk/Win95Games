import { useState, useEffect, useRef, useCallback } from 'react';
import { PongGameState } from '../core/types';
import { PongGameEngine } from '../core/GameEngine';
import { SoundManager } from '@/utils/SoundManager';

export const usePongEngine = (difficulty: 'easy' | 'medium' | 'hard' = 'medium', isActive: boolean = true) => {
  const [gameState, setGameState] = useState<PongGameState>(() => 
    PongGameEngine.createInitialState(difficulty)
  );
  
  const animationFrameRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const soundManager = useRef(SoundManager.getInstance());
  const keysPressedRef = useRef<Set<string>>(new Set());

  const movePlayerPaddle = useCallback((direction: 'up' | 'down') => {
    setGameState(prev => ({
      ...prev,
      playerPaddle: PongGameEngine.movePaddle(prev.playerPaddle, direction)
    }));
  }, []);

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...PongGameEngine.createInitialState(prev.difficulty),
      gameState: 'playing'
    }));
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameState: prev.gameState === 'playing' ? 'paused' : 'playing'
    }));
  }, []);

  const reset = useCallback(() => {
    setGameState(PongGameEngine.createInitialState(difficulty));
  }, [difficulty]);

  const setDifficulty = useCallback((newDifficulty: 'easy' | 'medium' | 'hard') => {
    setGameState(prev => ({
      ...PongGameEngine.createInitialState(newDifficulty),
      gameState: prev.gameState
    }));
  }, []);

  // Handle scored state
  useEffect(() => {
    if (gameState.gameState === 'scored') {
      soundManager.current.playEatFood(); // Use eat sound for scoring
      
      // Resume play after a short delay
      const timeout = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          gameState: 'playing'
        }));
      }, 1000);
      
      return () => clearTimeout(timeout);
    } else if (gameState.gameState === 'gameOver') {
      soundManager.current.playGameOver();
    }
  }, [gameState.gameState]);

  // Game loop
  const gameLoop = useCallback((timestamp: number) => {
    if (!lastUpdateTimeRef.current) {
      lastUpdateTimeRef.current = timestamp;
    }

    const deltaTime = timestamp - lastUpdateTimeRef.current;
    
    // Update at 60 FPS
    if (deltaTime >= 16) {
      setGameState(prev => {
        if (prev.gameState !== 'playing') return prev;
        
        const updates = PongGameEngine.update(prev);
        return { ...prev, ...updates };
      });
      
      lastUpdateTimeRef.current = timestamp;
    }

    if (gameState.gameState === 'playing') {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }
  }, [gameState.gameState]);

  // Start/stop game loop
  useEffect(() => {
    if (gameState.gameState === 'playing') {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState.gameState, gameLoop]);

  // Handle continuous paddle movement
  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (gameState.gameState !== 'playing') return;
      
      if (keysPressedRef.current.has('ArrowUp') || keysPressedRef.current.has('w')) {
        movePlayerPaddle('up');
      }
      if (keysPressedRef.current.has('ArrowDown') || keysPressedRef.current.has('s')) {
        movePlayerPaddle('down');
      }
    }, 16); // 60 FPS

    return () => clearInterval(moveInterval);
  }, [gameState.gameState, movePlayerPaddle]);

  // Keyboard controls
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysPressedRef.current.add(key);
      
      if (key === ' ' || key === 'enter') {
        e.preventDefault();
        if (gameState.gameState === 'idle' || gameState.gameState === 'gameOver') {
          startGame();
        }
      }
      
      if (key === 'p') {
        e.preventDefault();
        if (gameState.gameState === 'playing' || gameState.gameState === 'paused') {
          pauseGame();
        }
      }
      
      if (key === 'r') {
        e.preventDefault();
        reset();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysPressedRef.current.delete(key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      keysPressedRef.current.clear();
    };
  }, [isActive, gameState.gameState, startGame, pauseGame, reset]);

  return {
    gameState,
    movePlayerPaddle,
    startGame,
    pauseGame,
    reset,
    setDifficulty
  };
};