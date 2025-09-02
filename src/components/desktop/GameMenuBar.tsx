'use client';

import React, { useState, useRef, useEffect } from 'react';
import { win95Theme } from '@/styles/theme';
import { SoundManager } from '@/utils/SoundManager';

export interface MenuItem {
  label: string;
  action?: () => void;
  items?: MenuItem[];
  separator?: boolean;
  checked?: boolean;
  hotkey?: string;
}

export interface Menu {
  label: string;
  underline?: number;
  items: MenuItem[];
}

interface GameMenuBarProps {
  menus: Menu[];
  onMenuAction?: (action: string) => void;
}

export default function GameMenuBar({ menus, onMenuAction }: GameMenuBarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const soundManager = useRef(SoundManager.getInstance());

  useEffect(() => {
    setSoundEnabled(soundManager.current.isEnabled());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (menuLabel: string) => {
    setActiveMenu(activeMenu === menuLabel ? null : menuLabel);
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.action) {
      item.action();
    }
    setActiveMenu(null);
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

    return (
      <button
        key={index}
        onClick={() => handleItemClick(item)}
        style={{
          fontFamily: win95Theme.fonts.system,
          fontSize: '11px',
          color: '#000000',
          backgroundColor: win95Theme.colors.background,
          border: 'none',
          padding: '3px 20px 3px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          textAlign: 'left',
          cursor: 'pointer',
          minWidth: '160px',
          height: '20px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = win95Theme.colors.titleBar;
          e.currentTarget.style.color = win95Theme.colors.textLight;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = win95Theme.colors.background;
          e.currentTarget.style.color = win95Theme.colors.text;
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ 
            width: '12px', 
            marginLeft: '-16px',
            marginRight: '8px',
            textAlign: 'center' 
          }}>
            {item.checked ? '✓' : ''}
          </span>
          {item.label}
        </span>
        {item.hotkey && (
          <span style={{ marginLeft: '20px', color: '#808080' }}>
            {item.hotkey}
          </span>
        )}
      </button>
    );
  };

  return (
    <div 
      ref={menuRef}
      style={{
        backgroundColor: win95Theme.colors.background,
        display: 'flex',
        height: '20px',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {menus.map((menu) => (
        <div key={menu.label} style={{ position: 'relative' }}>
          <button
            onClick={() => handleMenuClick(menu.label)}
            style={{
              border: 'none',
              backgroundColor: activeMenu === menu.label ? win95Theme.colors.titleBar : win95Theme.colors.background,
              color: activeMenu === menu.label ? win95Theme.colors.textLight : win95Theme.colors.text,
              fontFamily: win95Theme.fonts.system,
              fontSize: '11px',
              fontWeight: '400',
              padding: '2px 8px',
              cursor: 'pointer',
              height: '100%'
            }}
          >
            {menu.underline !== undefined ? (
              <>
                {menu.label.substring(0, menu.underline)}
                <span style={{ textDecoration: 'underline' }}>
                  {menu.label.charAt(menu.underline)}
                </span>
                {menu.label.substring(menu.underline + 1)}
              </>
            ) : (
              menu.label
            )}
          </button>

          {activeMenu === menu.label && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                zIndex: 1000,
                backgroundColor: win95Theme.colors.background,
                borderTop: '2px solid #ffffff',
                borderLeft: '2px solid #ffffff',
                borderRight: '2px solid #000000',
                borderBottom: '2px solid #000000',
                boxShadow: '1px 1px 0 #808080',
                padding: '2px',
                minWidth: '120px'
              }}
            >
              {menu.items.map((item, index) => renderMenuItem(item, index))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}