'use client';

import React, { useRef, useEffect } from 'react';
import { GameState } from '../core/types';
import { win95Theme } from '@/styles/theme';

interface ArkanoidCanvasProps {
  gameState: GameState;
  onMouseMove: (x: number) => void;
  onClick: () => void;
}

export const ArkanoidCanvas: React.FC<ArkanoidCanvasProps> = ({ 
  gameState, 
  onMouseMove,
  onClick 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { colors, borders } = win95Theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw bricks
    gameState.bricks.forEach(brick => {
      if (!brick.destroyed) {
        // Darken color based on damage
        const damageRatio = brick.hits / brick.maxHits;
        if (damageRatio > 0) {
          // Parse color and darken it
          ctx.fillStyle = brick.color;
          ctx.globalAlpha = 1 - (damageRatio * 0.3); // Fade based on damage
        } else {
          ctx.fillStyle = brick.color;
          ctx.globalAlpha = 1;
        }
        
        ctx.fillRect(brick.position.x, brick.position.y, brick.width, brick.height);
        
        // Add 3D effect
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(brick.position.x, brick.position.y, brick.width, brick.height);
        
        // Draw static crack pattern for damaged bricks
        if (brick.hits > 0) {
          ctx.globalAlpha = 0.6;
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 1;
          const centerX = brick.position.x + brick.width / 2;
          const centerY = brick.position.y + brick.height / 2;
          
          // Use brick ID to generate consistent crack pattern
          const seed = brick.id.split('-').reduce((acc, part) => acc + parseInt(part) || 0, 0);
          
          for (let i = 0; i < brick.hits; i++) {
            ctx.beginPath();
            // Use seeded values for consistent cracks
            const angle1 = ((seed + i * 137) % 360) * Math.PI / 180;
            const angle2 = ((seed + i * 239) % 360) * Math.PI / 180;
            ctx.moveTo(
              centerX + Math.cos(angle1) * 5, 
              centerY + Math.sin(angle1) * 5
            );
            ctx.lineTo(
              centerX + Math.cos(angle2) * (brick.width / 3), 
              centerY + Math.sin(angle2) * (brick.height / 3)
            );
            ctx.stroke();
          }
        }
        
        ctx.globalAlpha = 1; // Reset alpha
      }
    });

    // Draw paddle
    const gradient = ctx.createLinearGradient(
      gameState.paddle.position.x, 
      gameState.paddle.position.y,
      gameState.paddle.position.x, 
      gameState.paddle.position.y + gameState.paddle.height
    );
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.5, '#c0c0c0');
    gradient.addColorStop(1, '#808080');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(
      gameState.paddle.position.x,
      gameState.paddle.position.y,
      gameState.paddle.width,
      gameState.paddle.height
    );

    // Draw balls
    gameState.balls.forEach(ball => {
      ctx.beginPath();
      ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#c0c0c0';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw power-ups
    gameState.powerUps.forEach(powerUp => {
      if (powerUp.active) {
        const colors: Record<typeof powerUp.type, string> = {
          expand: '#00ff00',
          shrink: '#ff0000',
          multiball: '#ffff00',
          slow: '#00ffff',
          fast: '#ff00ff',
          extralife: '#ff69b4',
          laser: '#ffa500',
        };
        
        ctx.fillStyle = colors[powerUp.type];
        ctx.fillRect(powerUp.position.x, powerUp.position.y, powerUp.width, powerUp.height);
        
        // Add icon/text
        ctx.fillStyle = '#000000';
        ctx.font = '8px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const icons: Record<typeof powerUp.type, string> = {
          expand: '←→',
          shrink: '→←',
          multiball: '●●',
          slow: '▼',
          fast: '▲',
          extralife: '♥',
          laser: '⚡',
        };
        ctx.fillText(
          icons[powerUp.type],
          powerUp.position.x + powerUp.width / 2,
          powerUp.position.y + powerUp.height / 2
        );
      }
    });

    // Draw game over overlay
    if (gameState.gameStatus === 'lost') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#ff0000';
      ctx.font = 'bold 32px "MS Sans Serif", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px "MS Sans Serif", sans-serif';
      ctx.fillText(`Final Score: ${gameState.score}`, canvas.width / 2, canvas.height / 2 + 20);
      ctx.fillText('Click to restart', canvas.width / 2, canvas.height / 2 + 50);
    }

    // Draw level transition overlay
    if (gameState.bricks.every(brick => brick.destroyed) && gameState.gameStatus !== 'lost') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff00';
      ctx.font = 'bold 32px "MS Sans Serif", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`LEVEL ${gameState.level} COMPLETE!`, canvas.width / 2, canvas.height / 2 - 20);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '20px "MS Sans Serif", sans-serif';
      ctx.fillText(`Score: ${gameState.score}`, canvas.width / 2, canvas.height / 2 + 20);
      
      ctx.font = '16px "MS Sans Serif", sans-serif';
      ctx.fillText('Press SPACE for next level', canvas.width / 2, canvas.height / 2 + 50);
    }

    // Draw idle state instructions
    if (gameState.gameStatus === 'idle' && gameState.balls.length > 0) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '14px "MS Sans Serif", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Press SPACE to launch', canvas.width / 2, canvas.height / 2);
    }

  }, [gameState]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    onMouseMove(x);
  };

  return (
    <div style={{
      ...borders.insetThick,
      backgroundColor: colors.backgroundDark,
      padding: '3px',
      display: 'inline-block'
    }}>
      <canvas
        ref={canvasRef}
        width={480}
        height={400}
        style={{
          display: 'block',
          cursor: gameState.gameStatus === 'playing' ? 'none' : 'pointer',
          imageRendering: 'pixelated'
        }}
        onMouseMove={handleMouseMove}
        onClick={onClick}
      />
    </div>
  );
};

ArkanoidCanvas.displayName = 'ArkanoidCanvas';