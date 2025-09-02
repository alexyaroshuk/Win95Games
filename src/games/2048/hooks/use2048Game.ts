import { useState, useEffect, useCallback } from 'react';
import { Grid, Direction, GameState, AnimationState } from '../core/types';
import { Game2048Engine } from '../core/GameEngine';

export const use2048Game = () => {
  const [grid, setGrid] = useState<Grid>(() => Game2048Engine.initializeGrid());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [animationState, setAnimationState] = useState<AnimationState>({
    newTiles: new Set(),
    mergedTiles: new Set()
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

    setGrid(newGrid);
    setScore(prev => prev + points);
    setAnimationState({ newTiles: new Set(), mergedTiles: mergedPositions });

    // Add new tile after move
    setTimeout(() => {
      const gridCopy = newGrid.map(row => [...row]);
      const result = Game2048Engine.addRandomTile(gridCopy);
      
      if (result.success) {
        setGrid(gridCopy);
        setAnimationState({ 
          newTiles: new Set(result.position ? [result.position] : []), 
          mergedTiles: new Set() 
        });

        // Check win/lose conditions
        if (Game2048Engine.hasWon(gridCopy) && gameState === 'playing') {
          setGameState('won');
        } else if (Game2048Engine.isGameOver(gridCopy)) {
          setGameState('gameOver');
        }
      }
    }, 150);
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
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const resetGame = () => {
    const newGrid = Game2048Engine.initializeGrid();
    setGrid(newGrid);
    setScore(0);
    setGameState('playing');
    setAnimationState({ 
      newTiles: new Set(['0-0', '0-1', '0-2', '0-3', '1-0', '1-1', '1-2', '1-3', '2-0', '2-1', '2-2', '2-3', '3-0', '3-1', '3-2', '3-3']), 
      mergedTiles: new Set() 
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