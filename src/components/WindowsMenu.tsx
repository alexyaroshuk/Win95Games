'use client';

import React, { useState } from 'react';

interface WindowsMenuProps {
    onNewGame: (difficulty: 'beginner' | 'intermediate' | 'expert') => void;
    onResetGame: () => void;
    currentDifficulty: 'beginner' | 'intermediate' | 'expert';
}

export const WindowsMenu: React.FC<WindowsMenuProps> = ({
    onNewGame,
    onResetGame,
    currentDifficulty
}) => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const handleMenuClick = (menuName: string) => {
        setActiveMenu(activeMenu === menuName ? null : menuName);
    };

    const handleNewGame = (difficulty: 'beginner' | 'intermediate' | 'expert') => {
        onNewGame(difficulty);
        setActiveMenu(null);
    };

    const handleResetGame = () => {
        onResetGame();
        setActiveMenu(null);
    };

    return (
        <div className="flex space-x-1">
            {/* File Menu */}
        <div className="relative">
                <button
                    onClick={() => handleMenuClick('file')}
                    style={{
                        border: '2px outset #c0c0c0',
                        backgroundColor: activeMenu === 'file' ? '#000080' : '#c0c0c0',
                        color: activeMenu === 'file' ? '#ffffff' : '#000000',
                        fontFamily: 'MS Sans Serif, Arial, sans-serif',
                        fontSize: '10px',
                        fontWeight: 'normal',
                        padding: '1px 4px',
                        cursor: 'pointer'
                    }}
                >
                    <span style={{ textDecoration: 'underline' }}>F</span>ile
                </button>

                {activeMenu === 'file' && (
                    <div className="absolute top-full left-0 z-10" style={{
                        minWidth: '120px',
                        backgroundColor: '#c0c0c0'
                    }}>
            <button
                            onClick={handleResetGame}
                            className="w-full px-3 py-1 text-left"
                style={{
                                fontFamily: 'MS Sans Serif, Arial, sans-serif',
                                fontSize: '10px',
                                color: '#000000',
                                backgroundColor: '#c0c0c0',
                    border: 'none',
                                padding: '4px 8px'
                }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#000080';
                    e.currentTarget.style.color = '#ffffff';
                }}
                            onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#c0c0c0';
                    e.currentTarget.style.color = '#000000';
                }}
                        >
                            New Game
                        </button>
                        <div style={{
                            margin: '2px 0'
                        }}></div>
                        <button
                            onClick={() => setActiveMenu(null)}
                            className="w-full px-3 py-1 text-left"
                            style={{
                                fontFamily: 'MS Sans Serif, Arial, sans-serif',
                                fontSize: '10px',
                                color: '#000000',
                                backgroundColor: '#c0c0c0',
                                border: 'none',
                                padding: '4px 8px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#000080';
                                e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#c0c0c0';
                    e.currentTarget.style.color = '#000000';
                }}
            >
                            Exit
            </button>
                    </div>
                )}
            </div>

            {/* Game Menu */}
            <div className="relative">
                <button
                    onClick={() => handleMenuClick('game')}
                    style={{
                        border: '2px outset #c0c0c0',
                        backgroundColor: activeMenu === 'game' ? '#000080' : '#c0c0c0',
                        color: activeMenu === 'game' ? '#ffffff' : '#000000',
                        fontFamily: 'MS Sans Serif, Arial, sans-serif',
                        fontSize: '10px',
                        fontWeight: 'normal',
                        padding: '1px 4px',
                        cursor: 'pointer'
                    }}
                >
                    <span style={{ textDecoration: 'underline' }}>G</span>ame
                </button>

                {activeMenu === 'game' && (
                    <div className="absolute top-full left-0 z-10" style={{
                        minWidth: '120px',
                        backgroundColor: '#c0c0c0'
                    }}>
                        <button
                            onClick={() => handleNewGame('beginner')}
                            className="w-full px-3 py-1 text-left"
                            style={{
                                fontFamily: 'MS Sans Serif, Arial, sans-serif',
                                fontSize: '10px',
                                color: currentDifficulty === 'beginner' ? '#ffffff' : '#000000',
                                backgroundColor: currentDifficulty === 'beginner' ? '#000080' : '#c0c0c0',
                                border: 'none',
                                padding: '4px 8px'
                            }}
                            onMouseEnter={(e) => {
                                if (currentDifficulty !== 'beginner') {
                                    e.currentTarget.style.backgroundColor = '#000080';
                                    e.currentTarget.style.color = '#ffffff';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (currentDifficulty !== 'beginner') {
                                    e.currentTarget.style.backgroundColor = '#c0c0c0';
                                    e.currentTarget.style.color = '#000000';
                                }
                            }}
                        >
                            Beginner
                        </button>
                        <button
                            onClick={() => handleNewGame('intermediate')}
                            className="w-full px-3 py-1 text-left"
                            style={{
                                fontFamily: 'MS Sans Serif, Arial, sans-serif',
                                fontSize: '10px',
                                color: currentDifficulty === 'intermediate' ? '#ffffff' : '#000000',
                                backgroundColor: currentDifficulty === 'intermediate' ? '#000080' : '#c0c0c0',
                                border: 'none',
                                padding: '4px 8px'
                            }}
                            onMouseEnter={(e) => {
                                if (currentDifficulty !== 'intermediate') {
                                    e.currentTarget.style.backgroundColor = '#000080';
                                    e.currentTarget.style.color = '#ffffff';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (currentDifficulty !== 'intermediate') {
                                    e.currentTarget.style.backgroundColor = '#c0c0c0';
                                    e.currentTarget.style.color = '#000000';
                                }
                            }}
                        >
                            Intermediate
                        </button>
                        <button
                            onClick={() => handleNewGame('expert')}
                            className="w-full px-3 py-1 text-left"
                            style={{
                                fontFamily: 'MS Sans Serif, Arial, sans-serif',
                                fontSize: '10px',
                                color: currentDifficulty === 'expert' ? '#ffffff' : '#000000',
                                backgroundColor: currentDifficulty === 'expert' ? '#000080' : '#c0c0c0',
                                border: 'none',
                                padding: '4px 8px'
                            }}
                            onMouseEnter={(e) => {
                                if (currentDifficulty !== 'expert') {
                                    e.currentTarget.style.backgroundColor = '#000080';
                                    e.currentTarget.style.color = '#ffffff';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (currentDifficulty !== 'expert') {
                                    e.currentTarget.style.backgroundColor = '#c0c0c0';
                                    e.currentTarget.style.color = '#000000';
                                }
                            }}
                        >
                            Expert
                        </button>
                    </div>
                )}
            </div>

            {/* Help Menu */}
            <div className="relative">
                <button
                    onClick={() => handleMenuClick('help')}
                    style={{
                        border: '2px outset #c0c0c0',
                        backgroundColor: activeMenu === 'help' ? '#000080' : '#c0c0c0',
                        color: activeMenu === 'help' ? '#ffffff' : '#000000',
                        fontFamily: 'MS Sans Serif, Arial, sans-serif',
                        fontSize: '10px',
                        fontWeight: 'normal',
                        padding: '1px 4px',
                        cursor: 'pointer'
                    }}
                >
                    <span style={{ textDecoration: 'underline' }}>H</span>elp
                </button>

                {activeMenu === 'help' && (
                    <div className="absolute top-full left-0 z-10" style={{
                        border: '1px solid #808080',
                        minWidth: '120px',
                        backgroundColor: '#c0c0c0'
                    }}>
                        <button
                            onClick={() => setActiveMenu(null)}
                            className="w-full px-3 py-1 text-left"
                            style={{
                                fontFamily: 'MS Sans Serif, Arial, sans-serif',
                                fontSize: '10px',
                                color: '#000000',
                                backgroundColor: '#c0c0c0',
                                border: 'none',
                                padding: '4px 8px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#000080';
                                e.currentTarget.style.color = '#ffffff';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#c0c0c0';
                                e.currentTarget.style.color = '#000000';
                            }}
                        >
                            How to Play
                        </button>
                        <button
                            onClick={() => setActiveMenu(null)}
                            className="w-full px-3 py-1 text-left"
                            style={{
                                fontFamily: 'MS Sans Serif, Arial, sans-serif',
                                fontSize: '10px',
                                color: '#000000',
                                backgroundColor: '#c0c0c0',
                                border: 'none',
                                padding: '4px 8px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#000080';
                                e.currentTarget.style.color = '#ffffff';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#c0c0c0';
                                e.currentTarget.style.color = '#000000';
                            }}
                        >
                            About Minesweeper
                        </button>
                </div>
            )}
            </div>
        </div>
    );
};
