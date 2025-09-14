'use client';

import React, { useState, useEffect } from 'react';
import { win95Theme } from '@/styles/theme';
import { GameWindow } from './types';

interface TaskbarProps {
  windows: GameWindow[];
  activeWindowId: string | null;
  minimizedWindows: Set<string>;
  onWindowClick: (windowId: string) => void;
  onStartClick: () => void;
  isStartMenuOpen: boolean;
}

export default function Taskbar({ windows, activeWindowId, minimizedWindows, onWindowClick, onStartClick, isStartMenuOpen }: TaskbarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '28px',
      backgroundColor: win95Theme.colors.background,
      ...win95Theme.borders.raised,
      display: 'flex',
      alignItems: 'center',
      padding: '2px',
      gap: '2px'
    }}>
      <button
        onClick={onStartClick}
        style={{
          height: '22px',
          minWidth: '54px',
          backgroundColor: win95Theme.colors.background,
          ...(isStartMenuOpen ? win95Theme.borders.inset : win95Theme.borders.raised),
          fontFamily: win95Theme.fonts.system,
          fontSize: '11px',
          fontWeight: 'bold',
          padding: '0 4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
        <span style={{ fontSize: '14px' }}>⊞</span>
        Start
      </button>

      <div style={{
        flex: 1,
        display: 'flex',
        gap: '2px',
        paddingLeft: '4px'
      }}>
        {windows.map(window => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            style={{
              height: '22px',
              minWidth: '140px',
              maxWidth: '160px',
              backgroundColor: win95Theme.colors.background,
              ...(activeWindowId === window.id && !minimizedWindows.has(window.id) 
                ? win95Theme.borders.inset 
                : win95Theme.borders.raised),
              fontFamily: win95Theme.fonts.system,
              fontSize: '11px',
              padding: '0 4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              overflow: 'hidden'
            }}
          >
            <span style={{ fontSize: '14px' }}>{window.icon}</span>
            <span style={{ 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap',
              fontWeight: activeWindowId === window.id && !minimizedWindows.has(window.id) ? 'bold' : 'normal'
            }}>
              {window.title}
            </span>
          </button>
        ))}
      </div>

      <div style={{
        height: '22px',
        minWidth: '60px',
        backgroundColor: win95Theme.colors.background,
        ...win95Theme.borders.inset,
        fontFamily: win95Theme.fonts.system,
        fontSize: '11px',
        padding: '0 4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {formatTime(currentTime)}
      </div>
    </div>
  );
}