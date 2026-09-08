import React from "react";

// Streaming platforms. Links left empty ("") are ready to be filled later.
export const PLATFORMS = [
  { name: "Spotify", href: "https://open.spotify.com/intl-pt/album/3k6TKPJvY4pybYZePohRNq", color: "#1DB954" },
  { name: "Apple Music", href: "", color: "#FA243C" },
  { name: "YouTube Music", href: "", color: "#FF0000" },
  { name: "Amazon Music", href: "", color: "#00A8E1" },
  { name: "Deezer", href: "", color: "#A238FF" },
  { name: "Tidal", href: "", color: "#00D9FF" },
];

function PlatformGlyph({ name }) {
  // Minimalist monogram-style marks rendered as SVG to avoid external assets.
  const letter = name.charAt(0);
  return (
    <span className="font-display font-extrabold text-2xl sm:text-3xl text-white/70 transition-all duration-500">
      {letter}
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
            Disponível nas principais plataformas. Onde a música encontra você.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5 border border-white/5">
          {PLATFORMS.map((p) => {
            const enabled = Boolean(p.href);
            const Wrapper = enabled ? "a" : "div";
            return (
              <Wrapper
                key={p.name}
                {...(enabled ? { href: p.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group relative flex flex-col items-center justify-center gap-4 py-12 sm:py-14 bg-[#0a0a0a] transition-all duration-500 hover:bg-[#0e0e0e]"
                style={{ cursor: enabled ? "pointer" : "default" }}
                aria-label={enabled ? `Ouvir no ${p.name}` : `${p.name} — em breve`}
              >
                <span
                  className="transition-all duration-500 group-hover:scale-110"
                  style={{ filter: enabled ? "none" : "grayscale(1) opacity(0.4)" }}
                >
                  <PlatformGlyph name={p.name} />
                </span>
                <span className="text-sm uppercase tracking-[0.3em] text-white/50 group-hover:text-white/80 transition-colors duration-500">
                  {p.name}
                </span>
                {/* hover color glow */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 60px -20px ${p.color}` }}
                />
                {!enabled && (
                  <span className="absolute top-3 right-3 text-sm uppercase tracking-[0.2em] text-white/30">
                    Em breve
                  </span>
                )}
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}