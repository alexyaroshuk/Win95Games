import { GameInfo } from './components/HelpDialog';

export const minesweeperInfo: GameInfo = {
  name: 'Minesweeper',
  description: 'The classic puzzle game where you clear a minefield by uncovering safe squares while avoiding hidden mines. Use logic and deduction to flag all mines and reveal all safe squares.',
  icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Minesweeper_flag.svg/120px-Minesweeper_flag.svg.png',
  screenshot: 'https://images.launchbox-app.com/fd4a76c1-3b72-4d86-ab81-6e75bb0cde57.jpg',
  screenshotAlt: 'Classic Windows Minesweeper game showing the minefield grid with numbers and flags',
  credits: {
    original: 'Robert Donner and Curt Johnson at Microsoft',
    version: 'Windows 95 Version',
    year: '1990 (Original), 1995 (Windows 95)'
  },
  howToPlay: {
    objective: 'Clear the minefield by revealing all safe squares without detonating any mines. Use the numbered clues to deduce mine locations and flag them for safety.',
    gameplayImage: 'https://cdn.instructables.com/FQK/5MKY/HZ7L2SAP/FQK5MKYHZ7L2SAP.png',
    controls: [
      { control: 'Left Click', action: 'Reveal a square' },
      { control: 'Right Click', action: 'Place/remove a flag' },
      { control: 'Middle Click', action: 'Reveal adjacent squares (if flagged correctly)' },
      { control: 'F2', action: 'Start a new game' }
    ],
    rules: [
      'The first click is always safe and never reveals a mine',
      'Numbers indicate how many mines are in the 8 adjacent squares',
      'Flagged squares cannot be revealed until the flag is removed',
      'The game is won when all non-mine squares are revealed',
      'The game is lost if you reveal a square containing a mine'
    ],
    tips: [
      'Start with corners and edges - they have fewer adjacent squares',
      'If a number equals the count of adjacent unrevealed squares, they are all mines',
      'If a number equals the count of adjacent flags, remaining squares are safe',
      'Use the question mark feature to mark uncertain squares',
      'Double-click a satisfied number to quickly reveal adjacent safe squares'
    ]
  }
};

export const tetrisInfo: GameInfo = {
  name: 'Tetris',
  description: 'The legendary falling blocks puzzle game. Arrange falling tetromino pieces to create complete horizontal lines and prevent the stack from reaching the top.',
  icon: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Tetris_logo.png',
  screenshot: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Tetris-VeryFirstVersion.png?20170701070210',
  screenshotAlt: 'The first version of Tetris, completed in 1985, run on an emulator of the Elektronika 60',
  credits: {
    original: 'Alexey Pajitnov',
    version: 'Classic Version',
    year: '1984 (Original Soviet version)'
  },
  howToPlay: {
    objective: 'Arrange falling tetromino pieces to create complete horizontal lines. When a line is completed, it disappears and you earn points. The game ends when pieces stack up to the top.',
    gameplayImage: 'https://tetris.com/sites/default/files/inline-images/Tetris_Line_Clear.gif',
    controls: [
      { control: 'Left/Right Arrow', action: 'Move piece horizontally' },
      { control: 'Down Arrow', action: 'Soft drop (faster fall)' },
      { control: 'Up Arrow', action: 'Rotate piece clockwise' },
      { control: 'Space', action: 'Hard drop (instant drop)' },
      { control: 'P', action: 'Pause/Resume game' }
    ],
    rules: [
      'Seven different tetromino pieces (I, O, T, S, Z, J, L) fall from the top',
      'Pieces can be rotated and moved while falling',
      'Complete horizontal lines disappear and grant points',
      'The game speeds up as you progress through levels',
      'Game ends when a new piece cannot enter the playfield'
    ],
    tips: [
      'Keep the stack flat to maximize options for piece placement',
      'Save the I-piece for clearing multiple lines at once (Tetris)',
      'Learn to use both clockwise and counter-clockwise rotations',
      'Avoid creating deep wells that can only be filled by I-pieces',
      'Practice "T-spins" for advanced scoring opportunities'
    ]
  }
};

export const arkanoidInfo: GameInfo = {
  name: 'Arkanoid',
  description: 'The classic brick-breaking arcade game. Control a paddle to bounce a ball and destroy all bricks while collecting power-ups and avoiding losing the ball.',
  icon: 'https://upload.wikimedia.org/wikipedia/en/a/ac/Arkanoid_arcadeflyer.png',
  screenshot: 'https://upload.wikimedia.org/wikipedia/en/a/a2/Arkanoid.png',
  screenshotAlt: 'The start of a level (arcade version)',
  credits: {
    original: 'Taito Corporation',
    version: 'Arcade Classic',
    year: '1986'
  },
  howToPlay: {
    objective: 'Break all the bricks on the screen by bouncing a ball off your paddle. Collect power-ups to gain advantages and complete all levels to win the game.',
    gameplayImage: 'https://i.imgur.com/6SbxI3J.gif',
    controls: [
      { control: 'Left/Right Arrow', action: 'Move paddle' },
      { control: 'Mouse', action: 'Move paddle (alternative)' },
      { control: 'Space', action: 'Launch ball / Pause game' }
    ],
    rules: [
      'The ball bounces off walls, bricks, and your paddle',
      'Breaking bricks earns points; some bricks require multiple hits',
      'Losing all balls ends the game',
      'Power-ups fall from broken bricks and can be caught with the paddle',
      'Complete a level by destroying all breakable bricks'
    ],
    tips: [
      'Angle the ball by hitting it with different parts of the paddle',
      'Hit the ball with the paddle edges for sharper angles',
      'Some power-ups can be risky - choose wisely',
      'Focus on breaking clusters of bricks for higher scores',
      'Save multi-ball power-ups for when few bricks remain'
    ]
  }
};

export const snakeInfo: GameInfo = {
  name: 'Snake',
  description: 'The timeless arcade game where you guide a growing snake to eat food while avoiding walls and your own tail. Simple to learn, challenging to master.',
  icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Snake_can_be_completed.gif/220px-Snake_can_be_completed.gif',
  screenshot: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Cgasnake.png',
  screenshotAlt: 'Snake on an IBM PC rendered in a text mode',
  credits: {
    original: 'Gremlin Industries',
    version: 'Nokia 6110 Version popularized the game',
    year: '1976 (Original arcade), 1997 (Nokia mobile)'
  },
  howToPlay: {
    objective: 'Guide the snake to eat food and grow longer. Each piece of food makes the snake grow by one segment. Avoid hitting walls or your own tail to survive as long as possible.',
    gameplayImage: 'https://i.imgur.com/NqKRRuV.gif',
    controls: [
      { control: 'Arrow Keys', action: 'Change snake direction' },
      { control: 'W/A/S/D', action: 'Alternative controls' },
      { control: 'Space', action: 'Pause/Resume game' },
      { control: 'R', action: 'Restart game' }
    ],
    rules: [
      'The snake moves continuously in the current direction',
      'Eating food increases your score and snake length',
      'The snake cannot move backward into itself',
      'Game ends if the snake hits a wall or its own body',
      'Speed increases as your score grows'
    ],
    tips: [
      'Plan your path ahead - the snake keeps growing',
      'Use the edges efficiently to maximize space',
      'Create patterns to avoid trapping yourself',
      'Stay calm as the speed increases',
      'Leave escape routes when coiling'
    ]
  }
};

export const game2048Info: GameInfo = {
  name: '2048',
  description: 'A sliding tile puzzle game where you combine numbered tiles to create a tile with the number 2048. Simple mechanics with deep strategic gameplay.',
  icon: 'https://raw.githubusercontent.com/gabrielecirulli/2048/master/meta/apple-touch-icon.png',
  screenshot: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/2048_win.png',
  screenshotAlt: 'A completed game. The 2048 tile is in the bottom-right corner',
  credits: {
    original: 'Gabriele Cirulli',
    version: 'Original web version',
    year: '2014'
  },
  howToPlay: {
    objective: 'Slide numbered tiles on a 4×4 grid to combine them and create a tile with the number 2048. When two tiles with the same number touch, they merge into one with their sum.',
    gameplayImage: 'https://raw.githubusercontent.com/gabrielecirulli/2048/master/meta/og_image.png',
    controls: [
      { control: 'Arrow Keys', action: 'Slide all tiles in that direction' },
      { control: 'W/A/S/D', action: 'Alternative controls' },
      { control: 'R', action: 'Restart game' },
      { control: 'Z', action: 'Undo last move (if enabled)' }
    ],
    rules: [
      'Tiles slide as far as possible in the chosen direction',
      'When two tiles with the same number collide, they merge into one',
      'After each move, a new tile (2 or 4) appears randomly',
      'The game ends when no more moves are possible',
      'Win by creating a 2048 tile (but you can continue playing)'
    ],
    tips: [
      'Keep your highest value tile in a corner',
      'Build chains of decreasing values from that corner',
      'Avoid moving your highest tile away from its corner',
      'Plan moves ahead to create merging opportunities',
      'Try to keep the board as organized as possible'
    ]
  }
};