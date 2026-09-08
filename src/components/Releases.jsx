import React from "react";
import { Play, Clock } from "lucide-react";

// Release data — easily extensible. Add new singles by appending to this array.
export const RELEASES = [
  {
    id: "delirio",
    title: "O Delírio de um Coração Teimoso",
    artist: "GUIGA MUSIC",
    status: "Ouça Agora",
    cover: "", // insert official cover URL here
    spotify: "https://open.spotify.com/intl-pt/album/3k6TKPJvY4pybYZePohRNq",
    streaming: [
      { name: "Spotify", href: "https://open.spotify.com/intl-pt/album/3k6TKPJvY4pybYZePohRNq" },
      { name: "Apple Music", href: "" },
      { name: "YouTube Music", href: "" },
      { name: "Deezer", href: "" },
    ],
  },
  {
    id: "cicatrizes",
    title: "Cicatrizes na Pele",
    artist: "GUIGA MUSIC",
    status: "Chegando às Plataformas",
    cover: "", // insert official cover URL here
    spotify: "",
    streaming: [],
  },
];

function CoverArt({ release }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-[#141414] to-[#080808] border border-white/10 group-hover:border-white/25 transition-colors duration-500">
      {release.cover ? (
        <img
          src={release.cover}
          alt={`Capa — ${release.title}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        // Placeholder frame ready to receive the official cover
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 rounded-full bg-[#2D0B31]/40 blur-[60px]" />
          </div>
          <span className="relative font-display font-extrabold text-5xl sm:text-6xl text-white/15 tracking-tight">
            GM
          </span>
          <span className="relative text-sm uppercase tracking-[0.3em] text-white/25">
            Capa Oficial
          </span>
        </div>
      )}
      {/* wet glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/5 pointer-events-none" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
      </div>
    </div>
  );
}

function ReleaseCard({ release, index }) {
  const isLive = release.status === "Ouça Agora";
  return (
    <article className="group relative">
      <div className="flex flex-col gap-6">
        <CoverArt release={release} />

        <div>
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`text-sm uppercase tracking-[0.3em] ${
                isLive ? "text-white/70" : "text-[#9a6a6a]"
              }`}
            >
              {release.status}
            </span>
            {isLive && (
              <span className="flex items-center gap-1.5 text-sm uppercase tracking-[0.2em] text-white/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
                Disponível
              </span>
            )}
          </div>

          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
            {release.title}
          </h3>
          <p className="mt-2 text-[0.7rem] uppercase tracking-[0.3em] text-white/40">
            {release.artist}
          </p>

          {/* CTA */}
          <div className="mt-7">
            {isLive && release.spotify ? (
              <a
                href={release.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solid group/btn w-full sm:w-auto"
              >
                <Play size={13} className="fill-current" />
                Ouvir no Spotify
              </a>
            ) : (
              <button
                disabled
                className="btn-silver w-full sm:w-auto cursor-default opacity-60"
              >
                <Clock size={13} />
                {release.status}
              </button>
            )}
          </div>

          {/* other streaming services */}
          {isLive && release.streaming && release.streaming.some((s) => s.href) && (
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {release.streaming
                .filter((s) => s.href)
                .map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm uppercase tracking-[0.25em] text-white/40 hover:text-white transition-colors duration-300"
                  >
                    {s.name}
                  </a>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* index marker */}
      <span className="absolute -top-2 -left-2 font-mono text-sm text-white/15 tracking-widest">
        {String(index + 1).padStart(2, "0")}
      </span>
    </article>
  );
}

export default function Releases() {
  return (
    <section id="lancamentos" className="relative py-28 sm:py-36 bg-[#050505]">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="mb-16 sm:mb-20">
          <p className="section-label mb-5">Discografia</p>
          <h2 className="headline text-4xl sm:text-6xl lg:text-7xl text-white">
            LANÇAMENTOS
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 sm:gap-16 lg:gap-24">
          {RELEASES.map((release, i) => (
            <ReleaseCard key={release.id} release={release} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}