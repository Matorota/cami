import { useMemo } from "react";

type Props = {
  onEnter: () => void;
};

export default function Welcome({ onEnter }: Props) {
  const pieces = useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);
  const colors = [
    "#fb7185",
    "#f471b5",
    "#a78bfa",
    "#60a5fa",
    "#fbbf24",
    "#34d399",
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-rose-100 to-fuchsia-200" />

      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none">
        {pieces.map((i) => {
          const left = Math.random() * 100;
          const delay = Math.random() * 2; // 0-2s
          const duration = 5 + Math.random() * 5; // 5-10s
          const size = 6 + Math.random() * 8; // 6-14px
          const rotate = Math.random() * 360;
          const bg = colors[i % colors.length];
          return (
            <span
              key={i}
              className="absolute top-[-20px] block origin-center rounded-sm opacity-90 will-change-transform"
              style={{
                left: `${left}%`,
                width: `${size}px`,
                height: `${size * 0.4}px`,
                backgroundColor: bg,
                animation: `confetti-fall ${duration}s linear ${delay}s infinite`,
                transform: `rotate(${rotate}deg)`,
              }}
            />
          );
        })}
      </div>

      {/* Card */}
      <div className="relative mx-4 w-full max-w-2xl rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-2xl">
        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center text-center">
            {/* Raccoon speech bubble */}
            <div className="relative mb-4">
              <div className="rounded-2xl bg-white/90 border border-pink-200/70 shadow p-4 text-sm text-slate-800">
                <p>
                  Hey, it’s me—your friendly raccoon! 🦝
                  <br />
                  Happy Birthday, CAMI!!! 🎉
                </p>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rotate-45 h-4 w-4 bg-white/90 border-r border-b border-pink-200/70" />
            </div>

            <div className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-pink-600 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
              Welcome to Cami’s Party
            </div>
            <p className="mt-3 max-w-prose text-slate-700">
              We’re celebrating with cats, colors, and lots of love. Tap below
              to enter and explore her world! 🐱💖
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onEnter}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-indigo-500 px-6 py-3 text-white shadow-lg shadow-pink-500/20 transition hover:translate-y-[-1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/60"
              >
                Enter the Party 🎈
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
