'use client';

import React, { useState } from 'react';
import { Windows95Dialog } from './Windows95Dialog';
import { CustomGameDialog } from './CustomGameDialog';

interface WindowsMenuProps {
    onNewGame: (difficulty: 'beginner' | 'intermediate' | 'expert') => void;
    onCustomGame?: (rows: number, cols: number, mines: number) => void;
    onResetGame: () => void;
    currentDifficulty: 'beginner' | 'intermediate' | 'expert';
    allowQuestionMarks: boolean;
    onToggleQuestionMarks: () => void;
}

export const WindowsMenu: React.FC<WindowsMenuProps> = ({
    onNewGame,
    onCustomGame,
    onResetGame,
    currentDifficulty,
    allowQuestionMarks,
    onToggleQuestionMarks
}) => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [dialogState, setDialogState] = useState<{
        isOpen: boolean;
        difficulty: 'beginner' | 'intermediate' | 'expert' | null;
    }>({ isOpen: false, difficulty: null });
    const [customDialogOpen, setCustomDialogOpen] = useState(false);

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

    const handleDifficultyClick = (difficulty: 'beginner' | 'intermediate' | 'expert') => {
        if (currentDifficulty !== difficulty) {
            setDialogState({ isOpen: true, difficulty });
        } else {
            handleNewGame(difficulty);
        }
        setActiveMenu(null);
    };

    const handleConfirmNewGame = () => {
        if (dialogState.difficulty) {
            handleNewGame(dialogState.difficulty);
        }
        setDialogState({ isOpen: false, difficulty: null });
    };

    const handleCancelNewGame = () => {
        setDialogState({ isOpen: false, difficulty: null });
    };

    const handleCustomGameConfirm = (rows: number, cols: number, mines: number) => {
        if (onCustomGame) {
            onCustomGame(rows, cols, mines);
        }
        setCustomDialogOpen(false);
    };

    const handleCustomGameCancel = () => {
        setCustomDialogOpen(false);
    };

    return (
        <>
            <div className="flex">
            {/* File Menu */}
        <div className="relative">
                <button
                    onClick={() => handleMenuClick('file')}
                    style={{
                        border: 'none',
                        backgroundColor: activeMenu === 'file' ? '#000080' : '#c0c0c0',
                        color: activeMenu === 'file' ? '#ffffff' : '#000000',
                        fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                        fontSize: '11px',
                        fontWeight: '400',
                        padding: '2px 8px',
                        cursor: 'pointer'
                    }}
                >
                    <span style={{ textDecoration: 'underline' }}>F</span>ile
                </button>

                {activeMenu === 'file' && (
                    <div className="absolute top-full left-0 z-10" style={{
                        minWidth: '150px',
                        backgroundColor: '#c0c0c0',
                        border: '1px solid #808080',
                        padding: '2px'
                    }}>
                        <button
                            onClick={handleResetGame}
                            className="w-full text-left"
                            style={{
                                fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                                fontSize: '11px',
                                color: '#000000',
                                backgroundColor: '#c0c0c0',
                                border: 'none',
                                padding: '2px 8px',
                                display: 'block',
                                width: '100%'
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
                            borderTop: '1px solid #808080',
                            borderBottom: '1px solid #ffffff',
                            margin: '2px 2px'
                        }}></div>
                        <button
                            onClick={() => setActiveMenu(null)}
                            className="w-full text-left"
                            style={{
                                fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                                fontSize: '11px',
                                color: '#000000',
                                backgroundColor: '#c0c0c0',
                                border: 'none',
                                padding: '2px 8px',
                                display: 'block',
                                width: '100%'
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
                        border: 'none',
                        backgroundColor: activeMenu === 'game' ? '#000080' : '#c0c0c0',
                        color: activeMenu === 'game' ? '#ffffff' : '#000000',
                        fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                        fontSize: '11px',
                        fontWeight: '400',
                        padding: '2px 8px',
                        cursor: 'pointer'
                    }}
                >
                    <span style={{ textDecoration: 'underline' }}>G</span>ame
                </button>

                {activeMenu === 'game' && (
                    <div className="absolute top-full left-0 z-10" style={{
                        minWidth: '200px',
                        backgroundColor: '#c0c0c0',
                        border: '1px solid #808080',
                        padding: '2px'
                    }}>
                        <button
                            onClick={() => handleDifficultyClick('beginner')}
                            className="w-full text-left"
                            style={{
                                fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                                fontSize: '11px',
                                color: '#000000',
                                backgroundColor: '#c0c0c0',
                                border: 'none',
                                padding: '2px 8px',
                                display: 'block',
                                width: '100%'
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
                            <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <span>Beginner</span>
                                <span style={{ color: '#808080', marginLeft: '16px' }}>9×9 (10)</span>
                            </span>
                        </button>
                        <button
                            onClick={() => handleDifficultyClick('intermediate')}
                            className="w-full text-left"
                            style={{
                                fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                                fontSize: '11px',
                                color: '#000000',
                                backgroundColor: '#c0c0c0',
                                border: 'none',
                                padding: '2px 8px',
                                display: 'block',
                                width: '100%'
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
                            <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <span>Intermediate</span>
                                <span style={{ color: '#808080', marginLeft: '16px' }}>16×16 (40)</span>
                            </span>
                        </button>
                        <button
                            onClick={() => handleDifficultyClick('expert')}
                            className="w-full text-left"
                            style={{
                                fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                                fontSize: '11px',
                                color: '#000000',
                                backgroundColor: '#c0c0c0',
                                border: 'none',
                                padding: '2px 8px',
                                display: 'block',
                                width: '100%'
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
                            <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <span>Expert</span>
                                <span style={{ color: '#808080', marginLeft: '16px' }}>16×30 (99)</span>
                            </span>
                        </button>
                        <div style={{
                            borderTop: '1px solid #808080',
                            borderBottom: '1px solid #ffffff',
                            margin: '2px 2px'
                        }}></div>
                        <button
                            onClick={() => {
                                setCustomDialogOpen(true);
                                setActiveMenu(null);
                            }}
                            className="w-full text-left"
                            style={{
                                fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                                fontSize: '11px',
                                color: '#000000',
                                backgroundColor: '#c0c0c0',
                                border: 'none',
                                padding: '2px 8px',
                                display: 'block',
                                width: '100%'
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
                            Custom...
                        </button>
                        <div style={{
                            borderTop: '1px solid #808080',
                            borderBottom: '1px solid #ffffff',
                            margin: '2px 2px'
                        }}></div>
                        <button
                            onClick={() => {
                                onToggleQuestionMarks();
                                setActiveMenu(null);
                            }}
                            className="w-full text-left"
                            style={{
                                fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                                fontSize: '11px',
                                color: '#000000',
                                backgroundColor: '#c0c0c0',
                                border: 'none',
                                padding: '2px 8px',
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%'
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
                            <span style={{ marginRight: '8px' }}>
                                {allowQuestionMarks ? '✓' : ' '}
                            </span>
                            Marks (?)
                        </button>
                    </div>
                )}
            </div>

            {/* Help Menu */}
            <div className="relative">
                <button
                    onClick={() => handleMenuClick('help')}
                    style={{
                        border: 'none',
                        backgroundColor: activeMenu === 'help' ? '#000080' : '#c0c0c0',
                        color: activeMenu === 'help' ? '#ffffff' : '#000000',
                        fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                        fontSize: '11px',
                        fontWeight: '400',
                        padding: '2px 8px',
                        cursor: 'pointer'
                    }}
                >
                    <span style={{ textDecoration: 'underline' }}>H</span>elp
                </button>

                {activeMenu === 'help' && (
                    <div className="absolute top-full left-0 z-10" style={{
                        minWidth: '180px',
                        backgroundColor: '#c0c0c0',
                        border: '1px solid #808080',
                        padding: '2px'
                    }}>
                        <button
                            onClick={() => setActiveMenu(null)}
                            className="w-full text-left"
                            style={{
                                fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                                fontSize: '11px',
                                color: '#000000',
                                backgroundColor: '#c0c0c0',
                                border: 'none',
                                padding: '2px 8px',
                                display: 'block',
                                width: '100%'
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
                            className="w-full text-left"
                            style={{
                                fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                                fontSize: '11px',
                                color: '#000000',
                                backgroundColor: '#c0c0c0',
                                border: 'none',
                                padding: '2px 8px',
                                display: 'block',
                                width: '100%'
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

            {/* Windows 95 Style Dialog */}
            <Windows95Dialog
                isOpen={dialogState.isOpen}
                title="Minesweeper"
                message="Start a new game? Current progress will be lost."
                onConfirm={handleConfirmNewGame}
                onCancel={handleCancelNewGame}
                type="warning"
            />

            {/* Custom Game Dialog */}
            <CustomGameDialog
                isOpen={customDialogOpen}
                onConfirm={handleCustomGameConfirm}
                onCancel={handleCustomGameCancel}
            />
        </>
    );
};
