import React from "react";

const ALL_MUSIC = "https://hyperfollow.com/guigamusic";

export const PLATFORMS = [
  { name: "Spotify", href: ALL_MUSIC, color: "#1DB954" },
  { name: "Apple Music", href: ALL_MUSIC, color: "#FA243C" },
  { name: "YouTube Music", href: ALL_MUSIC, color: "#FF0000" },
  { name: "Amazon Music", href: ALL_MUSIC, color: "#00A8E1" },
  { name: "Deezer", href: ALL_MUSIC, color: "#A238FF" },
  { name: "Tidal", href: ALL_MUSIC, color: "#00D9FF" },
];

function PlatformGlyph({ name }) {
  return (
    <span className="font-display font-extrabold text-2xl sm:text-3xl text-white/70 transition-all duration-500">
      {name.charAt(0)}
    </span>
  );
}

export default function Platforms() {
  return (
    <section id="plataformas" className="relative py-28 sm:py-36 bg-[#070707]">
      <div className="absolute inset-0 light-sweep pointer-events-none" />
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-16 sm:mb-20">
          <p className="section-label mb-5">Streaming</p>
          <h2 className="headline text-4xl sm:text-6xl lg:text-7xl text-white">
            OUÇA <span className="text-white/40">GUIGA MUSIC</span>
          </h2>
          <p className="mt-6 text-sm text-muted-foreground max-w-md mx-auto">
            Encontre a GUIGA MUSIC nas principais plataformas digitais.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5 border border-white/5">
          {PLATFORMS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center gap-4 py-12 sm:py-14 bg-[#0a0a0a] transition-all duration-500 hover:bg-[#0e0e0e]"
              aria-label={`Ouvir GUIGA MUSIC — ${p.name}`}
            >
              <span className="transition-all duration-500 group-hover:scale-110">
                <PlatformGlyph name={p.name} />
              </span>
              <span className="text-sm uppercase tracking-[0.3em] text-white/50 group-hover:text-white/80 transition-colors duration-500">
                {p.name}
              </span>
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ boxShadow: `inset 0 0 60px -20px ${p.color}` }}
              />
            </a>
          ))}
        </div>

        <p className="mt-8 text-center text-xs uppercase tracking-[0.25em] text-white/25">
          Um único lugar para encontrar todas as músicas
        </p>
      </div>
    </section>
  );
}
