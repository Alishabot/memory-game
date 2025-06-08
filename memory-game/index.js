import { ICONS } from './icons.js';

const root = document.getElementById('root');

function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createCard(value, idx, flipped, matched, onClick) {
  const btn = document.createElement('button');
  btn.className = 'memory-card' + (flipped ? ' flipped' : '') + (matched ? ' matched' : '');
  btn.disabled = flipped || matched;
  btn.tabIndex = 0;
  btn.setAttribute('aria-label', 'memory-card');
  btn.innerHTML = flipped || matched ? value : '';
  btn.onclick = onClick;
  return btn;
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function MemoryGame() {
  let gridSize = 4;
  let useIcons = true;
  let cards = [];
  let flipped = [];
  let moves = 0;
  let timer = 0;
  let interval = null;
  let gameStarted = false;
  let modal = null;

  function startGame() {
    moves = 0;
    timer = 0;
    flipped = [];
    matched = [];
    gameStarted = false;
    clearInterval(interval);

    let values;
    if (useIcons) {
      values = ICONS.slice(0, (gridSize * gridSize) / 2);
    } else {
      values = Array.from({ length: (gridSize * gridSize) / 2 }, (_, i) => i + 1);
    }
    cards = shuffle([...values, ...values]).map((val, idx) => ({
      value: val,
      idx,
      flipped: false,
      matched: false,
    }));

    render();
  }

  function flipCard(idx) {
    if (flipped.length === 2 || cards[idx].flipped || cards[idx].matched) return;
    if (!gameStarted) {
      gameStarted = true;
      interval = setInterval(() => {
        timer++;
        render();
      }, 1000);
    }
    cards[idx].flipped = true;
    flipped.push(idx);
    render();

    if (flipped.length === 2) {
      moves++;
      const [i1, i2] = flipped;
      if (cards[i1].value === cards[i2].value) {
        cards[i1].matched = cards[i2].matched = true;
        flipped = [];
        if (cards.every(c => c.matched)) {
          clearInterval(interval);
          setTimeout(showModal, 700);
        }
      } else {
        setTimeout(() => {
          cards[i1].flipped = cards[i2].flipped = false;
          flipped = [];
          render();
        }, 900);
      }
    }
  }

  function showModal() {
    modal = document.createElement('div');
    modal.className = 'memory-modal';
    modal.innerHTML = `
      <div class="memory-modal-content">
        <h2>Felicitări!</h2>
        <ul>
          <li>Mișcări: <b>${moves}</b></li>
          <li>Timp: <b>${formatTime(timer)}</b></li>
          <li>Dimensiune: <b>${gridSize}x${gridSize}</b></li>
          <li>Mod: <b>${useIcons ? 'Iconuri' : 'Numere'}</b></li>
        </ul>
        <button id="restart-btn">Joacă din nou</button>
      </div>
    `;
    modal.querySelector('#restart-btn').onclick = () => {
      modal.remove();
      modal = null;
      startGame();
    };
    document.body.appendChild(modal);
  }

  function render() {
    root.innerHTML = '';
    // Header
    const header = document.createElement('div');
    header.className = 'memory-header';

    // Grid size selector
    const sizeLabel = document.createElement('label');
    sizeLabel.textContent = 'Dimensiune:';
    const sizeSelect = document.createElement('select');
    [4, 6].forEach(sz => {
      const opt = document.createElement('option');
      opt.value = sz;
      opt.textContent = `${sz}x${sz}`;
      if (sz === gridSize) opt.selected = true;
      sizeSelect.appendChild(opt);
    });
    sizeSelect.onchange = e => {
      gridSize = Number(e.target.value);
      startGame();
    };
    sizeLabel.appendChild(sizeSelect);

    // Mode selector
    const modeLabel = document.createElement('label');
    modeLabel.textContent = 'Mod:';
    const modeSelect = document.createElement('select');
    [['Iconuri', true], ['Numere', false]].forEach(([txt, val]) => {
      const opt = document.createElement('option');
      opt.value = val;
      opt.textContent = txt;
      if (val === useIcons) opt.selected = true;
      modeSelect.appendChild(opt);
    });
    modeSelect.onchange = e => {
      useIcons = e.target.value === 'true';
      startGame();
    };
    modeLabel.appendChild(modeSelect);

    // Stats
    const stats = document.createElement('div');
    stats.className = 'memory-stats';
    stats.innerHTML = `
      <span>Mișcări: <b>${moves}</b></span>
      <span>Timp: <b>${formatTime(timer)}</b></span>
    `;

    // Reset button
    const resetBtn = document.createElement('button');
    resetBtn.className = 'memory-reset-btn';
    resetBtn.textContent = 'Reset';
    resetBtn.onclick = startGame;

    header.append(sizeLabel, modeLabel, stats, resetBtn);
    root.appendChild(header);

    // Grid
    const grid = document.createElement('div');
    grid.className = 'memory-grid';
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    cards.forEach((card, idx) => {
      grid.appendChild(
        createCard(
          useIcons ? card.value : card.value,
          idx,
          card.flipped,
          card.matched,
          () => flipCard(idx)
        )
      );
    });

    root.appendChild(grid);
  }

  startGame();
}

MemoryGame();