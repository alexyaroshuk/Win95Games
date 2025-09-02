'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { ArkanoidEngine } from '../core/ArkanoidEngine';
import { GameState, GameConfig } from '../core/types';

export const useArkanoidEngine = (isActive: boolean = true, config?: Partial<GameConfig>) => {
  const engineRef = useRef<ArkanoidEngine | null>(null);
  const animationRef = useRef<number | null>(null);
  const keysPressed = useRef<Set<string>>(new Set());
  
  const [gameState, setGameState] = useState<GameState>(() => {
    const engine = new ArkanoidEngine(config);
    engineRef.current = engine;
    return engine.getState();
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