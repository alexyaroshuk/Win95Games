'use client';

import React from 'react';

interface GameControlsProps {
    onNewGame: (difficulty: 'beginner' | 'intermediate' | 'expert') => void;
    onResetGame: () => void;
    currentDifficulty: 'beginner' | 'intermediate' | 'expert';
}

export const GameControls: React.FC<GameControlsProps> = ({
    onNewGame,
    onResetGame,
    currentDifficulty
}) => {
    const difficulties = [
        { key: 'beginner', label: 'Beginner' },
        { key: 'intermediate', label: 'Intermediate' },
        { key: 'expert', label: 'Expert' }
    ] as const;

    return (
        <div className="mt-2 text-center">
            <div className="inline-flex bg-gray-300 p-1" style={{ border: '1px inset #c0c0c0' }}>
                {difficulties.map((difficulty) => (
                    <button
                        key={difficulty.key}
                        onClick={() => onNewGame(difficulty.key)}
                        className={`px-2 py-1 text-xs font-bold ${currentDifficulty === difficulty.key
                                ? 'bg-gray-500 text-white'
                                : 'bg-gray-300 text-black hover:bg-gray-400'
                            }`}
                        style={{
                            border: currentDifficulty === difficulty.key
                                ? '1px inset #c0c0c0'
                                : '1px outset #c0c0c0',
                            marginRight: difficulty.key !== 'expert' ? '1px' : '0'
                        }}
                    >
                        {difficulty.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
