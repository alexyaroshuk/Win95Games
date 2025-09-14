'use client';

import React from 'react';
import { win95Theme } from '@/styles/theme';

interface AboutWindowProps {
  isActive?: boolean;
}

export default function AboutWindow({ isActive }: AboutWindowProps) {
  const authorName = process.env.NEXT_PUBLIC_AUTHOR_NAME || 'Anonymous Developer';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com';
  const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME || 'Retro Games - Windows 95 Edition';
  const version = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0';

  const handleLinkClick = () => {
    window.open(githubUrl, '_blank');
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: win95Theme.colors.background,
      display: 'flex',
      flexDirection: 'column',
      padding: win95Theme.spacing.lg,
      fontFamily: win95Theme.fonts.system,
      fontSize: '11px'
    }}>
      <div style={{
        display: 'flex',
        gap: win95Theme.spacing.lg,
        marginBottom: win95Theme.spacing.lg
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px'
        }}>
          💻
        </div>

        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: win95Theme.spacing.sm
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            {projectName}
          </h2>
          <p style={{ margin: 0 }}>
            Version {version}
          </p>
          <p style={{ margin: 0 }}>
            Classic and retro games in authentic Windows 95 style.
          </p>
        </div>
      </div>

      <div style={{
        ...win95Theme.borders.inset,
        padding: win95Theme.spacing.md,
        backgroundColor: '#ffffff',
        marginBottom: win95Theme.spacing.lg,
        flex: 1
      }}>
        <p style={{ margin: 0, marginBottom: win95Theme.spacing.md }}>
          <strong>Created by:</strong> {authorName}
        </p>

        <p style={{ margin: 0, marginBottom: win95Theme.spacing.md }}>
          A collection of retro and classic games presented in the iconic Windows 95 interface.
          Features authentic UI elements, sounds, and the nostalgic feel of 90s computing.
        </p>

        <p style={{ margin: 0, marginBottom: win95Theme.spacing.md }}>
          <strong>Games included:</strong><br />
          • Minesweeper (Windows 95 classic)<br />
          • Tetris, Snake, Arkanoid (90s favorites)<br />
          • Pong (retro arcade)<br />
          • 2048 (modern puzzle game)
        </p>

        <p style={{ margin: 0, marginBottom: win95Theme.spacing.md }}>
          <strong>Technologies used:</strong><br />
          • React & Next.js<br />
          • TypeScript<br />
          • Authentic Windows 95 UI Recreation
        </p>

        <p style={{ margin: 0 }}>
          <strong>Source code & Contact:</strong>
        </p>

        <button
          onClick={handleLinkClick}
          style={{
            marginTop: win95Theme.spacing.sm,
            padding: '0',
            backgroundColor: 'transparent',
            border: 'none',
            fontFamily: win95Theme.fonts.system,
            fontSize: '11px',
            cursor: 'pointer',
            color: '#0000ff',
            textDecoration: 'underline'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ff0000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#0000ff';
          }}
        >
          {githubUrl.replace('https://', '').replace('http://', '')}
        </button>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: win95Theme.spacing.md
      }}>
        <button
          onClick={() => {}}
          style={{
            padding: '4px 16px',
            backgroundColor: win95Theme.colors.background,
            ...win95Theme.borders.raised,
            fontFamily: win95Theme.fonts.system,
            fontSize: '11px',
            cursor: 'pointer'
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}