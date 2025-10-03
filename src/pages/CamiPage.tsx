import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import Gallery from "../components/Gallery";
import { useMemo, useState } from "react";

export default function CamiPage() {
  const [agreed, setAgreed] = useState(false);
  const camiGlobs = useMemo(
    () => import.meta.glob("/src/assets/Cami/*", { eager: true, as: "url" }),
    []
  );
  const camiImages = useMemo(
    () => Object.values(camiGlobs).map((src) => ({ src })),
    [camiGlobs]
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 text-slate-800">
      <NavBar />
      <div className="mx-auto max-w-3xl px-4 py-10">
        <SectionHeading
          title="Cami Photos"
          subtitle="Private moments — please don’t share"
        />

        {!agreed ? (
          <div className="mt-6 rounded-2xl border border-pink-200 bg-white/80 p-6 shadow">
            <h3 className="text-lg font-semibold">Before you continue</h3>
            <p className="mt-2 text-sm text-slate-600">
              These photos are personal. By entering, you agree to keep them
              private and not share them with anyone.
            </p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setAgreed(true)}
                className="rounded-lg bg-pink-500 px-4 py-2 text-white shadow"
              >
                I agree
              </button>
              <a
                href="/"
                className="rounded-lg border border-pink-300 bg-white/70 px-4 py-2"
              >
                Go back
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <Gallery items={camiImages} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
