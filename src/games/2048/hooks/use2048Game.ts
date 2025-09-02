import { useState, useEffect, useCallback, useRef } from 'react';
import { Grid, Direction, GameState, AnimationState } from '../core/types';
import { Game2048Engine } from '../core/GameEngine';
import { SoundManager } from '@/utils/SoundManager';

export const use2048Game = (isActive: boolean = true) => {
  const [grid, setGrid] = useState<Grid>(() => Game2048Engine.initializeGrid());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('playing');
  const soundManager = useRef(SoundManager.getInstance());
  const [animationState, setAnimationState] = useState<AnimationState>({
    newTiles: new Set(),
    mergedTiles: new Set(),
    direction: null,
    isMoving: false
  });

  // Load best score
  useEffect(() => {
    const saved = localStorage.getItem('2048BestScore');
    if (saved) {
      setBestScore(parseInt(saved, 10));
    }
  }, []);

  // Save best score
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('2048BestScore', score.toString());
    }
  }, [score, bestScore]);

  const move = useCallback((direction: Direction) => {
    if (gameState !== 'playing') return;

    const { newGrid, points, moved, mergedPositions } = Game2048Engine.moveGrid(grid, direction);
    
    if (!moved) return;
    
    // Play sound effects
    soundManager.current.playTileMove();
    if (points > 0) {
      soundManager.current.playTileMerge();
    }

    // Add new tile immediately
    const gridCopy = newGrid.map(row => [...row]);
    const result = Game2048Engine.addRandomTile(gridCopy);
    
    if (result.success) {
      setGrid(gridCopy);
      setScore(prev => prev + points);
      
      // Animate both the move and new tile at the same time
      setAnimationState({ 
        newTiles: new Set(result.position ? [result.position] : []), 
        mergedTiles: mergedPositions,
        direction,
        isMoving: false
      });

      // Check win/lose conditions
      if (Game2048Engine.hasWon(gridCopy) && gameState === 'playing') {
        setGameState('won');
        soundManager.current.playWin();
      } else if (Game2048Engine.isGameOver(gridCopy)) {
        setGameState('gameOver');
        soundManager.current.playGameOver();
      }
    }
  }, [grid, gameState]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        move('up');
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        move('down');
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        move('left');
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        move('right');
        break;
    }
  }, [move]);

  useEffect(() => {
    if (!isActive) return;
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress, isActive]);

  const resetGame = () => {
    const newGrid = Game2048Engine.initializeGrid();
    setGrid(newGrid);
    setScore(0);
    setGameState('playing');
    setAnimationState({ 
      newTiles: new Set(['0-0', '0-1', '0-2', '0-3', '1-0', '1-1', '1-2', '1-3', '2-0', '2-1', '2-2', '2-3', '3-0', '3-1', '3-2', '3-3']), 
      mergedTiles: new Set(),
      direction: null,
      isMoving: false
    });
  };

  const continueGame = () => {
    setGameState('playing');
  };

  return {
    grid,
    score,
    bestScore,
    gameState,
    animationState,
    move,
    resetGame,
    continueGame
  };
};