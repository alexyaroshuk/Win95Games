import { PongGameState, Ball, Paddle, GAME_CONFIG } from './types';

export class PongGameEngine {
  static createInitialState(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): PongGameState {
    return {
      playerPaddle: {
        y: GAME_CONFIG.HEIGHT / 2 - GAME_CONFIG.PADDLE_HEIGHT / 2,
        height: GAME_CONFIG.PADDLE_HEIGHT,
        width: GAME_CONFIG.PADDLE_WIDTH,
        speed: GAME_CONFIG.PADDLE_SPEED
      },
      aiPaddle: {
        y: GAME_CONFIG.HEIGHT / 2 - GAME_CONFIG.PADDLE_HEIGHT / 2,
        height: GAME_CONFIG.PADDLE_HEIGHT,
        width: GAME_CONFIG.PADDLE_WIDTH,
        speed: GAME_CONFIG.PADDLE_SPEED
      },
      ball: this.resetBall(),
      playerScore: 0,
      aiScore: 0,
      gameState: 'idle',
      lastScorer: null,
      difficulty
    };
  }

  static resetBall(towardsPlayer: boolean = Math.random() > 0.5): Ball {
    const angle = (Math.random() - 0.5) * Math.PI / 4; // Random angle between -45 and 45 degrees
    const speed = GAME_CONFIG.BALL_SPEED;
    
    return {
      x: GAME_CONFIG.WIDTH / 2,
      y: GAME_CONFIG.HEIGHT / 2,
      radius: GAME_CONFIG.BALL_RADIUS,
      velocity: {
        dx: speed * Math.cos(angle) * (towardsPlayer ? -1 : 1),
        dy: speed * Math.sin(angle)
      }
    };
  }

  static movePaddle(paddle: Paddle, direction: 'up' | 'down'): Paddle {
    const newY = direction === 'up' 
      ? Math.max(0, paddle.y - paddle.speed)
      : Math.min(GAME_CONFIG.HEIGHT - paddle.height, paddle.y + paddle.speed);
    
    return { ...paddle, y: newY };
  }

  static moveAIPaddle(state: PongGameState): Paddle {
    const paddle = state.aiPaddle;
    const ball = state.ball;
    const difficulty = state.difficulty;
    
    // Target position - where the paddle should aim for
    let targetY: number;
    
    // Ball moving towards AI - track it
    if (ball.velocity.dx > 0) {
      // For hard difficulty, just track the ball directly with perfect accuracy
      if (difficulty === 'hard') {
        targetY = ball.y - paddle.height / 2;
      } else {
        // For easier difficulties, predict with some error
        const aiPaddleX = GAME_CONFIG.WIDTH - GAME_CONFIG.PADDLE_OFFSET - GAME_CONFIG.PADDLE_WIDTH;
        const distanceToPaddle = aiPaddleX - ball.x;
        const timeToReachPaddle = distanceToPaddle / Math.abs(ball.velocity.dx);
        
        // Simple prediction
        targetY = ball.y + (ball.velocity.dy * timeToReachPaddle) - paddle.height / 2;
        
        // Add error for easier difficulties
        if (difficulty === 'easy') {
          // Only occasionally miss
          if (Math.random() < 0.1) {
            targetY += (Math.random() - 0.5) * paddle.height;
          }
        } else if (difficulty === 'medium') {
          // Very rare misses
          if (Math.random() < 0.02) {
            targetY += (Math.random() - 0.5) * paddle.height * 0.5;
          }
        }
      }
    } else {
      // Ball moving away - return to center
      targetY = GAME_CONFIG.HEIGHT / 2 - paddle.height / 2;
    }
    
    // Clamp target position to valid range
    targetY = Math.max(0, Math.min(GAME_CONFIG.HEIGHT - paddle.height, targetY));
    
    // Current paddle position
    const currentY = paddle.y;
    const difference = targetY - currentY;
    
    // If we're close enough, don't move (prevents jitter)
    if (Math.abs(difference) < 1) {
      return paddle;
    }
    
    // Determine move speed based on difficulty
    let moveSpeed: number;
    if (difficulty === 'hard') {
      // On hard, move fast enough to always reach the ball
      moveSpeed = Math.min(Math.abs(difference), paddle.speed);
    } else if (difficulty === 'medium') {
      // Medium speed
      moveSpeed = Math.min(Math.abs(difference), paddle.speed * 0.8);
    } else {
      // Easy - slower reactions
      moveSpeed = Math.min(Math.abs(difference), paddle.speed * 0.6);
    }
    
    // Move towards target
    const newY = difference > 0 
      ? Math.min(currentY + moveSpeed, GAME_CONFIG.HEIGHT - paddle.height)
      : Math.max(currentY - moveSpeed, 0);
    
    return { ...paddle, y: newY };
  }

  static updateBall(state: PongGameState): { ball: Ball; scored?: { player: 'player' | 'ai'; newBall: Ball } } {
    const ball = { ...state.ball };
    
    // Update position
    ball.x += ball.velocity.dx;
    ball.y += ball.velocity.dy;
    
    // Check top and bottom wall collisions
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= GAME_CONFIG.HEIGHT) {
      ball.velocity.dy = -ball.velocity.dy;
      ball.y = ball.y - ball.radius <= 0 
        ? ball.radius 
        : GAME_CONFIG.HEIGHT - ball.radius;
    }
    
    // Check paddle collisions
    const playerPaddleX = GAME_CONFIG.PADDLE_OFFSET;
    const aiPaddleX = GAME_CONFIG.WIDTH - GAME_CONFIG.PADDLE_OFFSET - GAME_CONFIG.PADDLE_WIDTH;
    
    // Player paddle collision
    if (ball.x - ball.radius <= playerPaddleX + GAME_CONFIG.PADDLE_WIDTH &&
        ball.x - ball.radius > playerPaddleX &&
        ball.y >= state.playerPaddle.y &&
        ball.y <= state.playerPaddle.y + state.playerPaddle.height &&
        ball.velocity.dx < 0) {
      
      ball.velocity.dx = -ball.velocity.dx * 1.05; // Slight speed increase
      
      // Add spin based on where the ball hits the paddle
      const relativeIntersectY = (state.playerPaddle.y + state.playerPaddle.height / 2) - ball.y;
      const normalizedRelativeIntersectionY = relativeIntersectY / (state.playerPaddle.height / 2);
      const bounceAngle = normalizedRelativeIntersectionY * Math.PI / 4;
      
      const speed = Math.sqrt(ball.velocity.dx * ball.velocity.dx + ball.velocity.dy * ball.velocity.dy);
      ball.velocity.dx = speed * Math.cos(bounceAngle);
      ball.velocity.dy = speed * -Math.sin(bounceAngle);
    }
    
    // AI paddle collision
    if (ball.x + ball.radius >= aiPaddleX &&
        ball.x + ball.radius < aiPaddleX + GAME_CONFIG.PADDLE_WIDTH &&
        ball.y >= state.aiPaddle.y &&
        ball.y <= state.aiPaddle.y + state.aiPaddle.height &&
        ball.velocity.dx > 0) {
      
      ball.velocity.dx = -ball.velocity.dx * 1.05;
      
      const relativeIntersectY = (state.aiPaddle.y + state.aiPaddle.height / 2) - ball.y;
      const normalizedRelativeIntersectionY = relativeIntersectY / (state.aiPaddle.height / 2);
      const bounceAngle = normalizedRelativeIntersectionY * Math.PI / 4;
      
      const speed = Math.sqrt(ball.velocity.dx * ball.velocity.dx + ball.velocity.dy * ball.velocity.dy);
      ball.velocity.dx = -speed * Math.cos(bounceAngle);
      ball.velocity.dy = speed * -Math.sin(bounceAngle);
    }
    
    // Check for scoring
    if (ball.x < 0) {
      return { 
        ball, 
        scored: { 
          player: 'ai', 
          newBall: this.resetBall(false) 
        } 
      };
    }
    
    if (ball.x > GAME_CONFIG.WIDTH) {
      return { 
        ball, 
        scored: { 
          player: 'player', 
          newBall: this.resetBall(true) 
        } 
      };
    }
    
    return { ball };
  }

  static update(state: PongGameState): Partial<PongGameState> {
    if (state.gameState !== 'playing') {
      return {};
    }
    
    // Update AI paddle
    const aiPaddle = this.moveAIPaddle(state);
    
    // Update ball
    const ballUpdate = this.updateBall(state);
    
    const updates: Partial<PongGameState> = {
      aiPaddle,
      ball: ballUpdate.ball
    };
    
    // Handle scoring
    if (ballUpdate.scored) {
      if (ballUpdate.scored.player === 'player') {
        updates.playerScore = state.playerScore + 1;
      } else {
        updates.aiScore = state.aiScore + 1;
      }
      
      updates.ball = ballUpdate.scored.newBall;
      updates.lastScorer = ballUpdate.scored.player;
      updates.gameState = 'scored';
      
      // Check for game over
      if (updates.playerScore === GAME_CONFIG.WINNING_SCORE || 
          updates.aiScore === GAME_CONFIG.WINNING_SCORE) {
        updates.gameState = 'gameOver';
      }
    }
    
    return updates;
  }
}