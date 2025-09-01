'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { win95Theme } from '@/styles/theme';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Game error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { colors, borders, spacing, fonts } = win95Theme;
      
      return (
        <div style={{
          ...borders.raisedThick,
          backgroundColor: colors.background,
          padding: spacing.lg,
          fontFamily: fonts.system,
          minWidth: '400px'
        }}>
          <div style={{
            ...borders.inset,
            backgroundColor: colors.backgroundLight,
            padding: spacing.lg,
            marginBottom: spacing.md
          }}>
            <h2 style={{ 
              color: colors.text, 
              marginTop: 0,
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              ❌ Game Error
            </h2>
            <p style={{ 
              color: colors.text,
              fontSize: '11px',
              marginBottom: spacing.md
            }}>
              An error occurred while running the game:
            </p>
            <code style={{
              display: 'block',
              padding: spacing.sm,
              backgroundColor: colors.background,
              border: `1px solid ${colors.backgroundDark}`,
              fontSize: '10px',
              fontFamily: fonts.mono,
              color: colors.text,
              overflowX: 'auto'
            }}>
              {this.state.error?.message || 'Unknown error'}
            </code>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={this.handleReset}
              style={{
                ...borders.raised,
                backgroundColor: colors.background,
                padding: `${spacing.xs} ${spacing.lg}`,
                fontFamily: fonts.system,
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              Restart Game
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}