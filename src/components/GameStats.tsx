'use client';

import React, { useState, useEffect } from 'react';

interface GameStatsProps {
    mineCount: number;
    flaggedCount: number;
    startTime: number | null;
    endTime: number | null;
    gameOver: boolean;
    gameWon: boolean;
    onResetGame: () => void;
    isAnyCellPressed: boolean;
    difficulty: 'beginner' | 'intermediate' | 'expert';
}

export const GameStats: React.FC<GameStatsProps> = ({
    mineCount,
    flaggedCount,
    startTime,
    endTime,
    gameOver,
    gameWon,
    onResetGame,
    isAnyCellPressed,
    difficulty
}) => {
    const [currentTime, setCurrentTime] = useState<number>(Date.now());

    useEffect(() => {
        if (startTime && !gameOver && !gameWon) {
            const interval = setInterval(() => {
                setCurrentTime(Date.now());
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [startTime, gameOver, gameWon]);

    const getElapsedTime = () => {
        if (!startTime) return 0;
        const end = endTime || currentTime;
        return Math.floor((end - startTime) / 1000);
    };

    const formatDigitalDisplay = (num: number, digits: number = 3) => {
        return Math.min(999, Math.max(0, num)).toString().padStart(digits, '0');
    };

    // LED digit component
    const LEDDigit = ({ digit }: { digit: string }) => {
        // Standard 7-segment patterns (a=top, b=top-right, c=bottom-right, d=bottom, e=bottom-left, f=top-left, g=middle)
        const segments = {
            '0': '1111110', // a,b,c,d,e,f (no g)
            '1': '0110000', // b,c only
            '2': '1101101', // a,b,d,e,g (no c,f)
            '3': '1111001', // a,b,c,d,g (no e,f)
            '4': '0110011', // b,c,f,g (no a,d,e)
            '5': '1011011', // a,c,d,f,g (no b,e)
            '6': '1011111', // a,c,d,e,f,g (no b)
            '7': '1110000', // a,b,c only
            '8': '1111111', // All segments
            '9': '1111011'  // a,b,c,d,f,g (no e)
        };

        const segmentPattern = segments[digit as keyof typeof segments] || '0000000';

        return (
            <div className="inline-block" style={{
                width: '14px',
                height: '24px',
                position: 'relative',
                marginRight: '1px'
            }}>
                {/* Segment a (top horizontal) */}
                <div style={{
                    position: 'absolute',
                    top: '1px',
                    left: '2px',
                    width: '10px',
                    height: '2px',
                    backgroundColor: segmentPattern[0] === '1' ? '#ff0000' : '#2a0000',
                    boxShadow: segmentPattern[0] === '1' ? '0 0 3px #ff0000' : 'none',
                    clipPath: 'polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)'
                }}></div>

                {/* Segment b (top-right vertical) */}
                <div style={{
                    position: 'absolute',
                    top: '2px',
                    right: '1px',
                    width: '2px',
                    height: '9px',
                    backgroundColor: segmentPattern[1] === '1' ? '#ff0000' : '#2a0000',
                    boxShadow: segmentPattern[1] === '1' ? '0 0 3px #ff0000' : 'none',
                    clipPath: 'polygon(0% 15%, 50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%)'
                }}></div>

                {/* Segment c (bottom-right vertical) */}
                <div style={{
                    position: 'absolute',
                    top: '13px',
                    right: '1px',
                    width: '2px',
                    height: '9px',
                    backgroundColor: segmentPattern[2] === '1' ? '#ff0000' : '#2a0000',
                    boxShadow: segmentPattern[2] === '1' ? '0 0 3px #ff0000' : 'none',
                    clipPath: 'polygon(0% 15%, 50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%)'
                }}></div>

                {/* Segment d (bottom horizontal) */}
                <div style={{
                    position: 'absolute',
                    bottom: '1px',
                    left: '2px',
                    width: '10px',
                    height: '2px',
                    backgroundColor: segmentPattern[3] === '1' ? '#ff0000' : '#2a0000',
                    boxShadow: segmentPattern[3] === '1' ? '0 0 3px #ff0000' : 'none',
                    clipPath: 'polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)'
                }}></div>

                {/* Segment e (bottom-left vertical) */}
                <div style={{
                    position: 'absolute',
                    top: '13px',
                    left: '1px',
                    width: '2px',
                    height: '9px',
                    backgroundColor: segmentPattern[4] === '1' ? '#ff0000' : '#2a0000',
                    boxShadow: segmentPattern[4] === '1' ? '0 0 3px #ff0000' : 'none',
                    clipPath: 'polygon(0% 15%, 50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%)'
                }}></div>

                {/* Segment f (top-left vertical) */}
                <div style={{
                    position: 'absolute',
                    top: '2px',
                    left: '1px',
                    width: '2px',
                    height: '9px',
                    backgroundColor: segmentPattern[5] === '1' ? '#ff0000' : '#2a0000',
                    boxShadow: segmentPattern[5] === '1' ? '0 0 3px #ff0000' : 'none',
                    clipPath: 'polygon(0% 15%, 50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%)'
                }}></div>

                {/* Segment g (middle horizontal) */}
                <div style={{
                    position: 'absolute',
                    top: '11px',
                    left: '2px',
                    width: '10px',
                    height: '2px',
                    backgroundColor: segmentPattern[6] === '1' ? '#ff0000' : '#2a0000',
                    boxShadow: segmentPattern[6] === '1' ? '0 0 3px #ff0000' : 'none',
                    clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)'
                }}></div>
            </div>
        );
    };

    const getSmileyFace = () => {
        if (gameWon) return '😎';
        if (gameOver) return '💀';
        if (isAnyCellPressed) return '😮';
        return '🙂';
    };

    const remainingMines = mineCount - flaggedCount;

    // Calculate width based on grid size (20px per cell)
    const getStatsWidth = () => {
        const cellSize = 20;
        const gridSizes = {
            beginner: { cols: 9 },
            intermediate: { cols: 16 },
            expert: { cols: 30 }
        };
        const cols = gridSizes[difficulty].cols;
        return cols * cellSize + 6; // +6 for the border (3px each side)
    };

    return (
        <div className="bg-gray-300" style={{
            border: '3px solid',
            borderTopColor: '#808080',
            borderLeftColor: '#808080',
            borderRightColor: '#ffffff',
            borderBottomColor: '#ffffff',
            padding: '6px',
            width: `${getStatsWidth()}px`,
            boxSizing: 'border-box'
        }}>
            <div className="flex justify-between items-center" style={{
                padding: '4px 8px'
            }}>
                {/* Mine Counter - Classic Windows 95 LED Display */}
                <div style={{
                    border: '2px inset #808080',
                    borderRightColor: '#ffffff',
                    borderBottomColor: '#ffffff',
                    minWidth: '50px',
                    height: '36px',
                    textAlign: 'center',
                    backgroundColor: '#000000',
                    padding: '0',
                    background: 'linear-gradient(to bottom, #000000 0%, #1a1a1a 100%)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box'
                }}>
                    {formatDigitalDisplay(remainingMines).split('').map((digit, index) => (
                        <LEDDigit key={index} digit={digit} />
                    ))}
                </div>

                {/* Smiley Face Button - Classic Windows 95 Style */}
                <button
                    onClick={onResetGame}
                    className="text-2xl"
                    style={{
                        width: '36px',
                        height: '36px',
                        border: '2px outset #c0c0c0',
                        borderLeftColor: '#ffffff',
                        borderTopColor: '#ffffff',
                        backgroundColor: '#c0c0c0',
                        fontFamily: 'MS Sans Serif, Arial, sans-serif',
                        fontSize: '18px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0'
                    }}
                    onMouseDown={(e) => {
                        e.currentTarget.style.border = '2px inset #c0c0c0';
                        e.currentTarget.style.borderLeftColor = '#808080';
                        e.currentTarget.style.borderTopColor = '#808080';
                    }}
                    onMouseUp={(e) => {
                        e.currentTarget.style.border = '2px outset #c0c0c0';
                        e.currentTarget.style.borderLeftColor = '#ffffff';
                        e.currentTarget.style.borderTopColor = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.border = '2px outset #c0c0c0';
                        e.currentTarget.style.borderTopColor = '#ffffff';
                    }}
                >
                    {getSmileyFace()}
                </button>

                {/* Timer - Classic Windows 95 LED Display */}
                <div style={{
                    border: '2px inset #808080',
                    borderRightColor: '#ffffff',
                    borderBottomColor: '#ffffff',
                    minWidth: '50px',
                    height: '36px',
                    textAlign: 'center',
                    backgroundColor: '#000000',
                    padding: '0',
                    background: 'linear-gradient(to bottom, #000000 0%, #1a1a1a 100%)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box'
                }}>
                    {formatDigitalDisplay(getElapsedTime()).split('').map((digit, index) => (
                        <LEDDigit key={index} digit={digit} />
                    ))}
                </div>
            </div>
        </div>
    );
};
