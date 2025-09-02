// Classic Arkanoid 33 levels recreation
// S = Silver (unbreakable), D = Gold (2+ hits), W = White, O = Orange, C = Cyan, 
// G = Green, R = Red, B = Blue, M = Magenta, Y = Yellow, . = empty

export const CLASSIC_LEVELS = [
  // Level 1 - Classic first level
  [
    '.............',
    '.SSSSSSSSSSS.',
    '.WWWWWWWWWWW.',
    '.OOOOOOOOOOO.',
    '.CCCCCCCCCCC.',
    '.GGGGGGGGGGG.',
    '.RRRRRRRRRRR.',
    '.BBBBBBBBBBB.'
  ],
  
  // Level 2 - Double layer
  [
    '.............',
    '.WWWWWWWWWWW.',
    '.OOOOOOOOOOO.',
    '.............',
    '.............',
    '.GGGGGGGGGGG.',
    '.RRRRRRRRRRR.',
    '.............'
  ],
  
  // Level 3 - Space Invader (iconic level)
  [
    '...RR...RR...',
    '..RRRRRRRR...',
    '.RRRRRRRRRRR.',
    'RRR.RRRR.RRRR',
    'RRRRRRRRRRRRR',
    '.RRRRRRRRRR..',
    '..RR.RR.RR...',
    '.R...R...R...'
  ],
  
  // Level 4 - Diamond
  [
    '......W......',
    '.....WWW.....',
    '....OOOOO....',
    '...CCCCCCC...',
    '..GGGGGGGGG..',
    '...RRRRRRR...',
    '....BBBBB....',
    '.....YYY.....'
  ],
  
  // Level 5 - Side walls
  [
    'SSS.......SSS',
    'RRR.......RRR',
    'OOO.......OOO',
    'YYY.......YYY',
    'GGG.......GGG',
    'CCC.......CCC',
    'BBB.......BBB',
    'WWW.......WWW'
  ],
  
  // Level 6 - Checkerboard
  [
    'W.W.W.W.W.W.W',
    '.R.R.R.R.R.R.',
    'Y.Y.Y.Y.Y.Y.Y',
    '.B.B.B.B.B.B.',
    'G.G.G.G.G.G.G',
    '.C.C.C.C.C.C.',
    'O.O.O.O.O.O.O',
    '.W.W.W.W.W.W.'
  ],
  
  // Level 7 - Cross
  [
    '.....RRR.....',
    '.....RRR.....',
    '.....RRR.....',
    'GGGGGGGGGGGGG',
    'GGGGGGGGGGGGG',
    '.....BBB.....',
    '.....BBB.....',
    '.....BBB.....'
  ],
  
  // Level 8 - Pyramid
  [
    '......S......',
    '.....SSS.....',
    '....WWWWW....',
    '...OOOOOOO...',
    '..CCCCCCCCC..',
    '.GGGGGGGGGGG.',
    'RRRRRRRRRRRRR',
    '.............'
  ],
  
  // Level 9 - Two blocks
  [
    'DDDDDD.DDDDDD',
    'DDDDDD.DDDDDD',
    'GGGGGG.GGGGGG',
    'GGGGGG.GGGGGG',
    'RRRRRR.RRRRRR',
    'RRRRRR.RRRRRR',
    'BBBBBB.BBBBBB',
    'BBBBBB.BBBBBB'
  ],
  
  // Level 10 - Alternating columns
  [
    'W.O.C.G.R.B.Y',
    'W.O.C.G.R.B.Y',
    'W.O.C.G.R.B.Y',
    'W.O.C.G.R.B.Y',
    'W.O.C.G.R.B.Y',
    'W.O.C.G.R.B.Y',
    'W.O.C.G.R.B.Y',
    'W.O.C.G.R.B.Y'
  ],
  
  // Level 11 - Center block with gold
  [
    '............',
    '....DDDD....',
    '....DDDD....',
    '....DDDD....',
    '....DDDD....',
    '............',
    'WWWWWWWWWWWW',
    'SSSSSSSSSSSS'
  ],
  
  // Level 12 - Inverse pyramid
  [
    'RRRRRRRRRRRR',
    '.BBBBBBBBBB.',
    '..GGGGGGGG..',
    '...CCCCCC...',
    '....OOOO....',
    '.....WW.....',
    '............',
    '............'
  ],
  
  // Level 13 - Four squares
  [
    'RRR...YYY...',
    'RRR...YYY...',
    'RRR...YYY...',
    '............',
    '...BBB...GGG',
    '...BBB...GGG',
    '...BBB...GGG',
    '............'
  ],
  
  // Level 14 - Diagonal pattern
  [
    'R...........',
    '.R..........',
    '..Y.........',
    '...Y........',
    '....G.......',
    '.....G......',
    '......B.....',
    '.......B....'
  ],
  
  // Level 15 - Solid wall with gaps
  [
    'WWWWWWWWWWWW',
    'OOOOOOOOOOOO',
    '............',
    'CCCCCCCCCCCC',
    'GGGGGGGGGGGG',
    '............',
    'RRRRRRRRRRRR',
    'BBBBBBBBBBBB'
  ],
  
  // Level 16 - X pattern
  [
    'R..........R',
    '.R........R.',
    '..R......R..',
    '...R....R...',
    '....R..R....',
    '.....RR.....',
    '............',
    '............'
  ],
  
  // Level 17 - Fortress
  [
    'SSSSSSSSSSSS',
    'S..........S',
    'S.DDDDDDDDD.S',
    'S.D......D.S',
    'S.D......D.S',
    'S.DDDDDDDDD.S',
    'S..........S',
    'SSSSSSSSSSSS'
  ],
  
  // Level 18 - Three columns
  [
    'WWW.WWW.WWW.',
    'OOO.OOO.OOO.',
    'CCC.CCC.CCC.',
    'GGG.GGG.GGG.',
    'RRR.RRR.RRR.',
    'BBB.BBB.BBB.',
    'MMM.MMM.MMM.',
    'YYY.YYY.YYY.'
  ],
  
  // Level 19 - Hourglass
  [
    'RRRRRRRRRRRR',
    '.YYYYYYYYYY.',
    '..GGGGGGGG..',
    '...CCCCCC...',
    '...CCCCCC...',
    '..BBBBBBBB..',
    '.OOOOOOOOOO.',
    'WWWWWWWWWWWW'
  ],
  
  // Level 20 - Snake pattern
  [
    'RRRRRRRRRR..',
    '..........R.',
    '.GGGGGGGGGG.',
    '.G..........',
    '.BBBBBBBBBB.',
    '..........B.',
    '.YYYYYYYYYY.',
    '............'
  ],
  
  // Level 21 - Plus with gold center
  [
    '....RRRR....',
    '....RRRR....',
    '....RRRR....',
    'GGGGGGGGGGGG',
    'GGGGGGGGGGGG',
    '....BBBB....',
    '....BBBB....',
    '....BBBB....'
  ],
  
  // Level 22 - Maze-like
  [
    'W.W.W.W.W.W.',
    '............',
    'RRRR.RRR.RRR',
    '............',
    'G.GGG.GGG.GG',
    '............',
    'BB.BBB.BB.BB',
    '............'
  ],
  
  // Level 23 - Crown shape
  [
    'W..W....W..W',
    'W..W....W..W',
    'WWWWWWWWWWWW',
    'YYYYYYYYYYYY',
    '.GGGGGGGGGG.',
    '..RRRRRRRR..',
    '...BBBBBB...',
    '............'
  ],
  
  // Level 24 - Scattered blocks
  [
    'RR....YY....',
    '............',
    '...GG....BB.',
    '............',
    'CC....OO....',
    '............',
    '...WW....MM.',
    '............'
  ],
  
  // Level 25 - V formation
  [
    'R..........R',
    '.Y........Y.',
    '..G......G..',
    '...B....B...',
    '....C..C....',
    '.....OO.....',
    '............',
    '............'
  ],
  
  // Level 26 - Complex pattern
  [
    'SSSSSSSSSSSS',
    'RRRR....RRRR',
    'YYYY....YYYY',
    'GGGG....GGGG',
    'BBBB....BBBB',
    'CCCC....CCCC',
    'OOOO....OOOO',
    'SSSSSSSSSSSS'
  ],
  
  // Level 27 - Spiral-like
  [
    'RRRRRRRRRRRR',
    '...........R',
    'GGGGGGGGGG.R',
    'G..........R',
    'G.BBBBBBBB.R',
    'G.B........R',
    'G.BBBBBBBBBB',
    'G...........'
  ],
  
  // Level 28 - Double diamond
  [
    '...RR..RR...',
    '..RRRRRRRR..',
    '.RRRRRRRRRR.',
    '..RRRRRRRR..',
    '...RR..RR...',
    '..BB....BB..',
    '.BBBB..BBBB.',
    '..BB....BB..'
  ],
  
  // Level 29 - Butterfly
  [
    'RRR......RRR',
    'RRRR....RRRR',
    '.RRRR..RRRR.',
    '..RRRRRRRR..',
    '..BBBBBBBB..',
    '.BBBB..BBBB.',
    'BBBB....BBBB',
    'BBB......BBB'
  ],
  
  // Level 30 - Tough gold level
  [
    'DDDDDDDDDDDD',
    'DDDDDDDDDDDD',
    'SSSSSSSSSSSS',
    'DDDDDDDDDDDD',
    'DDDDDDDDDDDD',
    'SSSSSSSSSSSS',
    'DDDDDDDDDDDD',
    'DDDDDDDDDDDD'
  ],
  
  // Level 31 - Almost there
  [
    'S.S.S.S.S.S.',
    '.D.D.D.D.D.D',
    'D.D.D.D.D.D.',
    '.D.D.D.D.D.D',
    'D.D.D.D.D.D.',
    '.D.D.D.D.D.D',
    'D.D.D.D.D.D.',
    '.S.S.S.S.S.S'
  ],
  
  // Level 32 - Pre-boss challenge
  [
    'SSSSSSSSSSSS',
    'DDDDDDDDDDDD',
    'RRRRRRRRRRRR',
    'YYYYYYYYYYYY',
    'BBBBBBBBBBBB',
    'CCCCCCCCCCCC',
    'OOOOOOOOOOOO',
    'WWWWWWWWWWWW'
  ],
  
  // Level 33 - Final level before DOH
  [
    'SDSDSDSDSDSD',
    'DSDSDSDSDSDS',
    'SDSDSDSDSDSD',
    'DSDSDSDSDSDS',
    'SDSDSDSDSDSD',
    'DSDSDSDSDSDS',
    'SDSDSDSDSDSD',
    'DSDSDSDSDSDS'
  ]
];

// Map characters to brick properties
export const BRICK_MAP: Record<string, { color: string; hits: number; points: number } | null> = {
  'S': { color: '#c0c0c0', hits: -1, points: 0 },     // Silver - unbreakable
  'D': { color: '#ffd700', hits: 2, points: 150 },    // Gold (Dorado) - 2 hits
  'G': { color: '#00ff00', hits: 1, points: 80 },     // Green
  'W': { color: '#ffffff', hits: 1, points: 50 },     // White
  'O': { color: '#ff8c00', hits: 1, points: 60 },     // Orange
  'C': { color: '#00ffff', hits: 1, points: 70 },     // Cyan
  'R': { color: '#ff0000', hits: 1, points: 90 },     // Red
  'B': { color: '#0000ff', hits: 1, points: 100 },    // Blue
  'M': { color: '#ff00ff', hits: 1, points: 110 },    // Magenta
  'Y': { color: '#ffff00', hits: 1, points: 120 },    // Yellow
  '.': null  // Empty space
};