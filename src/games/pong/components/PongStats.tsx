import React from 'react';
import { win95Theme } from '@/styles/theme';
import { Win95Button } from '../../common/components/ui/Win95Button';

interface PongStatsProps {
  playerScore: number;
  aiScore: number;
  difficulty: 'easy' | 'medium' | 'hard';
  gameState: string;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const PongStats: React.FC<PongStatsProps> = ({
  playerScore,
  aiScore,
  difficulty,
  gameState,
  onStart,
  onPause,
  onReset
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: win95Theme.spacing.md
    }}>
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
          SCORE
        </h3>
        <div style={{
          fontFamily: win95Theme.fonts.mono,
          fontSize: '18px',
          color: win95Theme.colors.text
        }}>
          <div>Player: {playerScore}</div>
          <div>AI: {aiScore}</div>
        </div>
      </div>

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
          DIFFICULTY
        </h3>
        <div style={{
          fontFamily: win95Theme.fonts.system,
          fontSize: '14px',
          color: win95Theme.colors.text,
          textTransform: 'uppercase'
        }}>
          {difficulty}
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: win95Theme.spacing.sm
      }}>
        {gameState === 'idle' || gameState === 'gameOver' ? (
          <Win95Button variant="primary" onClick={onStart} fullWidth>
            New Game
          </Win95Button>
        ) : (
          <Win95Button 
            variant="default" 
            onClick={onPause} 
            fullWidth
          >
            {gameState === 'paused' ? 'Resume' : 'Pause'}
          </Win95Button>
        )}
        <Win95Button variant="default" onClick={onReset} fullWidth>
          Reset
        </Win95Button>
      </div>

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
          <div>↑ / W : Move Up</div>
          <div>↓ / S : Move Down</div>
          <div>Space : Start</div>
          <div>P : Pause</div>
          <div>R : Reset</div>
        </div>
      </div>
    </div>
  );
};