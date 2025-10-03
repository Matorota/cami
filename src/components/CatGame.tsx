import { useEffect, useRef, useState } from "react";

type Props = {
  onFinish: (score: number) => void;
  durationSec?: number;
};

type Item = { x: number; y: number; vy: number; r: number; hue: number };

export default function CatGame({ onFinish, durationSec = 20 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(durationSec);
  const [running, setRunning] = useState(true);

  // Game constants
  const width = 640;
  const height = 400;
  const catW = 80;
  const catH = 24;
  const catY = height - 40;
  const speed = 6;

  // Game state (refs so RAF can mutate without re-render)
  const catXRef = useRef(width / 2 - catW / 2);
  const keys = useRef({ left: false, right: false });
  const itemsRef = useRef<Item[]>([]);
  const lastSpawnRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent, down: boolean) => {
      if (["ArrowLeft", "a", "A"].includes(e.key)) keys.current.left = down;
      if (["ArrowRight", "d", "D"].includes(e.key)) keys.current.right = down;
    };
    const down = (e: KeyboardEvent) => onKey(e, true);
    const up = (e: KeyboardEvent) => onKey(e, false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimeLeft((t) => {
        if (!running) return t;
        if (t <= 1) {
          clearInterval(interval);
          setRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const spawnItem = () => {
      const r = 10 + Math.random() * 10;
      const x = r + Math.random() * (width - 2 * r);
      const vy = 1.5 + Math.random() * 2.5;
      const hue = Math.floor(Math.random() * 360);
      itemsRef.current.push({ x, y: -r, vy, r, hue });
    };

    const loop = (ts: number) => {
      if (!running) {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        return;
      }

      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = Math.min(32, ts - lastTsRef.current); // ms cap
      lastTsRef.current = ts;

      // Clear
      ctx.clearRect(0, 0, width, height);

      // Background
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#ffe4e6");
      grad.addColorStop(1, "#f5d0fe");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Move cat
      if (keys.current.left) catXRef.current -= speed * (dt / 16);
      if (keys.current.right) catXRef.current += speed * (dt / 16);
      catXRef.current = Math.max(0, Math.min(width - catW, catXRef.current));

      // Spawn items every ~400-700ms
      if (ts - lastSpawnRef.current > 400 + Math.random() * 300) {
        spawnItem();
        lastSpawnRef.current = ts;
      }

      // Update items
      itemsRef.current.forEach((it) => (it.y += it.vy * (dt / 16)));
      itemsRef.current = itemsRef.current.filter(
        (it) => it.y - it.r < height + 10
      );

      // Draw items (yarn balls)
      for (const it of itemsRef.current) {
        ctx.beginPath();
        ctx.arc(it.x, it.y, it.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${it.hue} 90% 60%)`;
        ctx.fill();
        ctx.strokeStyle = `hsl(${it.hue} 90% 40%)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Collision
      const catX = catXRef.current;
      for (const it of itemsRef.current) {
        const withinX = it.x > catX && it.x < catX + catW;
        const withinY = it.y + it.r > catY && it.y - it.r < catY + catH;
        if (withinX && withinY) {
          // collect
          setScore((s) => s + 1);
          it.y = height + 999; // mark for removal
        }
      }

      // Draw cat "paddle"
      ctx.fillStyle = "#db2777";
      const radius = 12;
      // rounded rect
      const x = catXRef.current,
        y = catY;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + catW - radius, y);
      ctx.quadraticCurveTo(x + catW, y, x + catW, y + radius);
      ctx.lineTo(x + catW, y + catH - radius);
      ctx.quadraticCurveTo(x + catW, y + catH, x + catW - radius, y + catH);
      ctx.lineTo(x + radius, y + catH);
      ctx.quadraticCurveTo(x, y + catH, x, y + catH - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.fill();
      // cat face emoji
      ctx.font = "20px system-ui, -apple-system, Segoe UI";
      ctx.fillText("🐱", x + catW / 2 - 10, y + catH / 2 + 7);

      // HUD
      ctx.fillStyle = "#1f2937";
      ctx.font = "bold 16px system-ui, -apple-system, Segoe UI";
      ctx.fillText(`Score: ${score}`, 16, 24);
      ctx.fillText(`Time: ${timeLeft}s`, width - 110, 24);

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [running, score, timeLeft]);

  useEffect(() => {
    if (!running && timeLeft === 0) {
      // end game
      const id = setTimeout(() => onFinish(score), 200);
      return () => clearTimeout(id);
    }
  }, [running, timeLeft, onFinish, score]);

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-8">
      <div className="mb-3 text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-fuchsia-500 bg-clip-text text-transparent">
          Catch the Yarn!
        </h2>
        <p className="text-sm text-slate-600">
          Move with ← → or A/D. Collect as many as you can before time runs out!
        </p>
      </div>
      <div className="mx-auto w-full max-w-[720px] rounded-2xl border border-pink-300/60 bg-white/70 shadow overflow-hidden">
        <div className="bg-pink-100/60 px-4 py-2 text-sm flex items-center justify-between">
          <span>🎮 Cat Mini‑Game</span>
          <span>
            Time: {timeLeft}s • Score: {score}
          </span>
        </div>
        <div className="p-3">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="w-full h-auto block rounded-xl border border-pink-200"
          />
        </div>
      </div>
    </section>
  );
}
