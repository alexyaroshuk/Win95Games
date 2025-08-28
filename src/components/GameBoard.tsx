'use client';

import React from 'react';
import { Cell } from './MinesweeperGame';
import { GameCell } from './GameCell';

interface GameBoardProps {
    board: Cell[][];
    onCellClick: (row: number, col: number) => void;
    onRightClick: (row: number, col: number) => void;
    onCellMouseDown: (row: number, col: number) => void;
    onCellMouseUp: (row: number, col: number) => void;
    onCellMouseEnter: (row: number, col: number) => void;
    gameOver: boolean;
    gameWon: boolean;
    isDragging: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({
    board,
    onCellClick,
    onRightClick,
    onCellMouseDown,
    onCellMouseUp,
    onCellMouseEnter,
    gameOver,
    gameWon,
    isDragging
}) => {
    const handleCellClick = (row: number, col: number) => {
        onCellClick(row, col);
    };

    const handleRightClick = (e: React.MouseEvent, row: number, col: number) => {
        e.preventDefault();
        onRightClick(row, col);
    };

    const handleCellMouseDown = (row: number, col: number) => {
        onCellMouseDown(row, col);
    };

    const handleCellMouseUp = (row: number, col: number) => {
        onCellMouseUp(row, col);
    };

    const handleCellMouseEnter = (row: number, col: number) => {
        onCellMouseEnter(row, col);
    };

    const getGridCols = () => {
        if (board.length === 0) return 'grid-cols-9';
        const cols = board[0].length;
        if (cols <= 9) return 'grid-cols-9';
        if (cols <= 16) return 'grid-cols-16';
        return 'grid-cols-30';
    };

    const getGridStyle = () => {
        if (board.length === 0) return {};
        const cols = board[0].length;
        const rows = board.length;

        // Classic Minesweeper cell size
        const cellSize = 20;

        return {
            gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
            gap: '0px'
        };
    };

    // Calculate board width to match cells
    const getBoardWidth = () => {
        if (board.length === 0) return 192; // Default for 9x9
        const cols = board[0].length;
        const cellSize = 20;
        return cols * cellSize + 6; // +6 for the border (3px each side)
    };

    return (
        <div className="bg-gray-300" style={{
            border: '3px solid',
            borderTopColor: '#808080',
            borderLeftColor: '#808080',
            borderRightColor: '#ffffff',
            borderBottomColor: '#ffffff',
            width: `${getBoardWidth()}px`,
            boxSizing: 'border-box'
        }}>
            <div className="grid" style={getGridStyle()}>
                {board.map((row, rowIndex) =>
                    row.map((cell) => (
                        <GameCell
                            key={cell.id}
                            cell={cell}
                            onClick={() => handleCellClick(cell.row, cell.col)}
                            onRightClick={(e) => handleRightClick(e, cell.row, cell.col)}
                            onMouseDown={() => handleCellMouseDown(cell.row, cell.col)}
                            onMouseUp={() => handleCellMouseUp(cell.row, cell.col)}
                            onMouseEnter={() => handleCellMouseEnter(cell.row, cell.col)}
                            gameOver={gameOver}
                            gameWon={gameWon}
                            isDragging={isDragging}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
