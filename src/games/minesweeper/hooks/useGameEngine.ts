'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { GameEngine } from '../core/GameEngine';
import { GameState, GameSettings, Position } from '../core/types';
import { SoundManager } from '@/utils/SoundManager';

export const useGameEngine = (initialSettings: GameSettings) => {
  const engineRef = useRef<GameEngine | null>(null);
  const soundManager = useRef(SoundManager.getInstance());
  const [gameState, setGameState] = useState<GameState>(() => {
    const engine = new GameEngine(initialSettings);
    engineRef.current = engine;
    return engine.getState();
  });

  const revealCell = useCallback((position: Position) => {
    if (engineRef.current) {
      const oldState = engineRef.current.getState();
      const newState = engineRef.current.revealCell(position);
      
      // Play sound effects based on state changes
      if (newState.status === 'lost' && oldState.status !== 'lost') {
        soundManager.current.playExplosion();
      } else if (newState.status === 'won' && oldState.status !== 'won') {
        soundManager.current.playWin();
      } else if (newState.revealedCount > oldState.revealedCount) {
        soundManager.current.playClick();
      }
      
      setGameState(newState);
    }
  }, []);

  const toggleFlag = useCallback((position: Position) => {
    if (engineRef.current) {
      const newState = engineRef.current.toggleFlag(position);
      soundManager.current.playFlag();
      setGameState(newState);
    }
  }, []);

  const resetGame = useCallback(() => {
    if (engineRef.current) {
      const newState = engineRef.current.reset();
      setGameState(newState);
    }
  }, []);

  const updateSettings = useCallback((settings: GameSettings) => {
    if (engineRef.current) {
      const newState = engineRef.current.updateSettings(settings);
      setGameState(newState);
    }
  }, []);

  return {
    gameState,
    revealCell,
    toggleFlag,
    resetGame,
    updateSettings
  };
};