import { useState } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import SectionHeading from "./components/SectionHeading";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import CatMemoryGame from "./components/CatMemoryGame";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showGame, setShowGame] = useState(false);
  // Use Vite's glob imports to get asset URLs at build and dev time
  const artGlobs = import.meta.glob("/src/assets/Art/*", {
    eager: true,
    as: "url",
  });
  const roomGlobs = import.meta.glob("/src/assets/Room/*", {
    eager: true,
    as: "url",
  });

  const artImages = Object.values(artGlobs).map((src) => ({ src }));
  const roomImages = Object.values(roomGlobs).map((src) => ({ src }));

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 text-slate-800 dark:text-slate-100">
      {showWelcome && (
        <Welcome
          onEnter={() => {
            setShowWelcome(false);
            setShowGame(true);
          }}
        />
      )}
      <NavBar />
      {!showGame && <Hero />}
      {showGame && (
        <CatMemoryGame
          onFinish={() => {
            setShowGame(false);
            // Keep the user at the top after finishing the game
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }, 100);
          }}
        />
      )}
      <SectionHeading
        id="art"
        title="Art"
        subtitle="Cami’s creativity in pixels"
      />
      <Gallery items={artImages} />

      <SectionHeading
        id="room"
        title="Room"
        subtitle="Cozy corners and favorite spaces"
      />
      <Gallery items={roomImages} />
      <div className="mx-auto max-w-6xl px-4 -mt-6 mb-8 text-right">
        <a
          href="/room"
          className="inline-flex items-center text-pink-700 hover:underline"
        >
          Open room page →
        </a>
      </div>

      {/* Bonus sections after game */}
      <SectionHeading
        id="more-cats"
        title="Even More Cats"
        subtitle="Because one can never have too many 🐱"
      />
      {/* Mix local assets with internet cats for a mega gallery */}
      <Gallery
        items={[
          { src: "https://cataas.com/cat/cute?width=600&height=400&ts=1" },
          { src: "https://cataas.com/cat/sleep?width=600&height=400&ts=2" },
          { src: "https://cataas.com/cat/funny?width=600&height=400&ts=3" },
          { src: "https://cataas.com/cat/play?width=600&height=400&ts=4" },
          { src: "https://cataas.com/cat?type=sq&width=600&height=400&ts=5" },
          { src: "https://cataas.com/cat?width=600&height=400&ts=6" },
          { src: "https://cataas.com/cat?width=600&height=400&ts=7" },
          { src: "https://cataas.com/cat?width=600&height=400&ts=8" },
          { src: "https://cataas.com/cat?width=600&height=400&ts=9" },
          { src: "https://cataas.com/cat?width=600&height=400&ts=10" },
          { src: "https://cataas.com/cat?width=600&height=400&ts=11" },
          { src: "https://cataas.com/cat?width=600&height=400&ts=12" },
        ]}
      />

      <SectionHeading
        id="memes"
        title="Cat Memes"
        subtitle="A giggle to go with the whiskers"
      />
      <div className="mx-auto max-w-6xl px-4 pb-12">
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {
              url: "https://cataas.com/cat/says/ILoveTreats?fontColor=white&fontSize=40",
              caption: "😼 when the treats arrive",
            },
            {
              url: "https://cataas.com/cat/says/Monday?fontColor=white&fontSize=40",
              caption: "🙀 monday morning",
            },
            {
              url: "https://cataas.com/cat/says/LOL?fontColor=white&fontSize=40",
              caption: "😹 can’t stop laughing",
            },
            {
              url: "https://cataas.com/cat/says/Happy%20Birthday%20Cami!%20%F0%9F%8E%89?fontColor=pink&fontSize=32",
              caption: "🎉 birthday shoutout",
            },
            {
              url: "https://cataas.com/cat/says/Meow?fontColor=white&fontSize=50",
              caption: "meow mode",
            },
            {
              url: "https://cataas.com/cat/says/Cat%20Memes!%20%F0%9F%98%B9?fontColor=white&fontSize=32",
              caption: "memes forever",
            },
          ].map((m, i) => (
            <figure
              key={i}
              className="rounded-2xl border border-pink-200/60 bg-white/70 shadow-sm overflow-hidden"
            >
              <img
                src={m.url}
                alt={m.caption}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
              <figcaption className="px-3 py-2 text-center text-sm text-slate-700">
                {m.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
