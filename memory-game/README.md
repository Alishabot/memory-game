# Memory Game (React)

Un joc de memorie responsive, cu două dimensiuni de grilă și opțiuni de mod (iconuri sau numere).
- **Grilă:** 4x4 sau 6x6
- **Mod:** Iconuri sau numere
- **Statistici:** Mișcări, timp, modal la final
- **Experiență fluidă:** Se joacă perfect pe mobil sau desktop

## Cum se folosește

1. Copiază fișierele `MemoryGame.tsx` și `MemoryGame.css` într-un proiect React.
2. Importează și folosește componenta:

```tsx
import MemoryGame from "./MemoryGame";
import "./MemoryGame.css";

function App() {
  return <MemoryGame />;
}
```

## Caracteristici

- Selectezi dimensiunea grilei și modul de joc.
- Mișcările și timpul sunt afișate în timp real.
- Jocul se poate reseta oricând.
- La final, apare un modal cu statistici și opțiunea de a rejuca.

## UX

- Cardurile și modalul sunt optimizate pentru orice dimensiune de ecran.
- Navigare accesibilă și interacțiune rapidă.

---