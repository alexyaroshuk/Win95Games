'use client';

import React, { useState, useCallback } from 'react';
import { createButtonStyle } from '@/styles/theme';

interface Win95ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'icon';
}

export const Win95Button: React.FC<Win95ButtonProps> = React.memo(({
  children,
  variant = 'default',
  onClick,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsPressed(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPressed(false);
  }, []);

  const buttonStyle = {
    ...createButtonStyle(isPressed),
    padding: variant === 'icon' ? '0' : '2px 8px',
    fontSize: variant === 'icon' ? '16px' : '11px',
    fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <button
      {...props}
      style={buttonStyle}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
});

Win95Button.displayName = 'Win95Button';