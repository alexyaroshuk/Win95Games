'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useGameEngine } from '../hooks/useGameEngine';
import { useTimer } from '../hooks/useTimer';
import { GameSettings } from '../core/types';
import { GameBoard } from './GameBoard';
import { GameStats } from './GameStats';
import { win95Theme } from '@/styles/theme';

interface MinesweeperGameProps {
  initialSettings: GameSettings;
  onSettingsChange?: (settings: GameSettings) => void;
}

export const MinesweeperGame: React.FC<MinesweeperGameProps> = ({
  initialSettings,
  onSettingsChange
}) => {
  const { gameState, revealCell, toggleFlag, resetGame, updateSettings } = useGameEngine(initialSettings);
  const [isAnyCellPressed, setIsAnyCellPressed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const elapsedTime = useTimer({
    startTime: gameState.startTime,
    endTime: gameState.endTime,
    isActive: gameState.status === 'playing'
  });

  const handleCellReveal = useCallback((row: number, col: number) => {
    revealCell({ row, col });
  }, [revealCell]);

  const handleCellFlag = useCallback((row: number, col: number) => {
    toggleFlag({ row, col });
  }, [toggleFlag]);

  const handleMouseDownCell = useCallback(() => {
    setIsAnyCellPressed(true);
    setIsDragging(true);
  }, []);

  const handleMouseUpCell = useCallback(() => {
    setIsAnyCellPressed(false);
    setIsDragging(false);
  }, []);

  const handleReset = useCallback(() => {
    resetGame();
    setIsAnyCellPressed(false);
    setIsDragging(false);
  }, [resetGame]);

  const handleSettingsUpdate = useCallback((newSettings: GameSettings) => {
    updateSettings(newSettings);
    if (onSettingsChange) {
      onSettingsChange(newSettings);
    }
  }, [updateSettings, onSettingsChange]);

  useEffect(() => {
    // Update settings when they change from parent
    // Use JSON stringify to check for actual changes, not reference changes
    if (initialSettings) {
      updateSettings(initialSettings);
    }
  }, [initialSettings.allowQuestionMarks, initialSettings.difficulty, 
      initialSettings.customConfig?.rows, initialSettings.customConfig?.cols, 
      initialSettings.customConfig?.mines, updateSettings]);

  const gameContainerStyle = useMemo(() => ({
    ...win95Theme.borders.raisedThick,
    backgroundColor: win95Theme.colors.background,
    padding: win95Theme.spacing.sm
  }), []);

  const contentStyle = useMemo(() => ({
    backgroundColor: win95Theme.colors.background,
    gap: win95Theme.spacing.md,
    display: 'flex',
    flexDirection: 'column' as const
  }), []);

  return (
    <div style={gameContainerStyle}>
      <div style={contentStyle}>
        <GameStats
          mineCount={gameState.mineCount}
          flaggedCount={gameState.flaggedCount}
          elapsedTime={elapsedTime}
          gameStatus={gameState.status}
          isAnyCellPressed={isAnyCellPressed}
          settings={gameState.settings}
          onReset={handleReset}
        />
        
        <GameBoard
          board={gameState.board}
          onCellReveal={handleCellReveal}
          onCellFlag={handleCellFlag}
          onMouseDownCell={handleMouseDownCell}
          onMouseUpCell={handleMouseUpCell}
          isGameOver={gameState.status === 'won' || gameState.status === 'lost'}
          isDragging={isDragging}
        />
      </div>
    </div>
  );
};

MinesweeperGame.displayName = 'MinesweeperGame';