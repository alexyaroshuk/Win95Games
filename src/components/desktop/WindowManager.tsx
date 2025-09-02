'use client';

import React from 'react';
import GameWindowFrame from './GameWindowFrame';
import { GameWindow } from './types';

interface WindowManagerProps {
  windows: GameWindow[];
  activeWindowId: string | null;
  minimizedWindows: Set<string>;
  maximizedWindows: Set<string>;
  onClose: (windowId: string) => void;
  onMinimize: (windowId: string) => void;
  onMaximize: (windowId: string) => void;
  onFocus: (windowId: string) => void;
  onUpdatePosition: (windowId: string, position: { x: number; y: number }) => void;
  onUpdateSize: (windowId: string, size: { width: number; height: number }) => void;
}

export default function WindowManager({
  windows,
  activeWindowId,
  minimizedWindows,
  maximizedWindows,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onUpdatePosition,
  onUpdateSize
}: WindowManagerProps) {
  return (
    <>
      {windows.map(window => (
        <GameWindowFrame
          key={window.id}
          window={window}
          isActive={activeWindowId === window.id}
          isMinimized={minimizedWindows.has(window.id)}
          isMaximized={maximizedWindows.has(window.id)}
          onClose={() => onClose(window.id)}
          onMinimize={() => onMinimize(window.id)}
          onMaximize={() => onMaximize(window.id)}
          onFocus={() => onFocus(window.id)}
          onUpdatePosition={(pos) => onUpdatePosition(window.id, pos)}
          onUpdateSize={(size) => onUpdateSize(window.id, size)}
        />
      ))}
    </>
  );
}