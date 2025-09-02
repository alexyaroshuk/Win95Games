'use client';

import React, { useState } from 'react';
import { win95Theme } from '@/styles/theme';

interface DesktopShortcutProps {
  id: string;
  title: string;
  icon: string;
  onDoubleClick: () => void;
}

export default function DesktopShortcut({ title, icon, onDoubleClick }: DesktopShortcutProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(true);
  };

  const handleBlur = () => {
    setIsSelected(false);
  };

  return (
    <div
      tabIndex={0}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      onBlur={handleBlur}
      style={{
        width: '75px',
        height: '75px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        cursor: 'pointer',
        padding: '4px',
        borderRadius: '0',
        backgroundColor: isSelected ? 'rgba(0, 0, 128, 0.3)' : 'transparent',
        border: isSelected ? '1px dotted #ffffff' : '1px solid transparent',
        userSelect: 'none'
      }}
    >
      <div style={{
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
        backgroundColor: win95Theme.colors.background,
        ...win95Theme.borders.raised,
        padding: '2px'
      }}>
        {icon}
      </div>
      <span style={{
        fontFamily: win95Theme.fonts.system,
        fontSize: '11px',
        color: '#ffffff',
        textAlign: 'center',
        textShadow: '1px 1px 1px rgba(0, 0, 0, 0.8)',
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        backgroundColor: isSelected ? 'rgba(0, 0, 128, 0.8)' : 'transparent',
        padding: '1px 2px'
      }}>
        {title}
      </span>
    </div>
  );
}