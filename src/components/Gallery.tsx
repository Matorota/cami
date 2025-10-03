type GalleryItem = {
  src: string;
  alt?: string;
};

export default function Gallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-12">
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((it, idx) => (
          <figure
            key={idx}
            className="group relative overflow-hidden rounded-2xl border border-pink-200/60 dark:border-pink-900/60 bg-white/60 dark:bg-slate-900/40 shadow-sm"
          >
            <img
              src={it.src}
              alt={it.alt ?? `image-${idx}`}
              className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.05]"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                const tries = Number(img.dataset.retries || "0");
                if (tries < 2) {
                  img.dataset.retries = String(tries + 1);
                  // Fallback to a generic random cat image
                  img.src = `https://cataas.com/cat?width=600&height=400&ts=fallback-${idx}-${tries}`;
                } else {
                  // Final fallback to a tiny SVG placeholder with a cat emoji
                  const svg = encodeURIComponent(
                    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'>\n  <rect width='100%' height='100%' fill='#ffe4e6'/>\n  <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='64'>🐱</text>\n</svg>`
                  );
                  img.src = `data:image/svg+xml;charset=utf-8,${svg}`;
                }
              }}
              data-retries="0"
              loading="lazy"
            />
            {it.alt && (
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-2 text-xs text-white">
                {it.alt}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
