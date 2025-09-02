import { 
  GameState, 
  GameConfig, 
  Ball, 
  Paddle, 
  Brick,
  PowerUp,
  DEFAULT_CONFIG,
  BRICK_COLORS,
  BRICK_POINTS
} from './types';
import { PhysicsEngine } from './PhysicsEngine';
import { CLASSIC_LEVELS, BRICK_MAP } from './ClassicLevels';

export class ArkanoidEngine {
  private state: GameState;
  private config: GameConfig;
  private physics: PhysicsEngine;
  private lastUpdateTime: number = 0;

  constructor(config?: Partial<GameConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.physics = new PhysicsEngine(this.config);
    this.state = this.createInitialState();
  }

  private createInitialState(): GameState {
    const paddle = this.createPaddle();
    const ball = this.createBall(paddle);
    const bricks = this.createBricks();

    return {
      balls: [ball],
      paddle,
      bricks,
      powerUps: [],
      score: 0,
      lives: this.config.initialLives,
      level: 1,
      gameStatus: 'idle',
      activePowerUps: new Set(),
    };
  }

  private createPaddle(): Paddle {
    return {
      position: {
        x: this.config.canvasWidth / 2 - this.config.paddleWidth / 2,
        y: this.config.canvasHeight - 30,
      },
      width: this.config.paddleWidth,
      height: this.config.paddleHeight,
      speed: 400, // Faster paddle movement
    };
  }

  private createBall(paddle: Paddle): Ball {
    return {
      position: {
        x: paddle.position.x + paddle.width / 2,
        y: paddle.position.y - this.config.ballRadius - 1,
      },
      velocity: { dx: 0, dy: 0 },
      radius: this.config.ballRadius,
      speed: this.config.ballSpeed,
    };
  }

  private createBricks(): Brick[] {
    const bricks: Brick[] = [];
    const currentLevel = this.state?.level || 1;
    
    // Use classic Arkanoid 33 levels, then cycle
    const levelIndex = ((currentLevel - 1) % CLASSIC_LEVELS.length);
    const levelPattern = CLASSIC_LEVELS[levelIndex];
    
    // Parse the level pattern
    for (let row = 0; row < levelPattern.length && row < this.config.brickRows; row++) {
      const rowPattern = levelPattern[row];
      
      for (let col = 0; col < rowPattern.length && col < this.config.brickCols; col++) {
        const char = rowPattern[col];
        const brickData = BRICK_MAP[char];
        
        if (brickData) {
          const x = col * (this.config.brickWidth + this.config.brickPadding) + this.config.brickOffsetLeft;
          const y = row * (this.config.brickHeight + this.config.brickPadding) + this.config.brickOffsetTop;
          
          // Handle unbreakable bricks (silver)
          const maxHits = brickData.hits === -1 ? 999 : brickData.hits;
          
          bricks.push({
            id: `brick-${row}-${col}`,
            position: { x, y },
            width: this.config.brickWidth,
            height: this.config.brickHeight,
            hits: 0,
            maxHits,
            color: brickData.color,
            points: brickData.points,
            destroyed: false,
          });
        }
      }
    }
    
    return bricks;
  }

  getState(): GameState {
    return { ...this.state };
  }

  update(currentTime: number): GameState {
    if (this.state.gameStatus !== 'playing') {
      return this.getState();
    }

    const deltaTime = this.lastUpdateTime ? (currentTime - this.lastUpdateTime) / 1000 : 0;
    this.lastUpdateTime = currentTime;

    if (deltaTime > 0.1) return this.getState(); // Skip large time jumps

    // Update balls
    const updatedBalls: Ball[] = [];
    const ballsToRemove: Ball[] = [];

    for (const ball of this.state.balls) {
      let updatedBall = this.physics.updateBallPosition(ball, deltaTime);

      // Check wall collision
      const wallCollision = this.physics.checkWallCollision(updatedBall);
      if (wallCollision.collided) {
        updatedBall = { ...updatedBall, velocity: wallCollision.velocity };
      }

      // Check paddle collision
      const paddleCollision = this.physics.checkPaddleCollision(updatedBall, this.state.paddle);
      if (paddleCollision.collided) {
        updatedBall = { ...updatedBall, velocity: paddleCollision.velocity };
      }

      // Check brick collisions
      for (const brick of this.state.bricks) {
        if (!brick.destroyed) {
          const brickCollision = this.physics.checkBrickCollision(updatedBall, brick);
          if (brickCollision.collided) {
            updatedBall = { ...updatedBall, velocity: brickCollision.velocity };
            brick.hits++;
            
            if (brick.hits >= brick.maxHits) {
              brick.destroyed = true;
              this.state.score += brick.points;
              
              // Chance to spawn power-up
              if (Math.random() < this.config.powerUpChance) {
                this.spawnPowerUp(brick.position);
              }
            }
            
            break; // Only one brick collision per frame
          }
        }
      }

      // Check if ball fell off screen
      if (this.physics.checkBottomCollision(updatedBall)) {
        ballsToRemove.push(updatedBall);
      } else {
        updatedBalls.push(updatedBall);
      }
    }

    this.state.balls = updatedBalls;

    // Check if all balls are lost
    if (this.state.balls.length === 0) {
      this.loseLife();
    }

    // Check if all bricks are destroyed
    if (this.state.bricks.every(brick => brick.destroyed)) {
      this.nextLevel();
    }

    // Update power-ups
    this.updatePowerUps(deltaTime);

    return this.getState();
  }

  private spawnPowerUp(position: Position): void {
    const types: PowerUp['type'][] = ['expand', 'multiball', 'slow', 'extralife'];
    const type = types[Math.floor(Math.random() * types.length)];

    this.state.powerUps.push({
      id: `powerup-${Date.now()}`,
      type,
      position: { ...position },
      velocity: { dx: 0, dy: 100 },
      width: 20,
      height: 10,
      active: true,
    });
  }

  private updatePowerUps(deltaTime: number): void {
    this.state.powerUps = this.state.powerUps.filter(powerUp => {
      if (!powerUp.active) return false;

      powerUp.position.y += powerUp.velocity.dy * deltaTime;

      // Check paddle collision
      if (this.checkPowerUpPaddleCollision(powerUp, this.state.paddle)) {
        this.activatePowerUp(powerUp);
        return false;
      }

      // Remove if off screen
      return powerUp.position.y < this.config.canvasHeight;
    });
  }

  private checkPowerUpPaddleCollision(powerUp: PowerUp, paddle: Paddle): boolean {
    return powerUp.position.x < paddle.position.x + paddle.width &&
           powerUp.position.x + powerUp.width > paddle.position.x &&
           powerUp.position.y < paddle.position.y + paddle.height &&
           powerUp.position.y + powerUp.height > paddle.position.y;
  }

  private activatePowerUp(powerUp: PowerUp): void {
    switch (powerUp.type) {
      case 'expand':
        this.state.paddle.width = Math.min(150, this.state.paddle.width * 1.5);
        break;
      case 'multiball':
        const currentBalls = [...this.state.balls];
        for (const ball of currentBalls) {
          // Create new ball with slightly different angle
          const newAngle = Math.atan2(ball.velocity.dy, ball.velocity.dx) + (Math.random() - 0.5) * 0.5;
          this.state.balls.push({
            ...ball,
            position: { ...ball.position },
            velocity: {
              dx: Math.cos(newAngle),
              dy: Math.sin(newAngle),
            },
          });
        }
        break;
      case 'slow':
        this.state.balls.forEach(ball => {
          ball.speed = Math.max(150, ball.speed * 0.8); // Don't go too slow
        });
        break;
      case 'extralife':
        this.state.lives++;
        break;
    }
  }

  private loseLife(): void {
    this.state.lives--;
    
    if (this.state.lives <= 0) {
      this.state.gameStatus = 'lost';
    } else {
      // Reset paddle and ball
      this.state.paddle = this.createPaddle();
      this.state.balls = [this.createBall(this.state.paddle)];
      this.state.gameStatus = 'idle';
    }
  }

  private nextLevel(): void {
    this.state.level++;
    this.state.bricks = this.createBricks();
    this.state.paddle = this.createPaddle();
    const newBall = this.createBall(this.state.paddle);
    // Increase speed by 5% per level
    newBall.speed = this.config.ballSpeed * (1 + (this.state.level - 1) * 0.05);
    this.state.balls = [newBall];
    this.state.gameStatus = 'idle';
  }

  movePaddleLeft(deltaTime: number): GameState {
    if (this.state.gameStatus === 'playing') {
      this.state.paddle = this.physics.movePaddle(this.state.paddle, 'left', deltaTime);
      
      // Move ball with paddle if game is idle
      if (this.state.gameStatus === 'idle' && this.state.balls.length > 0) {
        this.state.balls[0].position.x = this.state.paddle.position.x + this.state.paddle.width / 2;
      }
    }
    return this.getState();
  }

  movePaddleRight(deltaTime: number): GameState {
    if (this.state.gameStatus === 'playing') {
      this.state.paddle = this.physics.movePaddle(this.state.paddle, 'right', deltaTime);
      
      // Move ball with paddle if game is idle
      if (this.state.gameStatus === 'idle' && this.state.balls.length > 0) {
        this.state.balls[0].position.x = this.state.paddle.position.x + this.state.paddle.width / 2;
      }
    }
    return this.getState();
  }

  movePaddleToPosition(x: number): GameState {
    if (this.state.gameStatus === 'playing' || this.state.gameStatus === 'idle') {
      const newX = Math.max(0, Math.min(x - this.state.paddle.width / 2, this.config.canvasWidth - this.state.paddle.width));
      this.state.paddle.position.x = newX;
      
      // Move ball with paddle if game is idle
      if (this.state.gameStatus === 'idle' && this.state.balls.length > 0) {
        this.state.balls[0].position.x = this.state.paddle.position.x + this.state.paddle.width / 2;
      }
    }
    return this.getState();
  }

  launch(): GameState {
    if (this.state.gameStatus === 'idle' && this.state.balls.length > 0) {
      this.state.balls[0] = this.physics.launchBall(this.state.paddle);
      this.state.gameStatus = 'playing';
      this.lastUpdateTime = performance.now();
    }
    return this.getState();
  }

  pause(): GameState {
    if (this.state.gameStatus === 'playing') {
      this.state.gameStatus = 'paused';
    } else if (this.state.gameStatus === 'paused') {
      this.state.gameStatus = 'playing';
      this.lastUpdateTime = performance.now();
    }
    return this.getState();
  }

  reset(): GameState {
    this.state = this.createInitialState();
    this.lastUpdateTime = 0;
    return this.getState();
  }

  skipLevel(): GameState {
    // Destroy all remaining bricks to trigger level completion
    this.state.bricks.forEach(brick => {
      brick.destroyed = true;
    });
    // Trigger next level
    this.nextLevel();
    return this.getState();
  }
}