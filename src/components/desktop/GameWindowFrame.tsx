'use client';

import React, { useState, useRef, useEffect } from 'react';
import { win95Theme } from '@/styles/theme';
import { GameWindow } from './types';

interface GameWindowFrameProps {
  window: GameWindow;
  isActive: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onUpdatePosition: (position: { x: number; y: number }) => void;
  onUpdateSize: (size: { width: number; height: number }) => void;
}

export default function GameWindowFrame({
  window,
  isActive,
  isMinimized,
  onClose,
  onMinimize,
  onFocus,
  onUpdatePosition
}: GameWindowFrameProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.title-bar')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - window.position.x,
        y: e.clientY - window.position.y
      });
      onFocus();
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = Math.max(0, e.clientX - dragOffset.x);
      const newY = Math.max(0, e.clientY - dragOffset.y);
      onUpdatePosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, onUpdatePosition]);

  if (isMinimized) return null;

  const Component = window.component;

  return (
    <div
      ref={windowRef}
      style={{
        position: 'absolute',
        left: `${window.position.x}px`,
        top: `${window.position.y}px`,
        width: `${window.size.width}px`,
        height: `${window.size.height}px`,
        backgroundColor: win95Theme.colors.background,
        ...win95Theme.borders.raised,
        zIndex: window.zIndex,
        display: 'flex',
        flexDirection: 'column',
        cursor: isDragging ? 'move' : 'default'
      }}
      onMouseDown={() => onFocus()}
    >
      <div
        className="title-bar"
        onMouseDown={handleMouseDown}
        style={{
          height: '20px',
          background: isActive 
            ? `linear-gradient(to right, ${win95Theme.colors.titleBar}, ${win95Theme.colors.titleBarGradientEnd})`
            : win95Theme.colors.backgroundDark,
          display: 'flex',
          alignItems: 'center',
          padding: '0 2px',
          cursor: 'move',
          userSelect: 'none'
        }}
      >
        <span style={{
          fontSize: '14px',
          marginRight: '4px'
        }}>{window.icon}</span>
        <span style={{
          flex: 1,
          fontFamily: win95Theme.fonts.system,
          fontSize: '11px',
          fontWeight: 'bold',
          color: isActive ? win95Theme.colors.textLight : win95Theme.colors.text
        }}>
          {window.title}
        </span>
        <button
          onClick={onMinimize}
          style={{
            width: '16px',
            height: '14px',
            backgroundColor: win95Theme.colors.background,
            ...win95Theme.borders.raised,
            fontFamily: win95Theme.fonts.system,
            fontSize: '10px',
            fontWeight: 'bold',
            padding: '0',
            marginRight: '2px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: '1'
          }}
        >
          _
        </button>
        <button
          style={{
            width: '16px',
            height: '14px',
            backgroundColor: win95Theme.colors.background,
            ...win95Theme.borders.raised,
            fontFamily: win95Theme.fonts.system,
            fontSize: '10px',
            fontWeight: 'bold',
            padding: '0',
            marginRight: '2px',
            cursor: 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: '1',
            opacity: 0.5
          }}
          disabled
        >
          □
        </button>
        <button
          onClick={onClose}
          style={{
            width: '16px',
            height: '14px',
            backgroundColor: win95Theme.colors.background,
            ...win95Theme.borders.raised,
            fontFamily: win95Theme.fonts.system,
            fontSize: '10px',
            fontWeight: 'bold',
            padding: '0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: '1'
          }}
        >
          ✕
        </button>
      </div>
      <div style={{
        flex: 1,
        overflow: 'auto',
        backgroundColor: win95Theme.colors.background
      }}>
        <Component isActive={isActive} />
      </div>
    </div>
  );
}