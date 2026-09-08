const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { lazy, Suspense } from "react";
import PullToRefresh from "@/components/PullToRefresh";
import Footer from "@/components/Footer";

const Hero = lazy(() => import("@/components/Hero"));
const Releases = lazy(() => import("@/components/Releases"));
const About = lazy(() => import("@/components/About"));
const Gallery = lazy(() => import("@/components/Gallery"));
const Platforms = lazy(() => import("@/components/Platforms"));
const Social = lazy(() => import("@/components/Social"));
const Contact = lazy(() => import("@/components/Contact"));

const HERO_IMG =
  "/assets/Banner_YouTube_GUIGA_MUSIC_sem_GM_final_2560x1440.png";
const ABOUT_IMG =
  "/assets/03_Algumas_Cicatrizes_YouTube_16x9.png";

const SectionFallback = () => (
  <div className="py-32 flex items-center justify-center">
    <div className="w-7 h-7 border-4 border-white/10 border-t-white/60 rounded-full animate-spin" />
  </div>
);

export default function Home() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="bg-[#050505] min-h-screen">
      <PullToRefresh onRefresh={handleRefresh}>
        <main>
          <Suspense fallback={<SectionFallback />}>
            <Hero bgImage={HERO_IMG} />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Releases />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <About bgImage={ABOUT_IMG} />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Gallery />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Platforms />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Social />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </main>
      </PullToRefresh>
      <Footer />
      <div className="h-20 md:hidden" aria-hidden="true" />
    </div>
  );
}