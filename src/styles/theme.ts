export const win95Theme = {
  colors: {
    background: '#c0c0c0',
    backgroundDark: '#808080',
    backgroundLight: '#ffffff',
    titleBar: '#000080',
    titleBarGradientEnd: '#0000a0',
    activeTitle: '#000080',
    titleText: '#ffffff',
    text: '#000000',
    textLight: '#ffffff',
    textMuted: '#808080',
    textSecondary: '#606060',
    selected: '#000080',
    selectedText: '#ffffff',
    error: '#ff0000',
    warning: '#ffa500',
    borderDark: '#808080',
    inputBackground: '#ffffff',
    ledBackground: '#000000',
    ledBackgroundDim: '#1a1a1a',
    ledOn: '#ff0000',
    ledOff: '#320000',
    ledGlow: '#ff0000',
    mineRed: '#ff0000',
    incorrectFlag: '#ffcccc',
    cellRevealed: '#f0f0f0',
    cellBorder: '#d0d0d0',
    numbers: {
      1: '#0000FF',
      2: '#008000',
      3: '#FF0000',
      4: '#000080',
      5: '#800000',
      6: '#008080',
      7: '#000000',
      8: '#808080'
    }
  },
  
  borders: {
    raised: {
      borderWidth: '2px',
      borderStyle: 'solid',
      borderTopColor: '#ffffff',
      borderLeftColor: '#ffffff',
      borderRightColor: '#808080',
      borderBottomColor: '#808080'
    },
    raisedThick: {
      borderWidth: '3px',
      borderStyle: 'solid',
      borderTopColor: '#ffffff',
      borderLeftColor: '#ffffff',
      borderRightColor: '#808080',
      borderBottomColor: '#808080'
    },
    inset: {
      borderWidth: '2px',
      borderStyle: 'solid',
      borderTopColor: '#808080',
      borderLeftColor: '#808080',
      borderRightColor: '#ffffff',
      borderBottomColor: '#ffffff'
    },
    insetThick: {
      borderWidth: '3px',
      borderStyle: 'solid',
      borderTopColor: '#808080',
      borderLeftColor: '#808080',
      borderRightColor: '#ffffff',
      borderBottomColor: '#ffffff'
    },
    sunken: {
      borderWidth: '2px',
      borderStyle: 'solid',
      borderTopColor: '#808080',
      borderLeftColor: '#808080',
      borderRightColor: '#ffffff',
      borderBottomColor: '#ffffff'
    },
    dialog: {
      borderWidth: '2px',
      borderStyle: 'solid',
      borderTopColor: '#ffffff',
      borderLeftColor: '#ffffff',
      borderRightColor: '#000000',
      borderBottomColor: '#000000'
    },
    titleBar: {
      borderWidth: '0px',
      borderStyle: 'none'
    },
    button: {
      borderWidth: '2px',
      borderStyle: 'outset',
      borderColor: '#c0c0c0'
    },
    buttonPressed: {
      borderWidth: '2px',
      borderStyle: 'inset',
      borderColor: '#c0c0c0'
    },
    windowControl: {
      borderWidth: '1px',
      borderStyle: 'solid',
      borderTopColor: '#ffffff',
      borderLeftColor: '#ffffff',
      borderRightColor: '#000000',
      borderBottomColor: '#000000'
    },
    windowControlPressed: {
      borderWidth: '1px',
      borderStyle: 'solid',
      borderTopColor: '#000000',
      borderLeftColor: '#000000',
      borderRightColor: '#ffffff',
      borderBottomColor: '#ffffff'
    }
  },
  
  fonts: {
    system: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
    mono: 'Consolas, "Courier New", monospace'
  },
  
  sizes: {
    cell: 20,
    borderWidth: 3,
    menuHeight: 20,
    titleBarHeight: 20,
    windowControlSize: 16,
    ledDigitWidth: 13,
    ledDigitHeight: 23
  },
  
  spacing: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '14px'
  },
  
  shadows: {
    text: '1px 1px 0px rgba(0,0,0,0.5)',
    led: '0 0 4px'
  }
};

export type Theme = typeof win95Theme;

// Style utility functions
export const createBorderStyle = (type: keyof Theme['borders']) => {
  return win95Theme.borders[type];
};

export const createButtonStyle = (pressed: boolean = false) => {
  return {
    ...win95Theme.borders[pressed ? 'buttonPressed' : 'button'],
    backgroundColor: win95Theme.colors.background,
    cursor: 'pointer'
  };
};

export const createWindowControlStyle = (pressed: boolean = false) => {
  return {
    ...win95Theme.borders[pressed ? 'windowControlPressed' : 'windowControl'],
    width: `${win95Theme.sizes.windowControlSize}px`,
    height: `${win95Theme.sizes.windowControlSize - 2}px`,
    backgroundColor: win95Theme.colors.background,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
    fontSize: '10px',
    fontWeight: 'bold',
    lineHeight: '1'
  };
};

export const createMenuItemStyle = (isHovered: boolean = false) => {
  return {
    fontFamily: win95Theme.fonts.system,
    fontSize: '11px',
    color: isHovered ? win95Theme.colors.textLight : win95Theme.colors.text,
    backgroundColor: isHovered ? win95Theme.colors.titleBar : win95Theme.colors.background,
    border: 'none',
    padding: `${win95Theme.spacing.xs} ${win95Theme.spacing.md}`,
    display: 'block',
    width: '100%',
    textAlign: 'left' as const,
    cursor: 'pointer'
  };
};

export const getNumberColor = (num: number): string => {
  return win95Theme.colors.numbers[num as keyof typeof win95Theme.colors.numbers] || win95Theme.colors.text;
};