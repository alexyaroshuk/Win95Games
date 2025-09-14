'use client';

import React, { useEffect, useCallback, useMemo } from 'react';
import { useTetrisEngine } from '../hooks/useTetrisEngine';
import { TetrisBoard } from './TetrisBoard';
import { TetrisStats } from './TetrisStats';
import { Win95Button } from '../../common/components/ui/Win95Button';
import { win95Theme } from '@/styles/theme';

interface TetrisGameProps {
  isActive?: boolean;
}

export const TetrisGame: React.FC<TetrisGameProps> = ({ isActive = true }) => {
  const {
    gameState,
    moveLeft,
    moveRight,
    rotate,
    softDrop,
    hardDrop,
    togglePause,
    reset,
    getGhostPiece
  } = useTetrisEngine();

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (gameState.gameOver || gameState.isPaused) {
      if (e.key === 'p' || e.key === 'P') {
        togglePause();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowLeft':
      case 'a':
      case 'A':
        e.preventDefault();
        moveLeft();
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        e.preventDefault();
        moveRight();
        break;
      case 'ArrowUp':
      case 'w':
      case 'W':
        e.preventDefault();
        rotate();
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        e.preventDefault();
        softDrop();
        break;
      case ' ':
        e.preventDefault();
        hardDrop();
        break;
      case 'p':
      case 'P':
        e.preventDefault();
        togglePause();
        break;
      case 'r':
      case 'R':
        e.preventDefault();
        reset();
        break;
    }
  }, [gameState.gameOver, gameState.isPaused, moveLeft, moveRight, rotate, softDrop, hardDrop, togglePause, reset]);

  useEffect(() => {
    if (!isActive) return;
    
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress, isActive]);

  const ghostPiece = useMemo(() => getGhostPiece(), [getGhostPiece, gameState.currentPiece]);

  // Early return if board is not initialized
  if (!gameState.board || gameState.board.length === 0) {
    return <div>Loading game...</div>;
  }

  return (
    <div style={{
      ...win95Theme.borders.raisedThick,
      backgroundColor: win95Theme.colors.background,
      padding: win95Theme.spacing.lg,
      width: 'fit-content',
      height: 'fit-content'
    }}>
      <div style={{
        display: 'flex',
        gap: win95Theme.spacing.lg,
        alignItems: 'flex-start'
      }}>
        <div style={{ position: 'relative' }}>
          <TetrisBoard 
            board={gameState.board}
            currentPiece={gameState.currentPiece}
            ghostPiece={ghostPiece}
          />
          {gameState.gameOver && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              ...win95Theme.borders.insetThick
            }}>
              <div style={{
                backgroundColor: win95Theme.colors.error,
                padding: win95Theme.spacing.lg,
                ...win95Theme.borders.raisedThick
              }}>
                <h2 style={{
                  fontFamily: win95Theme.fonts.system,
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  marginBottom: win95Theme.spacing.md,
                  textAlign: 'center'
                }}>
                  GAME OVER
                </h2>
                <p style={{
                  fontFamily: win95Theme.fonts.system,
                  fontSize: '14px',
                  color: '#FFFFFF',
                  marginBottom: win95Theme.spacing.md,
                  textAlign: 'center'
                }}>
                  Final Score: {gameState.score}
                </p>
                <div style={{ textAlign: 'center' }}>
                  <Win95Button variant="primary" onClick={reset}>
                    New Game
                  </Win95Button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: win95Theme.spacing.md }}>
          <TetrisStats
            score={gameState.score}
            lines={gameState.lines}
            level={gameState.level}
            nextPiece={gameState.nextPiece}
            isPaused={gameState.isPaused}
            gameOver={gameState.gameOver}
            onReset={reset}
            onPause={togglePause}
          />
          
          <div style={{
            ...win95Theme.borders.raised,
            padding: win95Theme.spacing.md,
            backgroundColor: win95Theme.colors.background
          }}>
            <h3 style={{
              fontFamily: win95Theme.fonts.system,
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: win95Theme.spacing.sm,
              color: win95Theme.colors.text
            }}>
              CONTROLS
            </h3>
            <div style={{
              fontFamily: win95Theme.fonts.mono,
              fontSize: '11px',
              lineHeight: '1.5',
              color: win95Theme.colors.textSecondary
            }}>
              <div>← → / A D : Move</div>
              <div>↑ / W : Rotate</div>
              <div>↓ / S : Soft Drop</div>
              <div>Space : Hard Drop</div>
              <div>P : Pause</div>
              <div>R : Reset</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TetrisGame.displayName = 'TetrisGame';