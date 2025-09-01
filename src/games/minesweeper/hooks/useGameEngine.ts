'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { GameEngine } from '../core/GameEngine';
import { GameState, GameSettings, Position } from '../core/types';

export const useGameEngine = (initialSettings: GameSettings) => {
  const engineRef = useRef<GameEngine | null>(null);
  const [gameState, setGameState] = useState<GameState>(() => {
    const engine = new GameEngine(initialSettings);
    engineRef.current = engine;
    return engine.getState();
  });

  const revealCell = useCallback((position: Position) => {
    if (engineRef.current) {
      const newState = engineRef.current.revealCell(position);
      setGameState(newState);
    }
  }, []);

  const toggleFlag = useCallback((position: Position) => {
    if (engineRef.current) {
      const newState = engineRef.current.toggleFlag(position);
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