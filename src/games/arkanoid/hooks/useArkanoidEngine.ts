'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { ArkanoidEngine } from '../core/ArkanoidEngine';
import { GameState, GameConfig } from '../core/types';
import { SoundManager } from '@/utils/SoundManager';

export const useArkanoidEngine = (isActive: boolean = true, config?: Partial<GameConfig>) => {
  const engineRef = useRef<ArkanoidEngine | null>(null);
  const animationRef = useRef<number | null>(null);
  const keysPressed = useRef<Set<string>>(new Set());
  const soundManager = useRef(SoundManager.getInstance());
  const previousBrickCount = useRef<number>(0);
  const previousBallVelocity = useRef<number>(0);
  
  const [gameState, setGameState] = useState<GameState>(() => {
    const engine = new ArkanoidEngine(config);
    engineRef.current = engine;
    const state = engine.getState();
    previousBrickCount.current = state.bricks.filter(b => !b.destroyed).length;
    return state;
  });

  const gameLoop = useCallback((currentTime: number) => {
    if (engineRef.current) {
      // Handle continuous input with proper deltaTime
      const deltaTime = 0.016; // Assume 60 FPS for input
      
      if (keysPressed.current.has('ArrowLeft') || keysPressed.current.has('a') || keysPressed.current.has('A')) {
        engineRef.current.movePaddleLeft(deltaTime);
      }
      if (keysPressed.current.has('ArrowRight') || keysPressed.current.has('d') || keysPressed.current.has('D')) {
        engineRef.current.movePaddleRight(deltaTime);
      }

      const newState = engineRef.current.update(currentTime);
      
      // Check for brick breaks
      const currentBrickCount = newState.bricks.filter(b => !b.destroyed).length;
      if (currentBrickCount < previousBrickCount.current) {
        soundManager.current.playBrickBreak();
      }
      previousBrickCount.current = currentBrickCount;
      
      // Check for paddle hit (ball Y velocity reversal near paddle)
      if (newState.balls.length > 0) {
        const ball = newState.balls[0];
        if (ball.velocity.dy > 0 && previousBallVelocity.current < 0 && 
            ball.position.y > newState.paddle.position.y - 20) {
          soundManager.current.playPaddleHit();
        }
        previousBallVelocity.current = ball.velocity.dy;
      }
      
      // Check for ball lost
      if (newState.balls.length === 0 && gameState.balls.length > 0) {
        soundManager.current.playBallLost();
      }
      
      // Check for game over
      if (newState.gameStatus === 'lost' && gameState.gameStatus !== 'lost') {
        soundManager.current.playGameOver();
      }
      
      // Check for level complete
      if (currentBrickCount === 0 && previousBrickCount.current > 0) {
        soundManager.current.playWin();
      }
      
      setGameState(newState);
    }

    animationRef.current = requestAnimationFrame(gameLoop);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive) return;
      
      keysPressed.current.add(e.key);
      
      if (e.key === ' ' && engineRef.current) {
        e.preventDefault();
        const newState = engineRef.current.launch();
        setGameState(newState);
      }
      
      if ((e.key === 'p' || e.key === 'P') && engineRef.current) {
        e.preventDefault();
        const newState = engineRef.current.pause();
        setGameState(newState);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!isActive) return;
      keysPressed.current.delete(e.key);
    };

    if (!isActive) {
      keysPressed.current.clear();
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Start game loop
    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameLoop, isActive]);

  const movePaddleToPosition = useCallback((x: number) => {
    if (engineRef.current) {
      const newState = engineRef.current.movePaddleToPosition(x);
      setGameState(newState);
    }
  }, []);

  const launch = useCallback(() => {
    if (engineRef.current) {
      const newState = engineRef.current.launch();
      setGameState(newState);
    }
  }, []);

  const pause = useCallback(() => {
    if (engineRef.current) {
      const newState = engineRef.current.pause();
      setGameState(newState);
    }
  }, []);

  const reset = useCallback(() => {
    if (engineRef.current) {
      const newState = engineRef.current.reset();
      setGameState(newState);
    }
  }, []);

  const skipLevel = useCallback(() => {
    if (engineRef.current) {
      const newState = engineRef.current.skipLevel();
      setGameState(newState);
    }
  }, []);

  return {
    gameState,
    movePaddleToPosition,
    launch,
    pause,
    reset,
    skipLevel,
  };
};