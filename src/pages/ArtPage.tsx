import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import Gallery from "../components/Gallery";
import { useMemo } from "react";

export default function ArtPage() {
  const artGlobs = useMemo(
    () => import.meta.glob("/src/assets/Art/*", { eager: true, as: "url" }),
    []
  );
  const artImages = Object.values(artGlobs).map((src) => ({ src }));

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 text-slate-800">
      <NavBar />
      <SectionHeading title="Cami’s Art" subtitle="Creative sparks and color" />
      <Gallery items={artImages} />
      <Footer />
    </div>
  );
}
