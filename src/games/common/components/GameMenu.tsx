'use client';

import React, { useState } from 'react';
import { Windows95Dialog } from './Windows95Dialog';

export interface GameMenuProps {
  onNewGame: () => void;
  onResetGame?: () => void;
  onPauseGame?: () => void;
  isPaused?: boolean;
  gameName: string;
  customMenuItems?: {
    label: string;
    items: {
      label: string;
      onClick: () => void;
      checked?: boolean;
      separator?: boolean;
    }[];
  }[];
}

export const GameMenu: React.FC<GameMenuProps> = ({
  onNewGame,
  onResetGame,
  onPauseGame,
  isPaused = false,
  gameName,
  customMenuItems = []
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showNewGameDialog, setShowNewGameDialog] = useState(false);

  const handleMenuClick = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const handleNewGame = () => {
    setShowNewGameDialog(true);
    setActiveMenu(null);
  };

  const confirmNewGame = () => {
    onNewGame();
    setShowNewGameDialog(false);
  };

  const handleResetGame = () => {
    if (onResetGame) {
      onResetGame();
    }
    setActiveMenu(null);
  };

  const handlePauseGame = () => {
    if (onPauseGame) {
      onPauseGame();
    }
    setActiveMenu(null);
  };

  const menuItemStyle = {
    fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
    fontSize: '11px',
    fontWeight: '400' as const,
    padding: '4px 20px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    display: 'block',
    width: '100%',
    textAlign: 'left' as const,
    border: 'none',
    color: '#000000'
  };

  const menuItemHoverStyle = {
    backgroundColor: '#000080',
    color: '#ffffff'
  };

  return (
    <>
      <div className="flex">
        {/* Game Menu */}
        <div className="relative">
          <button
            onClick={() => handleMenuClick('game')}
            style={{
              border: 'none',
              backgroundColor: activeMenu === 'game' ? '#000080' : '#c0c0c0',
              color: activeMenu === 'game' ? '#ffffff' : '#000000',
              fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
              fontSize: '11px',
              fontWeight: '400',
              padding: '2px 8px',
              cursor: 'pointer'
            }}
          >
            <span style={{ textDecoration: 'underline' }}>G</span>ame
          </button>

          {activeMenu === 'game' && (
            <div className="absolute top-full left-0 z-10" style={{
              minWidth: '150px',
              backgroundColor: '#c0c0c0',
              border: '2px solid',
              borderColor: '#ffffff #808080 #808080 #ffffff',
              boxShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}>
              <button
                onClick={handleNewGame}
                style={menuItemStyle}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, menuItemHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, { backgroundColor: 'transparent', color: '#000000' })}
              >
                <span style={{ textDecoration: 'underline' }}>N</span>ew Game
              </button>
              
              {onResetGame && (
                <button
                  onClick={handleResetGame}
                  style={menuItemStyle}
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, menuItemHoverStyle)}
                  onMouseLeave={(e) => Object.assign(e.currentTarget.style, { backgroundColor: 'transparent', color: '#000000' })}
                >
                  <span style={{ textDecoration: 'underline' }}>R</span>eset
                </button>
              )}

              {onPauseGame && (
                <>
                  <div style={{
                    height: '1px',
                    backgroundColor: '#808080',
                    margin: '2px 3px',
                    borderBottom: '1px solid #ffffff'
                  }} />
                  <button
                    onClick={handlePauseGame}
                    style={menuItemStyle}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, menuItemHoverStyle)}
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, { backgroundColor: 'transparent', color: '#000000' })}
                  >
                    {isPaused ? 'Resume' : 'Pause'}
                  </button>
                </>
              )}

              <div style={{
                height: '1px',
                backgroundColor: '#808080',
                margin: '2px 3px',
                borderBottom: '1px solid #ffffff'
              }} />
              
              <button
                onClick={() => { window.location.href = '/games'; }}
                style={menuItemStyle}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, menuItemHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, { backgroundColor: 'transparent', color: '#000000' })}
              >
                E<span style={{ textDecoration: 'underline' }}>x</span>it to Menu
              </button>
            </div>
          )}
        </div>

        {/* Custom Menus */}
        {customMenuItems.map((menu, menuIndex) => (
          <div key={menuIndex} className="relative">
            <button
              onClick={() => handleMenuClick(menu.label)}
              style={{
                border: 'none',
                backgroundColor: activeMenu === menu.label ? '#000080' : '#c0c0c0',
                color: activeMenu === menu.label ? '#ffffff' : '#000000',
                fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                fontSize: '11px',
                fontWeight: '400',
                padding: '2px 8px',
                cursor: 'pointer'
              }}
            >
              {menu.label}
            </button>

            {activeMenu === menu.label && (
              <div className="absolute top-full left-0 z-10" style={{
                minWidth: '150px',
                backgroundColor: '#c0c0c0',
                border: '2px solid',
                borderColor: '#ffffff #808080 #808080 #ffffff',
                boxShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}>
                {menu.items.map((item, itemIndex) => (
                  item.separator ? (
                    <div key={itemIndex} style={{
                      height: '1px',
                      backgroundColor: '#808080',
                      margin: '2px 3px',
                      borderBottom: '1px solid #ffffff'
                    }} />
                  ) : (
                    <button
                      key={itemIndex}
                      onClick={() => {
                        item.onClick();
                        setActiveMenu(null);
                      }}
                      style={{
                        ...menuItemStyle,
                        position: 'relative',
                        paddingLeft: item.checked !== undefined ? '30px' : '20px'
                      }}
                      onMouseEnter={(e) => Object.assign(e.currentTarget.style, { ...menuItemHoverStyle, paddingLeft: item.checked !== undefined ? '30px' : '20px' })}
                      onMouseLeave={(e) => Object.assign(e.currentTarget.style, { backgroundColor: 'transparent', color: '#000000', paddingLeft: item.checked !== undefined ? '30px' : '20px' })}
                    >
                      {item.checked && (
                        <span style={{
                          position: 'absolute',
                          left: '10px',
                          fontFamily: 'Wingdings',
                          fontSize: '12px'
                        }}>
                          ✓
                        </span>
                      )}
                      {item.label}
                    </button>
                  )
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Help Menu */}
        <div className="relative">
          <button
            onClick={() => handleMenuClick('help')}
            style={{
              border: 'none',
              backgroundColor: activeMenu === 'help' ? '#000080' : '#c0c0c0',
              color: activeMenu === 'help' ? '#ffffff' : '#000000',
              fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
              fontSize: '11px',
              fontWeight: '400',
              padding: '2px 8px',
              cursor: 'pointer'
            }}
          >
            <span style={{ textDecoration: 'underline' }}>H</span>elp
          </button>

          {activeMenu === 'help' && (
            <div className="absolute top-full left-0 z-10" style={{
              minWidth: '150px',
              backgroundColor: '#c0c0c0',
              border: '2px solid',
              borderColor: '#ffffff #808080 #808080 #ffffff',
              boxShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}>
              <button
                onClick={() => {
                  alert(`${gameName} - Classic Windows Game\n\nEnjoy playing!`);
                  setActiveMenu(null);
                }}
                style={menuItemStyle}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, menuItemHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, { backgroundColor: 'transparent', color: '#000000' })}
              >
                <span style={{ textDecoration: 'underline' }}>A</span>bout {gameName}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* New Game Confirmation Dialog */}
      {showNewGameDialog && (
        <Windows95Dialog
          title="New Game"
          message="Start a new game? Your current progress will be lost."
          onConfirm={confirmNewGame}
          onCancel={() => setShowNewGameDialog(false)}
        />
      )}
    </>
  );
};