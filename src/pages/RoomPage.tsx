import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import Gallery from "../components/Gallery";
import { useMemo } from "react";

export default function RoomPage() {
  const roomGlobs = useMemo(
    () => import.meta.glob("/src/assets/Room/*", { eager: true, as: "url" }),
    []
  );
  const roomImages = Object.values(roomGlobs).map((src) => ({ src }));

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 text-slate-800">
      <NavBar />
      <SectionHeading
        title="Cami’s Room"
        subtitle="Cozy corners and favorite spaces"
      />
      <Gallery items={roomImages} />
      <Footer />
    </div>
  );
}
