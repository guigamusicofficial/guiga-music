import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero({ bgImage }) {
  const heroRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    let raf = null;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // subtle parallax on scroll
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        setOffset(window.scrollY);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex items-end overflow-hidden bg-[#050505]"
    >
      {/* Background image with parallax + mouse flashlight */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${offset * 0.18}px) scale(1.05)` }}
      >
        {bgImage && (
          <img
            src={bgImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        )}
        {/* flashlight overlay */}
        <div
          className="absolute inset-0 transition-[background] duration-300"
          style={{
            background: `radial-gradient(circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(45,11,49,0.0) 0%, rgba(5,5,5,0.55) 45%, rgba(5,5,5,0.92) 100%)`,
          }}
        />
        {/* base dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/70" />
        {/* violet ambient */}
        <div className="absolute -left-40 top-1/3 w-[500px] h-[500px] rounded-full bg-[#2D0B31]/30 blur-[150px] pointer-events-none" />
        <div className="absolute -right-40 bottom-10 w-[400px] h-[400px] rounded-full bg-[#4E0505]/15 blur-[150px] pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1600px] w-full px-5 sm:px-8 lg:px-12 pb-20 sm:pb-28 lg:pb-32">
        <div className="max-w-3xl">
          <p className="animate-fade-up text-sm uppercase tracking-[0.3em] text-white/50 mb-7">
            <span className="inline-block w-2 h-2 rounded-full bg-[#4E0505] mr-3 align-middle animate-pulse" />
            Novos Lançamentos • 2026
          </p>

          <h1 className="animate-fade-up delay-200 headline text-white text-6xl sm:text-8xl lg:text-9xl xl:text-[10rem] text-shadow-noir">
            GUIGA
            <br />
            <span className="text-white/50">MUSIC</span>
          </h1>

          <p className="animate-fade-up delay-400 mt-8 text-base sm:text-lg text-white/60 max-w-xl font-light leading-relaxed">
            Música para quem sente além da superfície.
          </p>

          <div className="animate-fade-up delay-500 mt-12 flex flex-col sm:flex-row gap-4">
            <button onClick={() => scrollTo("#lancamentos")} className="btn-solid">
              Ouça Agora
            </button>
            <button onClick={() => scrollTo("#sobre")} className="btn-silver">
              Conheça o Projeto
            </button>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <button
        onClick={() => scrollTo("#lancamentos")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/40 hover:text-white/80 transition-colors duration-500 animate-fade-slow delay-700"
        aria-label="Rolar para baixo"
      >
        <ChevronDown size={22} className="animate-bounce" style={{ animationDuration: "2.5s" }} />
      </button>
    </section>
  );
}