import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";

export default function RaccoonPage() {
  const raccoonUrl =
    "https://source.unsplash.com/featured/800x500/?raccoon,smile";

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 text-slate-800">
      <NavBar />

      <div className="mx-auto max-w-6xl px-4 pt-10">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center">
          <span className="bg-gradient-to-r from-pink-600 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
            HAPPY BDAY FROM RACOON MISTER MATAS REEEE!!!
          </span>
        </h1>
        <p className="mt-2 text-center text-pink-700">
          The happiest raccoon wishes you an awesome birthday! 🦝🎉
        </p>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="overflow-hidden rounded-3xl border border-pink-200/70 bg-white/70 shadow">
          <img
            src={raccoonUrl}
            alt="Happy raccoon"
            className="w-full h-[320px] md:h-[460px] object-cover"
            loading="lazy"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              // fallback to another query
              if (!img.dataset.fallback) {
                img.dataset.fallback = "1";
                img.src =
                  "https://source.unsplash.com/featured/800x500/?raccoon,cute";
              } else {
                const svg = encodeURIComponent(
                  `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'>\n  <rect width='100%' height='100%' fill='#ffe4e6'/>\n  <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='80'>🦝</text>\n  <text x='50%' y='65%' dominant-baseline='middle' text-anchor='middle' font-size='24' fill='#db2777'>Happy Bday!</text>\n</svg>`
                );
                img.src = `data:image/svg+xml;charset=utf-8,${svg}`;
              }
            }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-10">
        <SectionHeading title="A message from the raccoon" />
        <div className="mt-3 rounded-2xl border border-pink-200 bg-white/70 p-5 text-center text-lg">
          Wishing you all the joy, snacks, and shiny things! — Mister Matas 🦝💖
        </div>
      </div>

      <Footer />
    </div>
  );
}
