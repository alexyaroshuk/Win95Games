'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { GameBoard } from './GameBoard';
import { GameStats } from './GameStats';

export interface Cell {
    id: string;
    row: number;
    col: number;
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    neighborMines: number;
    isClickedMine?: boolean; // Track if this mine caused game over
}

export interface GameState {
    board: Cell[][];
    gameOver: boolean;
    gameWon: boolean;
    mineCount: number;
    flaggedCount: number;
    revealedCount: number;
    startTime: number | null;
    endTime: number | null;
    difficulty: 'beginner' | 'intermediate' | 'expert';
    isDragging: boolean;
    dragStartCell: { row: number; col: number } | null;
}

const DIFFICULTY_CONFIGS = {
    beginner: { rows: 9, cols: 9, mines: 10 },
    intermediate: { rows: 16, cols: 16, mines: 40 },
    expert: { rows: 16, cols: 30, mines: 99 }
};

// Helper functions moved outside component
const createBoard = (rows: number, cols: number, mines: number): Cell[][] => {
    const board: Cell[][] = [];

    // Initialize empty board
    for (let row = 0; row < rows; row++) {
        board[row] = [];
        for (let col = 0; col < cols; col++) {
            board[row][col] = {
                id: `${row}-${col}`,
                row,
                col,
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                neighborMines: 0,
                isClickedMine: false
            };
        }
    }

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < mines) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);

        if (!board[row][col].isMine) {
            board[row][col].isMine = true;
            minesPlaced++;
        }
    }

    // Calculate neighbor mines for each cell
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (!board[row][col].isMine) {
                board[row][col].neighborMines = countNeighborMines(board, row, col);
            }
        }
    }

    return board;
};

const countNeighborMines = (board: Cell[][], row: number, col: number): number => {
    let count = 0;
    for (let r = Math.max(0, row - 1); r <= Math.min(board.length - 1, row + 1); r++) {
        for (let c = Math.max(0, col - 1); c <= Math.min(board[0].length - 1, col + 1); c++) {
            if (board[r][c].isMine) count++;
        }
    }
    return count;
};

const initializeGame = (difficulty: 'beginner' | 'intermediate' | 'expert'): GameState => {
    const config = DIFFICULTY_CONFIGS[difficulty];
    const board = createBoard(config.rows, config.cols, config.mines);

    return {
        board,
        gameOver: false,
        gameWon: false,
        mineCount: config.mines,
        flaggedCount: 0,
        revealedCount: 0,
        startTime: null,
        endTime: null,
        difficulty,
        isDragging: false,
        dragStartCell: null
    };
};

interface MinesweeperGameProps {
    initialDifficulty: 'beginner' | 'intermediate' | 'expert';
}

export const MinesweeperGame: React.FC<MinesweeperGameProps> = ({ initialDifficulty }) => {
    const [gameState, setGameState] = useState<GameState>(() => initializeGame(initialDifficulty));
    const [isAnyCellPressed, setIsAnyCellPressed] = useState<boolean>(false);



    const handleCellClick = useCallback((row: number, col: number) => {
        if (gameState.gameOver || gameState.gameWon) return;

        const cell = gameState.board[row][col];
        if (cell.isFlagged || cell.isRevealed) return;

        // Create completely new board
        const newBoard = gameState.board.map(row => row.map(cell => ({ ...cell })));

        // Start timer if first click
        const startTime = gameState.startTime || Date.now();

        // If mine, game over
        if (cell.isMine) {
            // Mark this mine as the clicked one
            newBoard[row][col].isClickedMine = true;

            // Only reveal mines, not all cells
            for (let r = 0; r < newBoard.length; r++) {
                for (let c = 0; c < newBoard[0].length; c++) {
                    if (newBoard[r][c].isMine) {
                        newBoard[r][c].isRevealed = true;
                    }
                }
            }
            setGameState({
                ...gameState,
                board: newBoard,
                gameOver: true,
                startTime,
                endTime: Date.now()
            });
            return;
        }

        // Reveal cells using flood fill
        const toReveal = [];
        const visited = new Set();
        const queue = [{ row, col }];

        while (queue.length > 0) {
            const { row: r, col: c } = queue.shift()!;
            const key = `${r},${c}`;

            if (visited.has(key) || r < 0 || r >= newBoard.length || c < 0 || c >= newBoard[0].length) {
                continue;
            }

            visited.add(key);
            const currentCell = newBoard[r][c];

            if (currentCell.isFlagged || currentCell.isRevealed || currentCell.isMine) {
                continue;
            }

            toReveal.push({ row: r, col: c });

            // If empty cell, add neighbors to queue
            if (currentCell.neighborMines === 0) {
                for (let nr = r - 1; nr <= r + 1; nr++) {
                    for (let nc = c - 1; nc <= c + 1; nc++) {
                        if (nr !== r || nc !== c) {
                            queue.push({ row: nr, col: nc });
                        }
                    }
                }
            }
        }

        // Reveal all cells in toReveal array
        toReveal.forEach(({ row: r, col: c }) => {
            newBoard[r][c].isRevealed = true;
        });

        // Count revealed cells
        let revealedCount = 0;
        for (let r = 0; r < newBoard.length; r++) {
            for (let c = 0; c < newBoard[0].length; c++) {
                if (newBoard[r][c].isRevealed) revealedCount++;
            }
        }

        // Check win condition
        const totalCells = newBoard.length * newBoard[0].length;
        const gameWon = revealedCount === totalCells - gameState.mineCount;

        setGameState({
            ...gameState,
            board: newBoard,
            revealedCount,
            gameWon,
            startTime,
            endTime: gameWon ? Date.now() : null
        });
    }, [gameState]);

    const handleCellMouseDown = useCallback((row: number, col: number) => {
        if (gameState.gameOver || gameState.gameWon) return;

        const cell = gameState.board[row][col];
        if (cell.isFlagged || cell.isRevealed) return;

        // Set cell pressed state for shocked emoji
        setIsAnyCellPressed(true);

        // Start drag operation
        setGameState(prev => ({
            ...prev,
            isDragging: true,
            dragStartCell: { row, col }
        }));
    }, [gameState.gameOver, gameState.gameWon]);

    const handleCellMouseUp = useCallback((row: number, col: number) => {
        if (gameState.gameOver || gameState.gameWon) return;

        // Reset cell pressed state
        setIsAnyCellPressed(false);

        // If we were dragging and mouse up is on a different cell, reveal that cell
        if (gameState.isDragging && gameState.dragStartCell) {
            const startCell = gameState.dragStartCell;
            if (startCell.row !== row || startCell.col !== col) {
                // Reveal the cell where mouse was released
                handleCellClick(row, col);
            }
        }

        // End drag operation
        setGameState(prev => ({
            ...prev,
            isDragging: false,
            dragStartCell: null
        }));
    }, [gameState.gameOver, gameState.gameWon, gameState.isDragging, gameState.dragStartCell, handleCellClick]);

    const handleCellMouseEnter = useCallback((row: number, col: number) => {
        if (gameState.gameOver || gameState.gameWon) return;

        // If dragging, show hover effect on cells
        if (gameState.isDragging) {
            // This will be handled by the GameCell component to show hover styles
        }
    }, [gameState.gameOver, gameState.gameWon, gameState.isDragging]);

    const handleRightClick = useCallback((row: number, col: number) => {
        if (gameState.gameOver || gameState.gameWon) return;



        setGameState(prev => {
            const newBoard = prev.board.map(row => [...row]);
            const cell = newBoard[row][col];

            if (cell.isRevealed) return prev;

            const newFlaggedCount = prev.flaggedCount + (cell.isFlagged ? -1 : 1);
            newBoard[row][col] = { ...cell, isFlagged: !cell.isFlagged };



            return {
                ...prev,
                board: newBoard,
                flaggedCount: newFlaggedCount
            };
        });
    }, [gameState.gameOver, gameState.gameWon]);

    // Function removed - not needed anymore



    const handleResetGame = () => {
        setGameState(initializeGame(gameState.difficulty));
    };

    return (
        <div style={{
            border: '3px solid',
            borderTopColor: '#ffffff',
            borderLeftColor: '#ffffff',
            borderRightColor: '#808080',
            borderBottomColor: '#808080',
            backgroundColor: '#c0c0c0',
            padding: '14px'
        }}>
            <div className="flex flex-col" style={{
                backgroundColor: '#c0c0c0',
                minHeight: '200px',
                gap: '8px'
            }}>
                <GameStats
                    mineCount={gameState.mineCount}
                    flaggedCount={gameState.flaggedCount}
                    startTime={gameState.startTime}
                    endTime={gameState.endTime}
                    gameOver={gameState.gameOver}
                    gameWon={gameState.gameWon}
                    onResetGame={handleResetGame}
                    isAnyCellPressed={isAnyCellPressed}
                    difficulty={gameState.difficulty}
                />

                <GameBoard
                    board={gameState.board}
                    onCellClick={handleCellClick}
                    onRightClick={handleRightClick}
                    onCellMouseDown={handleCellMouseDown}
                    onCellMouseUp={handleCellMouseUp}
                    onCellMouseEnter={handleCellMouseEnter}
                    gameOver={gameState.gameOver}
                    gameWon={gameState.gameWon}
                    isDragging={gameState.isDragging}
                />
            </div>
        </div>
    );
};
