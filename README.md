# Memory Game

A beautiful and responsive memory card matching game built with React and Vite.

## Features

- 🎮 Multiple difficulty levels (Easy, Medium, Hard, Expert)
- 🎨 Smooth card flip animations
- 🏆 Move counter and win detection
- 📱 Responsive design for mobile and desktop
- 🎯 Clean, modern UI

## How to Play

1. Choose your difficulty level
2. Click on cards to flip them and reveal the numbers
3. Try to find matching pairs
4. Match all pairs to win the game!
5. Try to complete the game in as few moves as possible

## Difficulty Levels

- **Easy**: 6 pairs (3x4 grid)
- **Medium**: 8 pairs (4x4 grid)
- **Hard**: 12 pairs (4x6 grid)
- **Expert**: 18 pairs (6x6 grid)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/memory-game.git
   cd memory-game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technologies Used

- React 18
- Vite
- CSS3 (with animations)
- ESLint for code quality

## Project Structure

```
memory-game/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.jsx          # Main game component
│   ├── App.css          # App-specific styles
│   └── main.jsx         # Entry point
├── MemoryGame.css       # Game styles
├── index.html           # HTML template
├── package.json
└── vite.config.js
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with React and Vite
- Inspired by classic memory card games
- Icons and design elements created with modern CSS
