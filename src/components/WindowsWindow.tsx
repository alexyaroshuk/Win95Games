'use client';

import React from 'react';

interface WindowsWindowProps {
    title: string;
    children: React.ReactNode;
    menuBar?: React.ReactNode;
    onClose?: () => void;
    onMinimize?: () => void;
    onMaximize?: () => void;
}

export const WindowsWindow: React.FC<WindowsWindowProps> = ({
    title,
    children,
    menuBar,
    onClose,
    onMinimize,
    onMaximize
}) => {
    return (
        <div className="inline-block" style={{
            fontFamily: 'MS Sans Serif, Arial, sans-serif'
        }}>
            {/* Window Container */}
            <div className="bg-gray-300" style={{
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
                {/* Title Bar - Classic Windows 95 Navy */}
                <div style={{
                    backgroundColor: '#000080',
                    background: 'linear-gradient(to bottom, #000080 0%, #0000a0 100%)',
                    minHeight: '20px'
                }}>
                    {/* App Bar Container - No Padding */}
                    <div className="text-white flex items-center justify-between" style={{
                        padding: '0'
                    }}>
                        {/* Window Title */}
                        <div className="flex items-center" style={{
                            padding: '1px 12px'
                        }}>
                            <span className="font-bold text-sm" style={{
                                fontFamily: 'MS Sans Serif, Arial, sans-serif',
                                color: '#ffffff',
                                textShadow: '1px 1px 0px #000000',
                                letterSpacing: '0.5px'
                            }}>Minesweeper</span>
                        </div>

                        {/* Control Buttons - Classic Windows 95 Style */}
                        <div className="flex space-x-1" style={{
                            padding: '1px 0px',
                            flex: '1',
                            justifyContent: 'flex-end'
                        }}>
                            {/* Minimize Button */}
                            <button
                                onClick={onMinimize}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    border: '2px outset #c0c0c0',
                                    backgroundColor: '#c0c0c0',
                                    fontFamily: 'MS Sans Serif, Arial, sans-serif',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '0',
                                    margin: '0',
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.border = '2px inset #c0c0c0';
                                    e.currentTarget.style.backgroundColor = '#a0a0a0';
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.border = '2px outset #c0c0c0';
                                    e.currentTarget.style.backgroundColor = '#c0c0c0';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.border = '2px outset #c0c0c0';
                                    e.currentTarget.style.backgroundColor = '#c0c0c0';
                                }}
                            >
                                <span style={{ color: '#000000', lineHeight: '1' }}>_</span>
                            </button>

                            {/* Maximize Button */}
                            <button
                                onClick={onMaximize}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    border: '2px outset #c0c0c0',
                                    backgroundColor: '#c0c0c0',
                                    fontFamily: 'MS Sans Serif, Arial, sans-serif',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '0',
                                    margin: '0',
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.border = '2px inset #c0c0c0';
                                    e.currentTarget.style.backgroundColor = '#a0a0a0';
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.border = '2px outset #c0c0c0';
                                    e.currentTarget.style.backgroundColor = '#c0c0c0';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.border = '2px outset #c0c0c0';
                                    e.currentTarget.style.backgroundColor = '#c0c0c0';
                                }}
                            >
                                <span style={{ color: '#000000', lineHeight: '1' }}>□</span>
                            </button>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    border: '2px outset #c0c0c0',
                                    backgroundColor: '#c0c0c0',
                                    fontFamily: 'MS Sans Serif, Arial, sans-serif',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '0',
                                    margin: '0',
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.border = '2px inset #c0c0c0';
                                    e.currentTarget.style.backgroundColor = '#a0a0a0';
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.border = '2px outset #c0c0c0';
                                    e.currentTarget.style.backgroundColor = '#c0c0c0';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.border = '2px outset #c0c0c0';
                                    e.currentTarget.style.backgroundColor = '#c0c0c0';
                                }}
                            >
                                <span style={{ color: '#000000', lineHeight: '1' }}>×</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menu Bar - Classic Windows 95 Style */}
                {menuBar && (
                    <div style={{
                        borderBottom: '2px outset #c0c0c0',
                        backgroundColor: '#c0c0c0',
                        minHeight: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0',
                        fontFamily: 'MS Sans Serif, Arial, sans-serif',
                        fontSize: '10px'
                    }}>
                        {menuBar}
                    </div>
                )}

                {/* Window Content */}
                <div style={{
                    backgroundColor: '#c0c0c0',
                    padding: '16px'
                }}>
                    {children}
                </div>
            </div>
        </div>
    );
};
