import React from "react";
import { ArrowUpRight, Headphones } from "lucide-react";

const ALL_MUSIC = "https://hyperfollow.com/guigamusic";

export const PLATFORMS = [
  { name: "Spotify", href: ALL_MUSIC, color: "#1DB954" },
  { name: "Apple Music", href: ALL_MUSIC, color: "#FA243C" },
  { name: "YouTube Music", href: ALL_MUSIC, color: "#FF0000" },
  { name: "Amazon Music", href: ALL_MUSIC, color: "#00A8E1" },
  { name: "Deezer", href: ALL_MUSIC, color: "#A238FF" },
  { name: "Tidal", href: ALL_MUSIC, color: "#00D9FF" },
];

export default function Platforms() {
  return (
    <section id="plataformas" className="relative py-28 sm:py-40 bg-[#060606] overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#2D0B31]/15 blur-[150px] pointer-events-none" />
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl mb-14 sm:mb-20">
          <p className="section-label mb-5">Streaming</p>
          <h2 className="headline text-4xl sm:text-6xl lg:text-7xl text-white">
            OUÇA <span className="text-white/35">GUIGA MUSIC</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-white/45 max-w-xl leading-relaxed">
            Escolha sua plataforma e entre no universo GUIGA MUSIC. Todos os lançamentos em um só lugar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PLATFORMS.map((p, i) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden flex items-center justify-between min-h-[104px] px-6 sm:px-8 border border-white/10 bg-white/[0.025] hover:bg-white/[0.055] hover:border-white/20 transition-all duration-500"
              aria-label={`Ouvir GUIGA MUSIC — ${p.name}`}
            >
              <span className="flex items-center gap-5">
                <span className="flex items-center justify-center w-11 h-11 border border-white/10 bg-black/20 text-white/65 group-hover:text-white transition-colors duration-500">
                  <Headphones size={19} strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.3em] text-white/30">Ouça no</span>
                  <span className="block mt-1 text-sm sm:text-base uppercase tracking-[0.18em] text-white/70 group-hover:text-white transition-colors duration-500">{p.name}</span>
                </span>
              </span>
              <ArrowUpRight size={18} className="text-white/25 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
              <span className="absolute left-0 bottom-0 h-px w-0 group-hover:w-full transition-all duration-700" style={{ background: p.color }} />
            </a>
          ))}
        </div>

        <a href={ALL_MUSIC} target="_blank" rel="noopener noreferrer" className="mt-10 mx-auto flex w-fit items-center gap-3 btn-solid">
          Ouvir todos os lançamentos
          <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  );
}
