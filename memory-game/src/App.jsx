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

  const initializeGame = useCallback(() => {
    setCards(generateCards(18))
    setFlippedCards([])
    setMoves(0)
    setGameWon(false)
    setElapsedTime(0)
  }, [])

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

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

  return (
    <div className="memory-game">
      <div className="memory-header">
        <h1 className="memory-title">memory</h1>
        
        <div className="memory-button-group">
          <button className="memory-restart-btn" onClick={initializeGame}>
            Restart
          </button>
          <button className="memory-new-game-btn" onClick={initializeGame}>
            New Game
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
  )
}

export default App
