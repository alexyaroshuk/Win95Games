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
    isQuestionMark: boolean;
    neighborMines: number;
    isClickedMine?: boolean; // Track if this mine caused game over
    isIncorrectFlag?: boolean; // Track if this flag was incorrectly placed
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
    difficulty: 'beginner' | 'intermediate' | 'expert' | 'custom';
    customSettings?: { rows: number; cols: number; mines: number };
    isDragging: boolean;
    dragStartCell: { row: number; col: number } | null;
    allowQuestionMarks: boolean;
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
                isQuestionMark: false,
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

const initializeGame = (
    difficulty: 'beginner' | 'intermediate' | 'expert' | 'custom', 
    allowQuestionMarks: boolean = false,
    customSettings?: { rows: number; cols: number; mines: number }
): GameState => {
    let config;
    if (difficulty === 'custom' && customSettings) {
        config = customSettings;
    } else if (difficulty !== 'custom') {
        config = DIFFICULTY_CONFIGS[difficulty];
    } else {
        // Fallback to beginner if custom but no settings
        config = DIFFICULTY_CONFIGS.beginner;
    }
    
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
        customSettings: difficulty === 'custom' ? customSettings : undefined,
        isDragging: false,
        dragStartCell: null,
        allowQuestionMarks
    };
};

interface MinesweeperGameProps {
    initialDifficulty: 'beginner' | 'intermediate' | 'expert' | 'custom';
    customSettings?: { rows: number; cols: number; mines: number };
    allowQuestionMarks?: boolean;
    onAllowQuestionMarksChange?: (value: boolean) => void;
}

export const MinesweeperGame: React.FC<MinesweeperGameProps> = ({ 
    initialDifficulty,
    customSettings,
    allowQuestionMarks: initialAllowQuestionMarks = false,
    onAllowQuestionMarksChange 
}) => {
    const [gameState, setGameState] = useState<GameState>(() => 
        initializeGame(initialDifficulty, initialAllowQuestionMarks, customSettings)
    );
    const [isAnyCellPressed, setIsAnyCellPressed] = useState<boolean>(false);



    const handleCellClick = useCallback((row: number, col: number) => {
        if (gameState.gameOver || gameState.gameWon) return;

        const cell = gameState.board[row][col];
        // Only flagged cells should not be clickable, question marks can be clicked
        if (cell.isFlagged || cell.isRevealed) return;

        // Create completely new board
        const newBoard = gameState.board.map(row => row.map(cell => ({ ...cell })));

        // Start timer if first click
        const startTime = gameState.startTime || Date.now();

        // If mine, game over
        if (cell.isMine) {
            // Mark this mine as the clicked one
            newBoard[row][col].isClickedMine = true;
            newBoard[row][col].isQuestionMark = false;  // Clear question mark from clicked mine

            // Reveal mines and mark incorrect flags
            for (let r = 0; r < newBoard.length; r++) {
                for (let c = 0; c < newBoard[0].length; c++) {
                    if (newBoard[r][c].isMine) {
                        newBoard[r][c].isRevealed = true;
                        newBoard[r][c].isQuestionMark = false;  // Clear question marks from all mines
                    } else if (newBoard[r][c].isFlagged) {
                        // Mark incorrectly placed flags
                        newBoard[r][c].isIncorrectFlag = true;
                        newBoard[r][c].isRevealed = true;
                    } else if (newBoard[r][c].isQuestionMark) {
                        // Reveal question mark cells normally when game is over
                        newBoard[r][c].isRevealed = true;
                        newBoard[r][c].isQuestionMark = false;
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

            // Don't reveal flagged cells during flood fill, but question marks are ok
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

        // Reveal all cells in toReveal array and clear question marks
        toReveal.forEach(({ row: r, col: c }) => {
            newBoard[r][c].isRevealed = true;
            newBoard[r][c].isQuestionMark = false;  // Clear question mark when revealing
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
        // Only flagged cells should not show press state, question marks can
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

            let newFlaggedCount = prev.flaggedCount;
            
            // Cycle through states based on allowQuestionMarks setting
            if (prev.allowQuestionMarks) {
                // With question marks: unmarked -> flag -> question -> unmarked
                if (!cell.isFlagged && !cell.isQuestionMark) {
                    // Unmarked -> Flag
                    newBoard[row][col] = { ...cell, isFlagged: true, isQuestionMark: false };
                    newFlaggedCount++;
                } else if (cell.isFlagged && !cell.isQuestionMark) {
                    // Flag -> Question
                    newBoard[row][col] = { ...cell, isFlagged: false, isQuestionMark: true };
                    newFlaggedCount--;
                } else if (!cell.isFlagged && cell.isQuestionMark) {
                    // Question -> Unmarked
                    newBoard[row][col] = { ...cell, isFlagged: false, isQuestionMark: false };
                }
            } else {
                // Without question marks: unmarked -> flag -> unmarked
                newBoard[row][col] = { ...cell, isFlagged: !cell.isFlagged, isQuestionMark: false };
                newFlaggedCount = prev.flaggedCount + (cell.isFlagged ? -1 : 1);
            }

            return {
                ...prev,
                board: newBoard,
                flaggedCount: newFlaggedCount
            };
        });
    }, [gameState.gameOver, gameState.gameWon]);

    // Function removed - not needed anymore



    const handleResetGame = () => {
        setGameState(initializeGame(gameState.difficulty, initialAllowQuestionMarks, gameState.customSettings));
    };
    
    // Sync allowQuestionMarks with prop
    useEffect(() => {
        setGameState(prev => ({
            ...prev,
            allowQuestionMarks: initialAllowQuestionMarks
        }));
    }, [initialAllowQuestionMarks]);

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
                    customSettings={gameState.customSettings}
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
