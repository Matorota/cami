export default function Hero() {
  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
              Happy Birthday, Cami! 🎉
            </h1>
            <p className="mt-4 text-slate-700 dark:text-slate-300 text-lg">
              Wishing you a day as bright and adorable as a pink cat with
              sparkles! ✨🐱
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="/cami"
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-pink-500 to-indigo-500 px-5 py-3 text-white shadow transition hover:translate-y-[-1px]"
              >
                Here are some of your photos reeeeeeeeee!!!!
              </a>
              <a
                href="/art"
                className="inline-flex items-center rounded-lg border border-pink-300/60 bg-white/60 dark:bg-slate-900/40 px-5 py-3 text-pink-700 dark:text-pink-300 shadow-sm"
              >
                See her Art
              </a>
            </div>
          </div>

          {/* Raccoon speech bubble */}
          <div className="relative">
            <div className="absolute -right-2 -top-2 md:-right-6 md:-top-6">
              <div className="relative">
                <div className="rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-pink-200/60 dark:border-pink-900/50 shadow p-4 text-sm text-slate-800 dark:text-slate-100">
                  <p>
                    Hi, I’m the friendly raccoon! 🦝
                    <br />
                    Happy Birthday, CAMI!!!
                  </p>
                </div>
                <div className="absolute -bottom-2 right-8 rotate-45 h-4 w-4 bg-white/90 dark:bg-slate-900/90 border-r border-b border-pink-200/60 dark:border-pink-900/50" />
              </div>
            </div>
            <div className="aspect-square rounded-3xl border border-pink-200/60 dark:border-pink-900/60 bg-gradient-to-br from-pink-100 to-pink-200 dark:from-fuchsia-900 dark:to-indigo-900/40 shadow-inner flex items-center justify-center text-8xl">
              🐱
            </div>
            <p className="mt-3 text-center text-sm text-pink-700 dark:text-pink-300">
              Cat vibes all day
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
