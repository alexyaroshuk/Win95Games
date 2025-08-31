'use client';

import React from 'react';

interface Windows95DialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    type?: 'warning' | 'error' | 'info';
}

export const Windows95Dialog: React.FC<Windows95DialogProps> = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    type = 'warning'
}) => {
    if (!isOpen) return null;

    const getIcon = () => {
        if (type === 'warning') {
            return (
                <div style={{
                    width: '32px',
                    height: '32px',
                    marginRight: '12px',
                    position: 'relative',
                    flexShrink: 0
                }}>
                    {/* Yellow triangle with exclamation */}
                    <div style={{
                        width: '0',
                        height: '0',
                        borderLeft: '16px solid transparent',
                        borderRight: '16px solid transparent',
                        borderBottom: '28px solid #FFD700',
                        position: 'absolute',
                        top: '2px'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        top: '8px',
                        left: '14px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#000000'
                    }}>!</div>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            {/* Overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'transparent',
                zIndex: 999,
                pointerEvents: 'none'
            }} />
            
            {/* Dialog */}
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1000,
                backgroundColor: '#c0c0c0',
                border: '2px solid',
                borderTopColor: '#ffffff',
                borderLeftColor: '#ffffff',
                borderRightColor: '#808080',
                borderBottomColor: '#808080',
                padding: '2px',
                minWidth: '300px',
                boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
                {/* Title Bar */}
                <div style={{
                    backgroundColor: '#000080',
                    color: '#ffffff',
                    padding: '2px 4px',
                    fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <span>{title}</span>
                    <button
                        onClick={onCancel}
                        style={{
                            width: '16px',
                            height: '14px',
                            backgroundColor: '#c0c0c0',
                            border: '2px solid',
                            borderTopColor: '#ffffff',
                            borderLeftColor: '#ffffff',
                            borderRightColor: '#808080',
                            borderBottomColor: '#808080',
                            fontSize: '10px',
                            lineHeight: '10px',
                            padding: '0',
                            cursor: 'pointer',
                            fontFamily: 'Arial, sans-serif',
                            fontWeight: 'bold'
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div style={{
                    padding: '16px',
                    fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    {getIcon()}
                    <div style={{ flex: 1 }}>
                        {message}
                    </div>
                </div>

                {/* Buttons */}
                <div style={{
                    padding: '8px 16px 16px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px'
                }}>
                    <button
                        onClick={onConfirm}
                        style={{
                            minWidth: '75px',
                            padding: '6px 16px',
                            backgroundColor: '#c0c0c0',
                            border: '2px solid',
                            borderTopColor: '#ffffff',
                            borderLeftColor: '#ffffff',
                            borderRightColor: '#808080',
                            borderBottomColor: '#808080',
                            fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                            fontSize: '11px',
                            cursor: 'pointer'
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.borderTopColor = '#808080';
                            e.currentTarget.style.borderLeftColor = '#808080';
                            e.currentTarget.style.borderRightColor = '#ffffff';
                            e.currentTarget.style.borderBottomColor = '#ffffff';
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.borderTopColor = '#ffffff';
                            e.currentTarget.style.borderLeftColor = '#ffffff';
                            e.currentTarget.style.borderRightColor = '#808080';
                            e.currentTarget.style.borderBottomColor = '#808080';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderTopColor = '#ffffff';
                            e.currentTarget.style.borderLeftColor = '#ffffff';
                            e.currentTarget.style.borderRightColor = '#808080';
                            e.currentTarget.style.borderBottomColor = '#808080';
                        }}
                    >
                        OK
                    </button>
                    <button
                        onClick={onCancel}
                        style={{
                            minWidth: '75px',
                            padding: '6px 16px',
                            backgroundColor: '#c0c0c0',
                            border: '2px solid',
                            borderTopColor: '#ffffff',
                            borderLeftColor: '#ffffff',
                            borderRightColor: '#808080',
                            borderBottomColor: '#808080',
                            fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                            fontSize: '11px',
                            cursor: 'pointer'
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.borderTopColor = '#808080';
                            e.currentTarget.style.borderLeftColor = '#808080';
                            e.currentTarget.style.borderRightColor = '#ffffff';
                            e.currentTarget.style.borderBottomColor = '#ffffff';
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.borderTopColor = '#ffffff';
                            e.currentTarget.style.borderLeftColor = '#ffffff';
                            e.currentTarget.style.borderRightColor = '#808080';
                            e.currentTarget.style.borderBottomColor = '#808080';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderTopColor = '#ffffff';
                            e.currentTarget.style.borderLeftColor = '#ffffff';
                            e.currentTarget.style.borderRightColor = '#808080';
                            e.currentTarget.style.borderBottomColor = '#808080';
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
};