import { Ball, Paddle, Brick, Position, Velocity, GameConfig } from './types';

export class PhysicsEngine {
  constructor(private config: GameConfig) {}

  updateBallPosition(ball: Ball, deltaTime: number): Ball {
    return {
      ...ball,
      position: {
        x: ball.position.x + ball.velocity.dx * ball.speed * deltaTime,
        y: ball.position.y + ball.velocity.dy * ball.speed * deltaTime,
      },
    };
  }

  checkWallCollision(ball: Ball): { collided: boolean; velocity: Velocity } {
    let { dx, dy } = ball.velocity;
    let collided = false;

    // Left and right walls
    if (ball.position.x - ball.radius <= 0 || 
        ball.position.x + ball.radius >= this.config.canvasWidth) {
      dx = -dx;
      collided = true;
      
      // Prevent ball from getting stuck horizontally
      // Add a small vertical component if moving too horizontally
      if (Math.abs(dy) < 0.2) {
        dy = dy === 0 ? 0.2 : dy * 1.2;
        // Normalize the velocity to maintain speed
        const magnitude = Math.sqrt(dx * dx + dy * dy);
        dx = dx / magnitude;
        dy = dy / magnitude;
      }
    }

    // Top wall
    if (ball.position.y - ball.radius <= 0) {
      dy = -dy;
      collided = true;
      
      // Prevent ball from getting stuck vertically
      // Add a small horizontal component if moving too vertically
      if (Math.abs(dx) < 0.2) {
        dx = dx === 0 ? 0.2 : dx * 1.2;
        // Normalize the velocity to maintain speed
        const magnitude = Math.sqrt(dx * dx + dy * dy);
        dx = dx / magnitude;
        dy = dy / magnitude;
      }
    }

    return { collided, velocity: { dx, dy } };
  }

  checkBottomCollision(ball: Ball): boolean {
    return ball.position.y - ball.radius >= this.config.canvasHeight;
  }

  checkPaddleCollision(ball: Ball, paddle: Paddle): { collided: boolean; velocity: Velocity } {
    const ballBottom = ball.position.y + ball.radius;
    const ballTop = ball.position.y - ball.radius;
    const ballLeft = ball.position.x - ball.radius;
    const ballRight = ball.position.x + ball.radius;

    const paddleTop = paddle.position.y;
    const paddleBottom = paddle.position.y + paddle.height;
    const paddleLeft = paddle.position.x;
    const paddleRight = paddle.position.x + paddle.width;

    if (ballBottom >= paddleTop &&
        ballTop <= paddleBottom &&
        ballRight >= paddleLeft &&
        ballLeft <= paddleRight &&
        ball.velocity.dy > 0) {
      
      // Calculate hit position relative to paddle center (-1 to 1)
      const hitPos = (ball.position.x - (paddle.position.x + paddle.width / 2)) / (paddle.width / 2);
      
      // Adjust angle based on hit position, but limit to prevent too horizontal angles
      const maxAngle = Math.PI / 3; // 60 degrees max
      const angle = hitPos * maxAngle;
      
      const speed = Math.sqrt(ball.velocity.dx * ball.velocity.dx + ball.velocity.dy * ball.velocity.dy);
      let dx = speed * Math.sin(angle);
      let dy = -Math.abs(speed * Math.cos(angle));
      
      // Ensure minimum vertical velocity to prevent horizontal bouncing
      if (Math.abs(dy) < 0.3) {
        dy = -0.3;
        // Normalize to maintain speed
        const magnitude = Math.sqrt(dx * dx + dy * dy);
        dx = (dx / magnitude) * speed;
        dy = (dy / magnitude) * speed;
      }

      return { collided: true, velocity: { dx, dy } };
    }

    return { collided: false, velocity: ball.velocity };
  }

  checkBrickCollision(ball: Ball, brick: Brick): { collided: boolean; velocity: Velocity } {
    if (brick.destroyed) {
      return { collided: false, velocity: ball.velocity };
    }

    const ballLeft = ball.position.x - ball.radius;
    const ballRight = ball.position.x + ball.radius;
    const ballTop = ball.position.y - ball.radius;
    const ballBottom = ball.position.y + ball.radius;

    const brickLeft = brick.position.x;
    const brickRight = brick.position.x + brick.width;
    const brickTop = brick.position.y;
    const brickBottom = brick.position.y + brick.height;

    if (ballRight >= brickLeft &&
        ballLeft <= brickRight &&
        ballBottom >= brickTop &&
        ballTop <= brickBottom) {
      
      let { dx, dy } = ball.velocity;

      // Determine which side of brick was hit
      const overlapLeft = ballRight - brickLeft;
      const overlapRight = brickRight - ballLeft;
      const overlapTop = ballBottom - brickTop;
      const overlapBottom = brickBottom - ballTop;

      const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

      if (minOverlap === overlapLeft || minOverlap === overlapRight) {
        dx = -dx;
      } else {
        dy = -dy;
      }

      return { collided: true, velocity: { dx, dy } };
    }

    return { collided: false, velocity: ball.velocity };
  }

  movePaddle(paddle: Paddle, direction: 'left' | 'right', deltaTime: number): Paddle {
    const newX = direction === 'left' 
      ? Math.max(0, paddle.position.x - paddle.speed * deltaTime)
      : Math.min(this.config.canvasWidth - paddle.width, paddle.position.x + paddle.speed * deltaTime);

    return {
      ...paddle,
      position: { ...paddle.position, x: newX }
    };
  }

  launchBall(paddle: Paddle): Ball {
    const angle = (Math.random() - 0.5) * Math.PI / 3; // Random angle between -60 and 60 degrees
    return {
      position: {
        x: paddle.position.x + paddle.width / 2,
        y: paddle.position.y - this.config.ballRadius - 1,
      },
      velocity: {
        dx: Math.sin(angle),
        dy: -Math.abs(Math.cos(angle)), // Always launch upward
      },
      radius: this.config.ballRadius,
      speed: this.config.ballSpeed,
    };
  }
}