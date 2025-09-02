'use client';

import React from 'react';
import { win95Theme } from '@/styles/theme';

export interface GameInfo {
  name: string;
  description: string;
  icon?: string;
  screenshot?: string;
  screenshotAlt?: string;
  credits: {
    original?: string;
    version?: string;
    year?: string;
  };
  howToPlay: {
    objective: string;
    controls: Array<{
      action: string;
      control: string;
    }>;
    rules?: string[];
    tips?: string[];
    gameplayImage?: string;
    gameplayImageAlt?: string;
  };
}

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  gameInfo: GameInfo;
  activeTab?: 'about' | 'howToPlay';
}

export const HelpDialog: React.FC<HelpDialogProps> = ({ 
  isOpen, 
  onClose, 
  gameInfo,
  activeTab: initialTab = 'about'
}) => {
  const [activeTab, setActiveTab] = React.useState<'about' | 'howToPlay'>(initialTab);

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      backgroundColor: 'rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{
        ...win95Theme.borders.dialog,
        backgroundColor: win95Theme.colors.background,
        width: '500px',
        maxWidth: '90%',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          ...win95Theme.borders.titleBar,
          backgroundColor: win95Theme.colors.activeTitle,
          color: win95Theme.colors.titleText,
          padding: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          userSelect: 'none'
        }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold' }}>
            {gameInfo.name} Help
          </span>
          <button
            onClick={onClose}
            style={{
              ...win95Theme.borders.button,
              backgroundColor: win95Theme.colors.background,
              width: '18px',
              height: '18px',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: win95Theme.spacing.md }}>
          <div style={{
            display: 'flex',
            gap: win95Theme.spacing.sm,
            marginBottom: win95Theme.spacing.md,
            borderBottom: `2px solid ${win95Theme.colors.borderDark}`,
            paddingBottom: win95Theme.spacing.sm
          }}>
            <button
              onClick={() => setActiveTab('about')}
              style={{
                ...win95Theme.borders.button,
                backgroundColor: activeTab === 'about' ? win95Theme.colors.selected : win95Theme.colors.background,
                color: activeTab === 'about' ? win95Theme.colors.selectedText : win95Theme.colors.text,
                padding: `${win95Theme.spacing.sm} ${win95Theme.spacing.md}`,
                cursor: 'pointer',
                fontSize: '11px'
              }}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab('howToPlay')}
              style={{
                ...win95Theme.borders.button,
                backgroundColor: activeTab === 'howToPlay' ? win95Theme.colors.selected : win95Theme.colors.background,
                color: activeTab === 'howToPlay' ? win95Theme.colors.selectedText : win95Theme.colors.text,
                padding: `${win95Theme.spacing.sm} ${win95Theme.spacing.md}`,
                cursor: 'pointer',
                fontSize: '11px'
              }}
            >
              How to Play
            </button>
          </div>

          <div 
            className="win95-scrollbar"
            style={{
            ...win95Theme.borders.sunken,
            backgroundColor: win95Theme.colors.inputBackground,
            padding: win95Theme.spacing.md,
            height: '400px',
            overflowY: 'auto'
          }}>
            {activeTab === 'about' ? (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: win95Theme.spacing.md,
                  marginBottom: win95Theme.spacing.md
                }}>
                  {gameInfo.icon && (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={gameInfo.icon} 
                        alt={`${gameInfo.name} icon`}
                        style={{
                          width: '48px',
                          height: '48px',
                          imageRendering: 'pixelated'
                        }}
                      />
                    </>
                  )}
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '14px', 
                      marginBottom: win95Theme.spacing.sm,
                      color: win95Theme.colors.text 
                    }}>
                      {gameInfo.name}
                    </h3>
                    <p style={{ 
                      fontSize: '11px', 
                      lineHeight: '1.6',
                      color: win95Theme.colors.text
                    }}>
                      {gameInfo.description}
                    </p>
                  </div>
                </div>
                
                {gameInfo.screenshot && (
                  <div style={{
                    marginBottom: win95Theme.spacing.md,
                    textAlign: 'center'
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={gameInfo.screenshot} 
                      alt={gameInfo.screenshotAlt || `${gameInfo.name} screenshot`}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        border: `2px solid ${win95Theme.colors.borderDark}`,
                        imageRendering: 'pixelated'
                      }}
                    />
                  </div>
                )}
                
                {gameInfo.credits && (
                  <div style={{ 
                    marginTop: win95Theme.spacing.lg,
                    fontSize: '11px',
                    color: win95Theme.colors.text
                  }}>
                    <h4 style={{ 
                      fontSize: '12px', 
                      marginBottom: win95Theme.spacing.sm 
                    }}>
                      Credits
                    </h4>
                    {gameInfo.credits.original && (
                      <p style={{ marginBottom: win95Theme.spacing.xs }}>
                        <strong>Original:</strong> {gameInfo.credits.original}
                      </p>
                    )}
                    {gameInfo.credits.version && (
                      <p style={{ marginBottom: win95Theme.spacing.xs }}>
                        <strong>Version:</strong> {gameInfo.credits.version}
                      </p>
                    )}
                    {gameInfo.credits.year && (
                      <p style={{ marginBottom: win95Theme.spacing.xs }}>
                        <strong>Year:</strong> {gameInfo.credits.year}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h3 style={{ 
                  fontSize: '14px', 
                  marginBottom: win95Theme.spacing.md,
                  color: win95Theme.colors.text 
                }}>
                  How to Play {gameInfo.name}
                </h3>
                
                <div style={{ marginBottom: win95Theme.spacing.lg }}>
                  <h4 style={{ 
                    fontSize: '12px', 
                    marginBottom: win95Theme.spacing.sm,
                    color: win95Theme.colors.text
                  }}>
                    Objective
                  </h4>
                  <p style={{ 
                    fontSize: '11px',
                    lineHeight: '1.6',
                    color: win95Theme.colors.text
                  }}>
                    {gameInfo.howToPlay.objective}
                  </p>
                </div>

                {gameInfo.howToPlay.gameplayImage && (
                  <div style={{
                    marginBottom: win95Theme.spacing.lg,
                    textAlign: 'center'
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={gameInfo.howToPlay.gameplayImage} 
                      alt={gameInfo.howToPlay.gameplayImageAlt || "Gameplay example"}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        border: `1px solid ${win95Theme.colors.borderDark}`,
                        imageRendering: 'pixelated'
                      }}
                    />
                  </div>
                )}

                <div style={{ marginBottom: win95Theme.spacing.lg }}>
                  <h4 style={{ 
                    fontSize: '12px', 
                    marginBottom: win95Theme.spacing.sm,
                    color: win95Theme.colors.text
                  }}>
                    Controls
                  </h4>
                  <ul style={{ 
                    listStyle: 'none', 
                    padding: 0,
                    fontSize: '11px',
                    color: win95Theme.colors.text
                  }}>
                    {gameInfo.howToPlay.controls.map((control) => (
                      <li key={`${control.control}-${control.action}`} style={{ 
                        marginBottom: win95Theme.spacing.xs,
                        display: 'flex',
                        gap: win95Theme.spacing.sm
                      }}>
                        <strong style={{ minWidth: '120px' }}>{control.control}:</strong>
                        <span>{control.action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {gameInfo.howToPlay.rules && gameInfo.howToPlay.rules.length > 0 && (
                  <div style={{ marginBottom: win95Theme.spacing.lg }}>
                    <h4 style={{ 
                      fontSize: '12px', 
                      marginBottom: win95Theme.spacing.sm,
                      color: win95Theme.colors.text
                    }}>
                      Rules
                    </h4>
                    <ul style={{ 
                      marginLeft: win95Theme.spacing.lg,
                      fontSize: '11px',
                      color: win95Theme.colors.text
                    }}>
                      {gameInfo.howToPlay.rules.map((rule) => (
                        <li key={rule} style={{ 
                          marginBottom: win95Theme.spacing.xs,
                          lineHeight: '1.6'
                        }}>
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {gameInfo.howToPlay.tips && gameInfo.howToPlay.tips.length > 0 && (
                  <div>
                    <h4 style={{ 
                      fontSize: '12px', 
                      marginBottom: win95Theme.spacing.sm,
                      color: win95Theme.colors.text
                    }}>
                      Tips
                    </h4>
                    <ul style={{ 
                      marginLeft: win95Theme.spacing.lg,
                      fontSize: '11px',
                      color: win95Theme.colors.text
                    }}>
                      {gameInfo.howToPlay.tips.map((tip) => (
                        <li key={tip} style={{ 
                          marginBottom: win95Theme.spacing.xs,
                          lineHeight: '1.6'
                        }}>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: win95Theme.spacing.md
          }}>
            <button
              onClick={onClose}
              style={{
                ...win95Theme.borders.button,
                backgroundColor: win95Theme.colors.background,
                padding: `${win95Theme.spacing.sm} ${win95Theme.spacing.lg}`,
                cursor: 'pointer',
                fontSize: '11px'
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};