import { useState, useEffect, useCallback } from 'react'

const generateCards = (pairs) => {
  const cards = []
  for (let i = 1; i <= pairs; i++) {
    cards.push({ id: i * 2 - 1, value: i, isFlipped: false, isMatched: false })
    cards.push({ id: i * 2, value: i, isFlipped: false, isMatched: false })
  }
  return cards.sort(() => Math.random() - 0.5)
}

const difficultySettings = {
  easy: { pairs: 6, gridCols: 3 },
  medium: { pairs: 8, gridCols: 4 },
  hard: { pairs: 12, gridCols: 4 },
  expert: { pairs: 18, gridCols: 6 }
}

function App() {
  const [difficulty, setDifficulty] = useState('medium')
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  const initializeGame = useCallback(() => {
    const { pairs } = difficultySettings[difficulty]
    setCards(generateCards(pairs))
    setFlippedCards([])
    setMoves(0)
    setGameWon(false)
  }, [difficulty])

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

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

  const { gridCols } = difficultySettings[difficulty]

  return (
    <div className="memory-game">
      <div className="memory-header">
        <div>
          <label htmlFor="difficulty">Difficulty:</label>
          <select 
            id="difficulty"
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy (6 pairs)</option>
            <option value="medium">Medium (8 pairs)</option>
            <option value="hard">Hard (12 pairs)</option>
            <option value="expert">Expert (18 pairs)</option>
          </select>
        </div>
        
        <div className="memory-stats">
          <span>Moves: {moves}</span>
          {gameWon && <span className="memory-win">🎉 You Won!</span>}
        </div>
        
        <button className="memory-reset-btn" onClick={initializeGame}>
          New Game
        </button>
      </div>

      <div 
        className="memory-grid" 
        style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`memory-card ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="memory-card-inner">
              <div className="memory-card-front">?</div>
              <div className="memory-card-back">{card.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
