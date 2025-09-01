'use client';

import React from 'react';
import { win95Theme } from '@/styles/theme';

interface LEDSegmentPattern {
  [key: string]: string;
}

const SEGMENT_PATTERNS: LEDSegmentPattern = {
  '0': '1111110',
  '1': '0110000',
  '2': '1101101',
  '3': '1111001',
  '4': '0110011',
  '5': '1011011',
  '6': '1011111',
  '7': '1110000',
  '8': '1111111',
  '9': '1111011',
  '-': '0000001'
};

interface LEDDigitProps {
  digit: string;
}

const LEDDigit: React.FC<LEDDigitProps> = React.memo(({ digit }) => {
  const pattern = SEGMENT_PATTERNS[digit] || '0000000';
  const { colors, sizes } = win95Theme;
  
  const segmentStyle = (isOn: boolean) => ({
    backgroundColor: isOn ? colors.ledOn : colors.ledOff,
    boxShadow: isOn ? `0 0 4px ${colors.ledGlow}` : 'none'
  });

  return (
    <div style={{
      width: `${sizes.ledDigitWidth}px`,
      height: `${sizes.ledDigitHeight}px`,
      position: 'relative',
      marginRight: '2px',
      display: 'inline-block'
    }}>
      {/* Segment a (top) */}
      <div style={{
        position: 'absolute',
        top: '0px',
        left: '1px',
        width: '11px',
        height: '3px',
        clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
        ...segmentStyle(pattern[0] === '1')
      }} />
      
      {/* Segment b (top-right) */}
      <div style={{
        position: 'absolute',
        top: '1px',
        right: '0px',
        width: '3px',
        height: '11px',
        clipPath: 'polygon(0% 0%, 100% 20%, 100% 80%, 0% 100%)',
        ...segmentStyle(pattern[1] === '1')
      }} />
      
      {/* Segment c (bottom-right) */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '0px',
        width: '3px',
        height: '11px',
        clipPath: 'polygon(0% 0%, 100% 20%, 100% 100%, 0% 100%)',
        ...segmentStyle(pattern[2] === '1')
      }} />
      
      {/* Segment d (bottom) */}
      <div style={{
        position: 'absolute',
        bottom: '0px',
        left: '1px',
        width: '11px',
        height: '3px',
        clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)',
        ...segmentStyle(pattern[3] === '1')
      }} />
      
      {/* Segment e (bottom-left) */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '0px',
        width: '3px',
        height: '11px',
        clipPath: 'polygon(0% 20%, 100% 0%, 100% 100%, 0% 100%)',
        ...segmentStyle(pattern[4] === '1')
      }} />
      
      {/* Segment f (top-left) */}
      <div style={{
        position: 'absolute',
        top: '1px',
        left: '0px',
        width: '3px',
        height: '11px',
        clipPath: 'polygon(0% 20%, 100% 0%, 100% 100%, 0% 80%)',
        ...segmentStyle(pattern[5] === '1')
      }} />
      
      {/* Segment g (middle) */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '1px',
        width: '11px',
        height: '3px',
        clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)',
        ...segmentStyle(pattern[6] === '1')
      }} />
    </div>
  );
});

LEDDigit.displayName = 'LEDDigit';

interface LEDDisplayProps {
  value: number;
  digits?: number;
}

export const LEDDisplay: React.FC<LEDDisplayProps> = React.memo(({ value, digits = 3 }) => {
  const displayValue = Math.min(999, Math.max(-99, value));
  const displayString = displayValue.toString().padStart(digits, '0');
  const { colors, borders } = win95Theme;
  
  return (
    <div style={{
      ...borders.inset,
      borderRightColor: colors.backgroundLight,
      borderBottomColor: colors.backgroundLight,
      minWidth: '50px',
      textAlign: 'center',
      backgroundColor: colors.ledBackground,
      padding: '0',
      background: `linear-gradient(to bottom, ${colors.ledBackground} 0%, ${colors.ledBackgroundDim} 100%)`,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box'
    }}>
      {displayString.split('').map((digit, index) => (
        <LEDDigit key={index} digit={digit} />
      ))}
    </div>
  );
});

LEDDisplay.displayName = 'LEDDisplay';