# 🖥️ Win95Games

A collection of classic Windows 95 games built with Next.js, TypeScript, and React. Deploy to Vercel with one click!

## 🚀 Features

- **6 Classic Games**: Minesweeper, Tetris, Arkanoid, Snake, 2048, and Pong
- **Windows 95 UI**: Authentic retro desktop experience with windows and menus
- **Beautiful UI**: Modern implementation of classic games with smooth animations
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **TypeScript**: Full type safety for better development experience
- **Accessibility**: Proper ARIA labels and keyboard support

## 🎮 Available Games

1. **Minesweeper** - Clear a minefield by uncovering safe squares while avoiding hidden mines
2. **Tetris** - Arrange falling blocks to create complete horizontal lines
3. **Arkanoid** - Break all bricks with a bouncing ball and paddle
4. **Snake** - Guide a growing snake to eat food while avoiding walls and your tail
5. **2048** - Slide numbered tiles to combine them and reach 2048
6. **Pong** - Classic two-player paddle game

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alexyaroshuk/Win95Games.git
cd Win95Games
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click!

## 🎨 Customization

- **Colors**: Modify the color scheme in `tailwind.config.ts`
- **Games**: Add new games in the `src/games/` directory
- **Windows**: Customize window appearance in `src/components/desktop/`

## 📱 Responsive Design

The game automatically adapts to different screen sizes:
- **Mobile**: Smaller cells, optimized touch controls
- **Tablet**: Medium-sized cells
- **Desktop**: Full-sized cells with hover effects

## 🔧 Development

### Project Structure
```
src/
├── app/                 # Next.js app router
├── components/          # React components
│   └── desktop/         # Desktop UI components
│       └── games/       # Game wrapper components
├── games/               # Individual game implementations
│   ├── minesweeper/     # Minesweeper game
│   ├── tetris/          # Tetris game
│   ├── arkanoid/        # Arkanoid game
│   ├── snake/           # Snake game
│   ├── 2048/            # 2048 puzzle game
│   └── pong/            # Pong game
```

### Key Components

- **Desktop Environment**: Windows 95-style desktop with window management
- **Game Windows**: Individual windows for each game with minimize/maximize/close controls
- **Game Library**: 6 fully playable classic games
- **Retro UI**: Authentic Windows 95 look and feel

## 🎯 Features

- Authentic Windows 95 desktop experience
- Multiple classic games in one application
- Window management with minimize, maximize, and close
- Retro UI with modern performance

## 🚀 Performance Features

- Efficient React rendering with proper memoization
- Optimized game board updates
- Responsive design with CSS Grid
- Smooth animations and transitions

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Enjoy playing Win95Games! 🎉**
