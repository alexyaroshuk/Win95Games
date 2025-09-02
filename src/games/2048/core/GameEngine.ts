import { Grid, Direction, GRID_SIZE } from './types';

export class Game2048Engine {
  static initializeGrid(): Grid {
    const newGrid: Grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
    this.addRandomTile(newGrid);
    this.addRandomTile(newGrid);
    return newGrid;
  }

  static addRandomTile(grid: Grid): { success: boolean; position?: string } {
    const emptyCells: [number, number][] = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === null) {
          emptyCells.push([i, j]);
        }
      }
    }
    
    if (emptyCells.length === 0) return { success: false };
    
    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    return { success: true, position: `${row}-${col}` };
  }

  static moveGrid(grid: Grid, direction: Direction): { 
    newGrid: Grid; 
    points: number; 
    moved: boolean; 
    mergedPositions: Set<string> 
  } {
    let newGrid = grid.map(row => [...row]);
    let points = 0;
    let moved = false;
    const mergedPositions = new Set<string>();

    const rotateGrid = (g: Grid): Grid => {
      const result: Grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          result[j][GRID_SIZE - 1 - i] = g[i][j];
        }
      }
      return result;
    };

    const slideLeft = (g: Grid): Grid => {
      return g.map((row, rowIndex) => {
        const filtered = row.filter(cell => cell !== null);
        const merged: (number | null)[] = [];
        let skip = false;
        
        for (let i = 0; i < filtered.length; i++) {
          if (skip) {
            skip = false;
            continue;
          }
          
          if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
            const newValue = (filtered[i] as number) * 2;
            merged.push(newValue);
            points += newValue;
            mergedPositions.add(`${rowIndex}-${merged.length - 1}`);
            skip = true;
            moved = true;
          } else {
            merged.push(filtered[i]);
          }
        }
        
        const newRow = [...merged, ...Array(GRID_SIZE - merged.length).fill(null)];
        if (row.some((cell, index) => cell !== newRow[index])) {
          moved = true;
        }
        return newRow;
      });
    };

    if (direction === 'left') {
      newGrid = slideLeft(newGrid);
    } else if (direction === 'right') {
      newGrid = rotateGrid(rotateGrid(slideLeft(rotateGrid(rotateGrid(newGrid)))));
    } else if (direction === 'up') {
      newGrid = rotateGrid(slideLeft(rotateGrid(rotateGrid(rotateGrid(newGrid)))));
    } else if (direction === 'down') {
      newGrid = rotateGrid(rotateGrid(rotateGrid(slideLeft(rotateGrid(newGrid)))));
    }

    return { newGrid, points, moved, mergedPositions };
  }

  static isGameOver(grid: Grid): boolean {
    // Check for empty cells
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === null) return false;
      }
    }
    
    // Check for possible merges
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const current = grid[i][j];
        if (j < GRID_SIZE - 1 && current === grid[i][j + 1]) return false;
        if (i < GRID_SIZE - 1 && current === grid[i + 1][j]) return false;
      }
    }
    
    return true;
  }

  static hasWon(grid: Grid): boolean {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === 2048) return true;
      }
    }
    return false;
  }

  static getMaxTile(grid: Grid): number {
    let max = 0;
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const value = grid[i][j];
        if (value && value > max) max = value;
      }
    }
    return max;
  }
}