'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { TetrisEngine } from '../core/TetrisEngine';
import { GameState, GameConfig } from '../core/types';
import { SoundManager } from '@/utils/SoundManager';

export const useTetrisEngine = (config?: Partial<GameConfig>) => {
  const engineRef = useRef<TetrisEngine | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const soundManager = useRef(SoundManager.getInstance());
  
  const [gameState, setGameState] = useState<GameState>(() => {
    const engine = new TetrisEngine(config);
    engineRef.current = engine;
    return engine.getState();
  });

  const startGameLoop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (engineRef.current) {
        const state = engineRef.current.getState();
        if (!state.gameOver && !state.isPaused) {
          const newState = engineRef.current.tick();
          setGameState(newState);
          
          // Check for line clears
          if (newState.linesCleared > state.linesCleared) {
            soundManager.current.playLineClear();
          }
          
          // Check for game over
          if (newState.gameOver && !state.gameOver) {
            soundManager.current.playGameOver();
          }
        }
      }
    }, gameState.dropTime);
  }, [gameState.dropTime]);

  useEffect(() => {
    startGameLoop();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startGameLoop]);

  const moveLeft = useCallback(() => {
    if (engineRef.current) {
      const newState = engineRef.current.moveLeft();
      setGameState(newState);
    }
  }, []);

  const moveRight = useCallback(() => {
    if (engineRef.current) {
      const newState = engineRef.current.moveRight();
      setGameState(newState);
    }
  }, []);

  const rotate = useCallback(() => {
    if (engineRef.current) {
      const newState = engineRef.current.rotate();
      setGameState(newState);
      soundManager.current.playRotate();
    }
  }, []);

  const softDrop = useCallback(() => {
    if (engineRef.current) {
      const newState = engineRef.current.softDrop();
      setGameState(newState);
    }
  }, []);

  const hardDrop = useCallback(() => {
    if (engineRef.current) {
      const newState = engineRef.current.hardDrop();
      soundManager.current.playTetrisDrop();
      setGameState(newState);
    }
  }, []);

  const togglePause = useCallback(() => {
    if (engineRef.current) {
      const newState = engineRef.current.togglePause();
      setGameState(newState);
    }
  }, []);

  const reset = useCallback(() => {
    if (engineRef.current) {
      const newState = engineRef.current.reset();
      setGameState(newState);
      startGameLoop();
    }
  }, [startGameLoop]);

  const getGhostPiece = useCallback(() => {
    if (engineRef.current) {
      return engineRef.current.getGhostPiece();
    }
    return null;
  }, []);

  return {
    gameState,
    moveLeft,
    moveRight,
    rotate,
    softDrop,
    hardDrop,
    togglePause,
    reset,
    getGhostPiece
  };
};