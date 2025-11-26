import { useState, useEffect, useCallback } from 'react'

const icons = [
  '⚓', '👤', '⚙️', '🎄', '🧿', '🎲',
  '⭐', '🔔', '🌸', '🎈', '🎁', '🔑',
  '🌙', '☀️', '💎', '🎵', '🦴', '🧲'
]

const generateCards = (pairs) => {
  const cards = []
  for (let i = 0; i < pairs; i++) {
    cards.push({ id: i * 2, value: i, icon: icons[i], isFlipped: false, isMatched: false })
    cards.push({ id: i * 2 + 1, value: i, icon: icons[i], isFlipped: false, isMatched: false })
  }
  return cards.sort(() => Math.random() - 0.5)
}

function App() {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [theme, setTheme] = useState('icon')
  const [gridSize, setGridSize] = useState('6x6')

  const getCardCount = () => {
    return gridSize === '4x4' ? 8 : 18
  }

  const generateIconCards = (pairs) => {
    const icons = [
      '⚓', '👤', '⚙️', '🎄', '🧿', '🎲',
      '⭐', '🔔', '🌸', '🎈', '🎁', '🔑',
      '🌙', '☀️', '💎', '🎵', '🦴', '🧲'
    ]
    const cards = []
    for (let i = 0; i < pairs; i++) {
      cards.push({ id: i * 2, value: i, icon: icons[i], isFlipped: false, isMatched: false })
      cards.push({ id: i * 2 + 1, value: i, icon: icons[i], isFlipped: false, isMatched: false })
    }
    return cards.sort(() => Math.random() - 0.5)
  }

  const generateNumberCards = (pairs) => {
    const cards = []
    for (let i = 1; i <= pairs; i++) {
      cards.push({ id: i * 2 - 1, value: i, icon: i.toString(), isFlipped: false, isMatched: false })
      cards.push({ id: i * 2, value: i, icon: i.toString(), isFlipped: false, isMatched: false })
    }
    return cards.sort(() => Math.random() - 0.5)
  }

  const startGame = useCallback(() => {
    const pairs = getCardCount()
    const newCards = theme === 'icon' ? generateIconCards(pairs) : generateNumberCards(pairs)
    setCards(newCards)
    setFlippedCards([])
    setMoves(0)
    setGameWon(false)
    setElapsedTime(0)
    setGameStarted(true)
  }, [theme, gridSize])

  const initializeGame = useCallback(() => {
    const pairs = getCardCount()
    const newCards = theme === 'icon' ? generateIconCards(pairs) : generateNumberCards(pairs)
    setCards(newCards)
    setFlippedCards([])
    setMoves(0)
    setGameWon(false)
    setElapsedTime(0)
  }, [theme, gridSize])

  useEffect(() => {
    if (gameStarted) {
      initializeGame()
    }
  }, [gameStarted, initializeGame])

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards
      if (cards[first].value === cards[second].value) {
        // Match found
        setCards(prev => prev.map((card, index) => 
          index === first || index === second 
            ? { ...card, isMatched: true }
            : card
        ))
        setFlippedCards([])
        setMoves(prev => prev + 1)
        
        // Check if game is won
        const newCards = cards.map((card, index) => 
          index === first || index === second 
            ? { ...card, isMatched: true }
            : card
        )
        if (newCards.every(card => card.isMatched)) {
          setGameWon(true)
        }
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setCards(prev => prev.map((card, index) => 
            index === first || index === second 
              ? { ...card, isFlipped: false }
              : card
          ))
          setFlippedCards([])
          setMoves(prev => prev + 1)
        }, 1000)
      }
    }
  }, [flippedCards, cards])

  const handleCardClick = (index) => {
    if (flippedCards.length >= 2 || cards[index].isFlipped || cards[index].isMatched) {
      return
    }

    setCards(prev => prev.map((card, i) => 
      i === index ? { ...card, isFlipped: true } : card
    ))
    setFlippedCards(prev => [...prev, index])
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (!gameStarted) {
    return (
      <div className="memory-setup">
        <h1 className="memory-setup-title">memory</h1>
        <div className="memory-setup-container">
          <div className="memory-setup-section">
            <h2>Select Theme</h2>
            <div className="memory-setup-buttons">
              <button
                className={`memory-theme-btn ${theme === 'numbers' ? 'active' : ''}`}
                onClick={() => setTheme('numbers')}
              >
                NUMBERS
              </button>
              <button
                className={`memory-theme-btn ${theme === 'icon' ? 'active' : ''}`}
                onClick={() => setTheme('icon')}
              >
                ICON
              </button>
            </div>
          </div>

          <div className="memory-setup-section">
            <h2>Grid Size</h2>
            <div className="memory-setup-buttons">
              <button
                className={`memory-grid-btn ${gridSize === '4x4' ? 'active' : ''}`}
                onClick={() => setGridSize('4x4')}
              >
                4x4
              </button>
              <button
                className={`memory-grid-btn ${gridSize === '6x6' ? 'active' : ''}`}
                onClick={() => setGridSize('6x6')}
              >
                6x6
              </button>
            </div>
          </div>

          <button className="memory-start-btn" onClick={startGame}>
            Start Game
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="memory-game-container">
      <div className="memory-header">
        <h1 className="memory-title">memory</h1>
        
        <div className="memory-button-group">
          <button className="memory-restart-btn" onClick={() => setGameStarted(false)}>
            Menu
          </button>
        </div>
      </div>

      <div className="memory-grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`memory-card ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="memory-card-inner">
              <div className="memory-card-front">?</div>
              <div className="memory-card-back">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="memory-footer">
        <span>Time: {formatTime(elapsedTime)}</span>
        <span>Moves: {moves}</span>
        {gameWon && <span className="memory-win">🎉 You Won!</span>}
      </div>
    </div>
    </div>
  )
}

export default App
