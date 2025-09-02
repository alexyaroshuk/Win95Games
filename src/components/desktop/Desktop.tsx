'use client';

import React, { useState, useCallback } from 'react';
import { win95Theme } from '@/styles/theme';
import Taskbar from './Taskbar';
import DesktopShortcut from './DesktopShortcut';
import WindowManager from './WindowManager';
import { GameWindow } from './types';

interface DesktopProps {
  games: Array<{
    id: string;
    title: string;
    icon: string;
    component: React.ComponentType<any>;
  }>;
}

export default function Desktop({ games }: DesktopProps) {
  const [openWindows, setOpenWindows] = useState<GameWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [minimizedWindows, setMinimizedWindows] = useState<Set<string>>(new Set());

  const openWindow = useCallback((gameId: string) => {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    const existingWindow = openWindows.find(w => w.id === gameId);
    if (existingWindow) {
      if (minimizedWindows.has(gameId)) {
        setMinimizedWindows(prev => {
          const next = new Set(prev);
          next.delete(gameId);
          return next;
        });
      }
      setActiveWindowId(gameId);
      return;
    }

    const newWindow: GameWindow = {
      id: gameId,
      title: game.title,
      icon: game.icon,
      component: game.component,
      position: {
        x: 50 + openWindows.length * 30,
        y: 50 + openWindows.length * 30
      },
      size: {
        width: 800,
        height: 600
      },
      zIndex: openWindows.length + 1
    };

    setOpenWindows(prev => [...prev, newWindow]);
    setActiveWindowId(gameId);
  }, [games, openWindows, minimizedWindows]);

  const closeWindow = useCallback((windowId: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== windowId));
    if (activeWindowId === windowId) {
      setActiveWindowId(null);
    }
    setMinimizedWindows(prev => {
      const next = new Set(prev);
      next.delete(windowId);
      return next;
    });
  }, [activeWindowId]);

  const minimizeWindow = useCallback((windowId: string) => {
    setMinimizedWindows(prev => new Set(prev).add(windowId));
    if (activeWindowId === windowId) {
      setActiveWindowId(null);
    }
  }, [activeWindowId]);

  const restoreWindow = useCallback((windowId: string) => {
    setMinimizedWindows(prev => {
      const next = new Set(prev);
      next.delete(windowId);
      return next;
    });
    setActiveWindowId(windowId);
  }, []);

  const focusWindow = useCallback((windowId: string) => {
    setActiveWindowId(windowId);
    setOpenWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex));
      return prev.map(w => ({
        ...w,
        zIndex: w.id === windowId ? maxZ + 1 : w.zIndex
      }));
    });
  }, []);

  const updateWindowPosition = useCallback((windowId: string, position: { x: number; y: number }) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, position } : w
    ));
  }, []);

  const updateWindowSize = useCallback((windowId: string, size: { width: number; height: number }) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, size } : w
    ));
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#008080',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: win95Theme.fonts.system
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: '28px',
        padding: '10px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 75px)',
        gridTemplateRows: 'repeat(auto-fill, 75px)',
        gap: '15px',
        alignContent: 'start'
      }}>
        {games.map(game => (
          <DesktopShortcut
            key={game.id}
            id={game.id}
            title={game.title}
            icon={game.icon}
            onDoubleClick={() => openWindow(game.id)}
          />
        ))}
      </div>

      <WindowManager
        windows={openWindows}
        activeWindowId={activeWindowId}
        minimizedWindows={minimizedWindows}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onFocus={focusWindow}
        onUpdatePosition={updateWindowPosition}
        onUpdateSize={updateWindowSize}
      />

      <Taskbar
        windows={openWindows}
        activeWindowId={activeWindowId}
        minimizedWindows={minimizedWindows}
        onWindowClick={restoreWindow}
      />
    </div>
  );
}