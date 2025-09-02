'use client';

import React, { useState } from 'react';
import { win95Theme } from '@/styles/theme';

interface CustomGameDialogProps {
  isOpen: boolean;
  onConfirm: (rows: number, cols: number, mines: number) => void;
  onCancel: () => void;
  currentRows?: number;
  currentCols?: number;
  currentMines?: number;
}

export const CustomGameDialog: React.FC<CustomGameDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  currentRows = 9,
  currentCols = 9,
  currentMines = 10
}) => {
  const [rows, setRows] = useState(currentRows.toString());
  const [cols, setCols] = useState(currentCols.toString());
  const [mines, setMines] = useState(currentMines.toString());
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    const rowNum = parseInt(rows);
    const colNum = parseInt(cols);
    const mineNum = parseInt(mines);

    // Validation
    if (isNaN(rowNum) || isNaN(colNum) || isNaN(mineNum)) {
      setError('Please enter valid numbers');
      return;
    }

    // Limits based on classic Minesweeper
    if (rowNum < 9 || rowNum > 24) {
      setError('Height must be between 9 and 24');
      return;
    }
    if (colNum < 9 || colNum > 30) {
      setError('Width must be between 9 and 30');
      return;
    }
    
    const maxMines = (rowNum * colNum) - 1;
    const minMines = 1;
    
    if (mineNum < minMines || mineNum > maxMines) {
      setError(`Mines must be between ${minMines} and ${maxMines}`);
      return;
    }

    setError('');
    onConfirm(rowNum, colNum, mineNum);
  };

  const inputStyle = {
    width: '60px',
    padding: '2px 4px',
    border: '2px inset #ffffff',
    backgroundColor: '#ffffff',
    fontFamily: win95Theme.fonts.system,
    fontSize: '11px'
  };

  const labelStyle = {
    fontFamily: win95Theme.fonts.system,
    fontSize: '11px',
    marginRight: '8px',
    minWidth: '60px',
    display: 'inline-block' as const
  };

  return (
    <>
      {/* Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.1)',
        zIndex: 999
      }} onClick={onCancel} />
      
      {/* Dialog */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        backgroundColor: win95Theme.colors.background,
        border: '2px solid',
        borderTopColor: '#ffffff',
        borderLeftColor: '#ffffff',
        borderRightColor: '#808080',
        borderBottomColor: '#808080',
        padding: '2px',
        minWidth: '350px',
        boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        {/* Title Bar */}
        <div style={{
          backgroundColor: win95Theme.colors.titleBar,
          color: win95Theme.colors.textLight,
          padding: '2px 4px',
          fontFamily: win95Theme.fonts.system,
          fontSize: '11px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span>Custom Field</span>
          <button
            onClick={onCancel}
            style={{
              width: '16px',
              height: '14px',
              backgroundColor: win95Theme.colors.background,
              border: '2px solid',
              borderTopColor: '#ffffff',
              borderLeftColor: '#ffffff',
              borderRightColor: '#808080',
              borderBottomColor: '#808080',
              fontSize: '10px',
              lineHeight: '10px',
              padding: '0',
              cursor: 'pointer',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold'
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{
          padding: '16px',
          fontFamily: win95Theme.fonts.system,
          fontSize: '11px'
        }}>
          <div style={{ marginBottom: '12px' }}>
            <label style={labelStyle}>Height:</label>
            <input
              type="text"
              value={rows}
              onChange={(e) => {
                setRows(e.target.value);
                setError('');
              }}
              style={inputStyle}
            />
            <span style={{ marginLeft: '8px', color: '#808080' }}>(9-24)</span>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={labelStyle}>Width:</label>
            <input
              type="text"
              value={cols}
              onChange={(e) => {
                setCols(e.target.value);
                setError('');
              }}
              style={inputStyle}
            />
            <span style={{ marginLeft: '8px', color: '#808080' }}>(9-30)</span>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={labelStyle}>Mines:</label>
            <input
              type="text"
              value={mines}
              onChange={(e) => {
                setMines(e.target.value);
                setError('');
              }}
              style={inputStyle}
            />
            <span style={{ marginLeft: '8px', color: '#808080' }}>
              (1-{Math.min(999, parseInt(rows) * parseInt(cols) - 1) || 999})
            </span>
          </div>

          {error && (
            <div style={{
              color: '#FF0000',
              marginTop: '8px',
              marginBottom: '8px',
              fontSize: '11px'
            }}>
              {error}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div style={{
          padding: '8px 16px 16px',
          display: 'flex',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <button
            onClick={handleConfirm}
            style={{
              minWidth: '75px',
              padding: '6px 16px',
              backgroundColor: win95Theme.colors.background,
              border: '2px solid',
              borderTopColor: '#ffffff',
              borderLeftColor: '#ffffff',
              borderRightColor: '#808080',
              borderBottomColor: '#808080',
              fontFamily: win95Theme.fonts.system,
              fontSize: '11px',
              cursor: 'pointer'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.borderTopColor = '#808080';
              e.currentTarget.style.borderLeftColor = '#808080';
              e.currentTarget.style.borderRightColor = '#ffffff';
              e.currentTarget.style.borderBottomColor = '#ffffff';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.borderTopColor = '#ffffff';
              e.currentTarget.style.borderLeftColor = '#ffffff';
              e.currentTarget.style.borderRightColor = '#808080';
              e.currentTarget.style.borderBottomColor = '#808080';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderTopColor = '#ffffff';
              e.currentTarget.style.borderLeftColor = '#ffffff';
              e.currentTarget.style.borderRightColor = '#808080';
              e.currentTarget.style.borderBottomColor = '#808080';
            }}
          >
            OK
          </button>
          <button
            onClick={onCancel}
            style={{
              minWidth: '75px',
              padding: '6px 16px',
              backgroundColor: win95Theme.colors.background,
              border: '2px solid',
              borderTopColor: '#ffffff',
              borderLeftColor: '#ffffff',
              borderRightColor: '#808080',
              borderBottomColor: '#808080',
              fontFamily: win95Theme.fonts.system,
              fontSize: '11px',
              cursor: 'pointer'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.borderTopColor = '#808080';
              e.currentTarget.style.borderLeftColor = '#808080';
              e.currentTarget.style.borderRightColor = '#ffffff';
              e.currentTarget.style.borderBottomColor = '#ffffff';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.borderTopColor = '#ffffff';
              e.currentTarget.style.borderLeftColor = '#ffffff';
              e.currentTarget.style.borderRightColor = '#808080';
              e.currentTarget.style.borderBottomColor = '#808080';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderTopColor = '#ffffff';
              e.currentTarget.style.borderLeftColor = '#ffffff';
              e.currentTarget.style.borderRightColor = '#808080';
              e.currentTarget.style.borderBottomColor = '#808080';
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};