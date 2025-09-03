import React, { useRef, useEffect } from 'react';
import { PongGameState, GAME_CONFIG } from '../core/types';
import { win95Theme } from '@/styles/theme';

interface PongCanvasProps {
  gameState: PongGameState;
}

export const PongCanvas: React.FC<PongCanvasProps> = ({ gameState }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, GAME_CONFIG.WIDTH, GAME_CONFIG.HEIGHT);

    // Draw center line
    ctx.strokeStyle = '#C0C0C0';
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(GAME_CONFIG.WIDTH / 2, 0);
    ctx.lineTo(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles
    ctx.fillStyle = '#FFFFFF';
    
    // Player paddle
    ctx.fillRect(
      GAME_CONFIG.PADDLE_OFFSET,
      gameState.playerPaddle.y,
      gameState.playerPaddle.width,
      gameState.playerPaddle.height
    );

    // AI paddle
    ctx.fillRect(
      GAME_CONFIG.WIDTH - GAME_CONFIG.PADDLE_OFFSET - gameState.aiPaddle.width,
      gameState.aiPaddle.y,
      gameState.aiPaddle.width,
      gameState.aiPaddle.height
    );

    // Draw ball
    ctx.beginPath();
    ctx.arc(
      gameState.ball.x,
      gameState.ball.y,
      gameState.ball.radius,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw scores
    ctx.font = 'bold 48px "MS Sans Serif", sans-serif';
    ctx.fillStyle = '#808080';
    ctx.textAlign = 'center';
    ctx.fillText(gameState.playerScore.toString(), GAME_CONFIG.WIDTH / 4, 60);
    ctx.fillText(gameState.aiScore.toString(), 3 * GAME_CONFIG.WIDTH / 4, 60);

    // Draw game state messages
    if (gameState.gameState === 'idle') {
      ctx.font = 'bold 24px "MS Sans Serif", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.fillText('Press SPACE to Start', GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2);
    } else if (gameState.gameState === 'paused') {
      ctx.font = 'bold 32px "MS Sans Serif", sans-serif';
      ctx.fillStyle = '#FFFF00';
      ctx.textAlign = 'center';
      ctx.fillText('PAUSED', GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2);
    } else if (gameState.gameState === 'gameOver') {
      ctx.font = 'bold 32px "MS Sans Serif", sans-serif';
      ctx.fillStyle = gameState.playerScore > gameState.aiScore ? '#00FF00' : '#FF0000';
      ctx.textAlign = 'center';
      const winner = gameState.playerScore > gameState.aiScore ? 'YOU WIN!' : 'AI WINS!';
      ctx.fillText(winner, GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2 - 20);
      
      ctx.font = '20px "MS Sans Serif", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('Press SPACE for New Game', GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2 + 20);
    }
  });

  return (
    <div style={{
      ...win95Theme.borders.insetThick,
      backgroundColor: '#000000',
      padding: '2px',
      display: 'inline-block'
    }}>
      <canvas
        ref={canvasRef}
        width={GAME_CONFIG.WIDTH}
        height={GAME_CONFIG.HEIGHT}
        style={{
          display: 'block',
          imageRendering: 'pixelated'
        }}
      />
    </div>
  );
};