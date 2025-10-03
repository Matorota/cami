import { useEffect, useMemo, useState } from "react";

type Props = {
  onFinish: (result: { moves: number; time: number }) => void;
  pairs?: number;
};

type Card = {
  id: number;
  pairKey: string;
  img: string;
  matched: boolean;
};

export default function CatMemoryGame({ onFinish, pairs = 8 }: Props) {
  const [deck, setDeck] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]); // card ids
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(true);

  // Build deck
  const buildDeck = useMemo(() => {
    return () => {
      const now = Date.now();
      const cards: Card[] = [];
      for (let i = 0; i < pairs; i++) {
        const key = `${now}-${i}`;
        // Use cataas.com for cat images; same URL for both of a pair
        const url = `https://cataas.com/cat?width=280&height=280&ts=${key}`;
        cards.push({ id: i * 2, pairKey: key, img: url, matched: false });
        cards.push({ id: i * 2 + 1, pairKey: key, img: url, matched: false });
      }
      // Shuffle
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      return cards;
    };
  }, [pairs]);

  useEffect(() => {
    setDeck(buildDeck());
    setMoves(0);
    setMatchedPairs(0);
    setElapsed(0);
    setRunning(true);
  }, [buildDeck]);

  // timer
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (matchedPairs === pairs && pairs > 0) {
      setRunning(false);
      const t = setTimeout(() => onFinish({ moves, time: elapsed }), 400);
      return () => clearTimeout(t);
    }
  }, [matchedPairs, pairs, onFinish, moves, elapsed]);

  const onCardClick = (card: Card, idx: number) => {
    if (!running) return;
    if (card.matched) return;
    if (flipped.includes(idx)) return;

    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [i1, i2] = newFlipped;
      const c1 = deck[i1];
      const c2 = deck[i2];
      if (c1.pairKey === c2.pairKey) {
        // match
        setTimeout(() => {
          setDeck((d) =>
            d.map((c, i) =>
              i === i1 || i === i2 ? { ...c, matched: true } : c
            )
          );
          setMatchedPairs((k) => k + 1);
          setFlipped([]);
        }, 250);
      } else {
        // no match
        setTimeout(() => setFlipped([]), 700);
      }
    } else if (newFlipped.length > 2) {
      setFlipped([idx]);
    }
  };

  const restart = () => {
    setDeck(buildDeck());
    setFlipped([]);
    setMoves(0);
    setMatchedPairs(0);
    setElapsed(0);
    setRunning(true);
  };

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-pink-600 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
            Cat Memory Match
          </h2>
          <p className="text-sm text-slate-600">
            Flip two cards to find a pair. Match them all to win!
          </p>
          <p className="text-sm text-slate-600">
            Made a mini game just for u reeee! Random every time cats!
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="rounded-full bg-white/70 px-3 py-1 border border-pink-200/60">
            Moves: <b>{moves}</b>
          </span>
          <span className="rounded-full bg-white/70 px-3 py-1 border border-pink-200/60">
            Time: <b>{elapsed}s</b>
          </span>
          <button
            onClick={restart}
            className="rounded-lg border border-pink-300/60 bg-white/70 px-3 py-1 hover:bg-white"
          >
            Restart
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {deck.map((card, idx) => {
          const isFlipped = card.matched || flipped.includes(idx);
          return (
            <button
              key={card.id}
              onClick={() => onCardClick(card, idx)}
              className="relative aspect-square overflow-hidden rounded-2xl border border-pink-200/70 bg-white/70 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              aria-label={card.matched ? "Matched" : "Hidden card"}
            >
              {/* front (image) */}
              <img
                src={card.img}
                alt="cat"
                className={`absolute inset-0 h-full w-full object-cover transition duration-300 ${
                  isFlipped ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                loading="lazy"
              />
              {/* back */}
              <div
                className={`absolute inset-0 flex items-center justify-center text-4xl transition duration-300 ${
                  isFlipped ? "opacity-0 scale-105" : "opacity-100 scale-100"
                }`}
              >
                🐾
              </div>
              {card.matched && (
                <div className="absolute inset-0 bg-pink-500/10" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
