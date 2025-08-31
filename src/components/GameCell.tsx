'use client';

import React from 'react';
import { Cell } from './MinesweeperGame';

interface GameCellProps {
    cell: Cell;
    onClick: () => void;
    onRightClick: (e: React.MouseEvent) => void;
    onMouseDown: () => void;
    onMouseUp: () => void;
    onMouseEnter: () => void;
    gameOver: boolean;
    gameWon: boolean;
    isDragging: boolean;
}

export const GameCell: React.FC<GameCellProps> = ({
    cell,
    onClick,
    onRightClick,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    gameOver,
    gameWon,
    isDragging
}) => {
    const getContent = () => {
        // Show incorrect flag (mine with cross) for wrongly placed flags
        if (cell.isIncorrectFlag) {
            return (
                <span style={{ 
                    position: 'relative', 
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%'
                }}>
                    <span style={{ position: 'absolute' }}>💣</span>
                    <span style={{ 
                        position: 'absolute',
                        fontSize: '14px',
                        opacity: 0.7,
                        zIndex: 1
                    }}>❌</span>
                </span>
            );
        }
        if (cell.isFlagged) return '🚩';
        if (cell.isQuestionMark) {
            return <span style={{ 
                color: '#000000', 
                fontWeight: 'bold', 
                fontSize: '18px'
            }}>?</span>;
        }
        if (!cell.isRevealed) return '';
        if (cell.isMine) return '💣';
        if (cell.neighborMines === 0) return '';

        // Classic Minesweeper colors - bold numbers
        const getNumberStyle = (num: number) => {
            const colors = {
                1: '#0000FF', // Blue
                2: '#008000', // Green
                3: '#FF0000', // Red
                4: '#000080', // Navy/Dark Blue
                5: '#800000', // Maroon/Dark Red
                6: '#008080', // Teal
                7: '#000000', // Black
                8: '#808080'  // Gray
            };
            return {
                color: colors[num as keyof typeof colors] || '#000000',
                fontWeight: 'bold',
                fontSize: '18px'
            };
        };

        return <span style={getNumberStyle(cell.neighborMines)}>{cell.neighborMines}</span>;
    };

    // Classic Minesweeper cell styling
    const getCellStyle = () => {
        const baseStyle = {
            width: '20px',
            height: '20px',
            margin: '0',
            padding: '0',
            fontSize: '12px',
            fontWeight: 'bold',
            fontFamily: 'Consolas, "Courier New", monospace',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: cell.isRevealed ? 'default' : 'pointer'
        };

        if (cell.isRevealed) {
            return {
                ...baseStyle,
                backgroundColor: cell.isClickedMine ? '#ff0000' : cell.isIncorrectFlag ? '#ffcccc' : '#f0f0f0',
                border: '1px solid #d0d0d0',
                color: cell.isMine ? '#000000' : 'inherit'
            };
        } else {
            return {
                ...baseStyle,
                backgroundColor: '#c0c0c0',
                border: '2px outset #c0c0c0'
            };
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Only show pressed state for left click (button 0), not right click (button 2)
        if (!cell.isRevealed && !gameOver && !gameWon && e.button === 0) {
            e.currentTarget.style.border = '1px inset #c0c0c0';
            e.currentTarget.style.backgroundColor = '#f0f0f0';
        }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!cell.isRevealed && !gameOver && !gameWon) {
            e.currentTarget.style.border = '2px outset #c0c0c0';
            e.currentTarget.style.backgroundColor = '#c0c0c0';
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!cell.isRevealed && !gameOver && !gameWon) {
            e.currentTarget.style.border = '2px outset #c0c0c0';
            e.currentTarget.style.backgroundColor = '#c0c0c0';
        }
    };

    return (
        <button
            style={getCellStyle()}
            onClick={onClick}
            onContextMenu={(e) => {
                e.preventDefault();
                onRightClick(e);
            }}
            onMouseDown={(e) => {
                handleMouseDown(e);
                // Only trigger the parent's onMouseDown for left click
                if (e.button === 0) {
                    onMouseDown();
                }
            }}
            onMouseUp={(e) => {
                handleMouseUp(e);
                onMouseUp();
            }}
            onMouseEnter={(e) => {
                if (isDragging && !cell.isRevealed && !gameOver && !gameWon) {
                    // Show hover effect when dragging over cells
                    const button = e.currentTarget as HTMLButtonElement;
                    button.style.backgroundColor = '#f0f0f0';
                    button.style.border = '1px inset #c0c0c0';
                }
                onMouseEnter();
            }}
            onMouseLeave={handleMouseLeave}
            disabled={cell.isRevealed || gameOver || gameWon}
            aria-label={`Cell ${cell.row + 1}, ${cell.col + 1}`}
        >
            {getContent()}
        </button>
    );
};
