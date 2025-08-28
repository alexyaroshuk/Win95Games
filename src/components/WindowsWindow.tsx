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
        <div className="inline-block font-windows">
            {/* Window Container */}
            <div className="bg-gray-300">
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
                            padding: '2px 2px'
                        }}>
                            {/* Minesweeper Icon - Mine/Bomb */}
                            <div style={{
                                width: '16px',
                                height: '16px',
                                marginRight: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px'
                            }}>
                                💣
                            </div>
                            <span style={{
                                fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                                fontSize: '11px',
                                fontWeight: '600',
                                color: '#ffffff',
                                letterSpacing: '0px',
                                textShadow: '1px 1px 0px rgba(0,0,0,0.5)'
                            }}>Minesweeper</span>
                        </div>

                        {/* Control Buttons - Classic Windows 95 Style */}
                        <div className="flex" style={{
                            padding: '2px 2px 2px 0',
                            gap: '2px'
                        }}>
                            {/* Minimize Button */}
                            <button
                                onClick={onMinimize}
                                style={{
                                    width: '16px',
                                    height: '14px',
                                    border: '1px solid',
                                    borderTopColor: '#ffffff',
                                    borderLeftColor: '#ffffff',
                                    borderRightColor: '#000000',
                                    borderBottomColor: '#000000',
                                    backgroundColor: '#c0c0c0',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    padding: '0 0 2px 0',
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    lineHeight: '1'
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.borderTopColor = '#000000';
                                    e.currentTarget.style.borderLeftColor = '#000000';
                                    e.currentTarget.style.borderRightColor = '#ffffff';
                                    e.currentTarget.style.borderBottomColor = '#ffffff';
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.borderTopColor = '#ffffff';
                                    e.currentTarget.style.borderLeftColor = '#ffffff';
                                    e.currentTarget.style.borderRightColor = '#000000';
                                    e.currentTarget.style.borderBottomColor = '#000000';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderTopColor = '#ffffff';
                                    e.currentTarget.style.borderLeftColor = '#ffffff';
                                    e.currentTarget.style.borderRightColor = '#000000';
                                    e.currentTarget.style.borderBottomColor = '#000000';
                                }}
                            >
                                _
                            </button>

                            {/* Maximize Button */}
                            <button
                                onClick={onMaximize}
                                style={{
                                    width: '16px',
                                    height: '14px',
                                    border: '1px solid',
                                    borderTopColor: '#ffffff',
                                    borderLeftColor: '#ffffff',
                                    borderRightColor: '#000000',
                                    borderBottomColor: '#000000',
                                    backgroundColor: '#c0c0c0',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '0',
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    lineHeight: '1'
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.borderTopColor = '#000000';
                                    e.currentTarget.style.borderLeftColor = '#000000';
                                    e.currentTarget.style.borderRightColor = '#ffffff';
                                    e.currentTarget.style.borderBottomColor = '#ffffff';
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.borderTopColor = '#ffffff';
                                    e.currentTarget.style.borderLeftColor = '#ffffff';
                                    e.currentTarget.style.borderRightColor = '#000000';
                                    e.currentTarget.style.borderBottomColor = '#000000';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderTopColor = '#ffffff';
                                    e.currentTarget.style.borderLeftColor = '#ffffff';
                                    e.currentTarget.style.borderRightColor = '#000000';
                                    e.currentTarget.style.borderBottomColor = '#000000';
                                }}
                            >
                                □
                            </button>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                style={{
                                    width: '16px',
                                    height: '14px',
                                    border: '1px solid',
                                    borderTopColor: '#ffffff',
                                    borderLeftColor: '#ffffff',
                                    borderRightColor: '#000000',
                                    borderBottomColor: '#000000',
                                    backgroundColor: '#c0c0c0',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '0',
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    lineHeight: '1'
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.borderTopColor = '#000000';
                                    e.currentTarget.style.borderLeftColor = '#000000';
                                    e.currentTarget.style.borderRightColor = '#ffffff';
                                    e.currentTarget.style.borderBottomColor = '#ffffff';
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.borderTopColor = '#ffffff';
                                    e.currentTarget.style.borderLeftColor = '#ffffff';
                                    e.currentTarget.style.borderRightColor = '#000000';
                                    e.currentTarget.style.borderBottomColor = '#000000';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderTopColor = '#ffffff';
                                    e.currentTarget.style.borderLeftColor = '#ffffff';
                                    e.currentTarget.style.borderRightColor = '#000000';
                                    e.currentTarget.style.borderBottomColor = '#000000';
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menu Bar - Classic Windows 95 Style */}
                {menuBar && (
                    <div style={{
                        backgroundColor: '#c0c0c0',
                        minHeight: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0',
                        fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                        fontSize: '11px'
                    }}>
                        {menuBar}
                    </div>
                )}

                {/* Window Content */}
                <div style={{
                    backgroundColor: '#c0c0c0',
                    padding: '4px'
                }}>
                    {children}
                </div>
            </div>
        </div>
    );
};
