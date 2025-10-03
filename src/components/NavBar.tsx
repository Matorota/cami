export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur bg-white/60 dark:bg-slate-900/50 border-b border-pink-200/40 dark:border-pink-900/40">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a
          href="/"
          className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-pink-600 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent"
        >
          CAMI 🎀
        </a>
        <nav className="hidden sm:flex items-center gap-4 text-sm">
          <a
            href="/cami"
            className="text-slate-700 dark:text-slate-200 hover:text-pink-600"
          >
            Cami
          </a>
          <a
            href="/art"
            className="text-slate-700 dark:text-slate-200 hover:text-pink-600"
          >
            Art
          </a>
          <a
            href="/room"
            className="text-slate-700 dark:text-slate-200 hover:text-pink-600"
          >
            Room
          </a>
          <a
            href="/raccoon"
            className="text-slate-700 dark:text-slate-200 hover:text-pink-600"
          >
            Raccoon
          </a>
        </nav>
      </div>
    </header>
  );
}
