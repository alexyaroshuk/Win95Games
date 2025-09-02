'use client';

import React from 'react';
import { Position, GRID_SIZE, CELL_SIZE } from '../core/types';
import { win95Theme } from '@/styles/theme';

interface SnakeBoardProps {
  snake: Position[];
  food: Position;
}

export const SnakeBoard: React.FC<SnakeBoardProps> = ({ snake, food }) => {
  const { borders } = win95Theme;

  return (
    <div style={{
      ...borders.inset,
      position: 'relative',
      width: GRID_SIZE * CELL_SIZE,
      height: GRID_SIZE * CELL_SIZE,
      backgroundColor: '#9b9b9b',
      display: 'grid',
      gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
      gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
      boxSizing: 'content-box'
    }}>
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
        const x = index % GRID_SIZE;
        const y = Math.floor(index / GRID_SIZE);
        const isSnake = snake.some(segment => segment.x === x && segment.y === y);
        const isHead = snake[0]?.x === x && snake[0]?.y === y;
        const isFood = food.x === x && food.y === y;

        return (
          <div
            key={index}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: isHead ? '#004800' : isSnake ? '#00ff00' : isFood ? '#ff0000' : 'transparent',
              border: (isSnake || isFood) ? '1px solid rgba(0,0,0,0.2)' : 'none'
            }}
          />
        );
      })}
    </div>
  );
};