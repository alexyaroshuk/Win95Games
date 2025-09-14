'use client';

import React, { useState, useRef, useEffect } from 'react';
import { win95Theme } from '@/styles/theme';

interface MenuItem {
  label: string;
  icon?: string;
  action?: () => void;
  submenu?: MenuItem[];
  separator?: boolean;
}

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGame: (game: string) => void;
  onOpenAbout?: () => void;
}

export default function StartMenu({ isOpen, onClose, onOpenGame, onOpenAbout }: StartMenuProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    {
      label: 'Programs',
      icon: '📁',
      submenu: [
        {
          label: 'Games',
          icon: '🎮',
          submenu: [
            { label: 'Minesweeper', icon: '💣', action: () => onOpenGame('minesweeper') },
            { label: 'Tetris', icon: '🧱', action: () => onOpenGame('tetris') },
            { label: 'Snake', icon: '🐍', action: () => onOpenGame('snake') },
            { label: 'Arkanoid', icon: '🎾', action: () => onOpenGame('arkanoid') },
            { label: '2048', icon: '🔢', action: () => onOpenGame('2048') },
            { label: 'Pong', icon: '🏓', action: () => onOpenGame('pong') }
          ]
        },
        {
          label: 'Accessories',
          icon: '🛠️',
          submenu: [
            { label: 'Notepad', icon: '📝' },
            { label: 'Calculator', icon: '🧮' },
            { label: 'Paint', icon: '🎨' }
          ]
        }
      ]
    },
    {
      label: 'Documents',
      icon: '📄',
      submenu: []
    },
    {
      label: 'Settings',
      icon: '⚙️',
      submenu: [
        { label: 'Control Panel', icon: '🎛️' },
        { label: 'Display', icon: '🖥️' }
      ]
    },
    {
      label: 'Find',
      icon: '🔍',
      submenu: [
        { label: 'Files or Folders...', icon: '📁' },
        { label: 'Computer...', icon: '💻' }
      ]
    },
    {
      label: 'Help',
      icon: '❓'
    },
    {
      label: 'Run...',
      icon: '▶️'
    },
    { separator: true },
    {
      label: 'About',
      icon: 'ℹ️',
      action: () => onOpenAbout && onOpenAbout()
    },
    { separator: true },
    {
      label: 'Shut Down...',
      icon: '⏻'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.action) {
      item.action();
      onClose();
    }
  };

  const handleMouseEnter = (label: string) => {
    setActiveSubmenu(label);
  };

  const renderMenuItem = (item: MenuItem, index: number) => {
    if (item.separator) {
      return (
        <div
          key={index}
          style={{
            borderTop: '1px solid #808080',
            borderBottom: '1px solid #ffffff',
            margin: '3px 2px',
            height: '0px'
          }}
        />
      );
    }

    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isActive = activeSubmenu === item.label;

    return (
      <div
        key={index}
        style={{
          position: 'relative'
        }}
      >
        <button
          onClick={() => !hasSubmenu && handleMenuItemClick(item)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = win95Theme.colors.titleBar;
            e.currentTarget.style.color = win95Theme.colors.textLight;
            if (hasSubmenu) {
              handleMouseEnter(item.label);
            }
          }}
          onMouseLeave={(e) => {
            if (!hasSubmenu || !isActive) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = win95Theme.colors.text;
            }
            if (!hasSubmenu) {
              setActiveSubmenu(null);
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '3px 20px 3px 4px',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            color: win95Theme.colors.text,
            border: 'none',
            width: '100%',
            textAlign: 'left',
            fontFamily: win95Theme.fonts.system,
            fontSize: '11px'
          }}
        >
          <span style={{
            width: '32px',
            textAlign: 'center',
            fontSize: '16px'
          }}>
            {item.icon || ''}
          </span>
          <span style={{
            fontFamily: win95Theme.fonts.system,
            fontSize: '11px',
            flex: 1
          }}>
            {item.label}
          </span>
          {hasSubmenu && (
            <span style={{ fontSize: '10px' }}>▶</span>
          )}
        </button>
        {hasSubmenu && isActive && (
          <Submenu
            items={item.submenu!}
            onItemClick={handleMenuItemClick}
            parentLabel={item.label}
            onOpenGame={onOpenGame}
          />
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '0',
        backgroundColor: win95Theme.colors.background,
        ...win95Theme.borders.raisedThick,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <div style={{
        width: '24px',
        backgroundColor: '#808080',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '4px 0'
      }}>
        <div style={{
          writingMode: 'vertical-lr',
          transform: 'rotate(180deg)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: '2px'
        }}>
          <span style={{
            color: '#c0c0c0',
            fontFamily: win95Theme.fonts.system,
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            Windows
          </span>
          <span style={{
            color: '#ffffff',
            fontFamily: win95Theme.fonts.system,
            fontSize: '16px',
            fontWeight: 'normal'
          }}>
            95
          </span>
        </div>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '2px 0',
        minWidth: '180px'
      }}>
        {menuItems.map((item, index) => renderMenuItem(item, index))}
      </div>
    </div>
  );
}

interface SubmenuProps {
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
  parentLabel: string;
  onOpenGame: (game: string) => void;
}

function Submenu({ items, onItemClick, parentLabel, onOpenGame }: SubmenuProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const renderSubmenuItem = (item: MenuItem, index: number) => {
    if (item.separator) {
      return (
        <div
          key={index}
          style={{
            borderTop: '1px solid #808080',
            borderBottom: '1px solid #ffffff',
            margin: '3px 2px',
            height: '0px'
          }}
        />
      );
    }

    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isActive = activeSubmenu === item.label;

    return (
      <div
        key={index}
        style={{
          position: 'relative'
        }}
      >
        <button
          onClick={() => !hasSubmenu && onItemClick(item)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = win95Theme.colors.titleBar;
            e.currentTarget.style.color = win95Theme.colors.textLight;
            if (hasSubmenu) {
              setActiveSubmenu(item.label);
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = win95Theme.colors.text;
            if (!hasSubmenu) {
              setActiveSubmenu(null);
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '3px 20px 3px 4px',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            color: win95Theme.colors.text,
            border: 'none',
            width: '100%',
            textAlign: 'left',
            fontFamily: win95Theme.fonts.system,
            fontSize: '11px'
          }}
        >
          <span style={{
            width: '24px',
            textAlign: 'center',
            fontSize: '14px'
          }}>
            {item.icon || ''}
          </span>
          <span style={{
            fontFamily: win95Theme.fonts.system,
            fontSize: '11px',
            flex: 1
          }}>
            {item.label}
          </span>
          {hasSubmenu && (
            <span style={{ fontSize: '10px' }}>▶</span>
          )}
        </button>
        {hasSubmenu && isActive && (
          <Submenu
            items={item.submenu!}
            onItemClick={onItemClick}
            parentLabel={item.label}
            onOpenGame={onOpenGame}
          />
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: '100%',
        top: '0',
        width: '180px',
        backgroundColor: win95Theme.colors.background,
        borderTop: '2px solid #ffffff',
        borderLeft: '2px solid #ffffff',
        borderRight: '2px solid #000000',
        borderBottom: '2px solid #000000',
        boxShadow: '1px 1px 0 #808080',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        padding: '2px'
      }}
    >
      {items.map((item, index) => renderSubmenuItem(item, index))}
    </div>
  );
}