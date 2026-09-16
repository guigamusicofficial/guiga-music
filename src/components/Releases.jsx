import React from "react";
import { ExternalLink, Play } from "lucide-react";

const ALL_MUSIC = "https://hyperfollow.com/guigamusic";

export const RELEASES = [
  {
    id: "cicatrizes",
    title: "Cicatrizes na Pele",
    artist: "GUIGA MUSIC",
    status: "Já disponível",
    cover: "/assets/Cicatrizes_na_Pele_referencia.jpg",
    primary: ALL_MUSIC,
    primaryLabel: "Ouvir agora",
  },
  {
    id: "delirio",
    title: "O Delírio de um Coração Teimoso",
    artist: "GUIGA MUSIC",
    status: "Já disponível",
    cover: "/assets/O_Delirio_de_um_Coracao_Teimoso_3000x3000.jpg",
    primary: "https://open.spotify.com/intl-pt/album/3k6TKPJvY4pybYZePohRNq",
    primaryLabel: "Ouvir no Spotify",
  },
];

function CoverArt({ release }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-[#141414] to-[#080808] border border-white/10 group-hover:border-white/25 transition-colors duration-500">
      <img
        src={release.cover}
        alt={`Capa — ${release.title}`}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/5 pointer-events-none" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
      </div>
    </div>
  );
}

function ReleaseCard({ release, index }) {
  return (
    <article className="group relative">
      <div className="flex flex-col gap-6">
        <CoverArt release={release} />

        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm uppercase tracking-[0.3em] text-white/70">
              {release.status}
            </span>
            <span className="flex items-center gap-1.5 text-sm uppercase tracking-[0.2em] text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
              Disponível
            </span>
          </div>

          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
            {release.title}
          </h3>
          <p className="mt-2 text-[0.7rem] uppercase tracking-[0.3em] text-white/40">
            {release.artist}
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a
              href={release.primary}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid group/btn w-full sm:w-auto"
            >
              <Play size={13} className="fill-current" />
              {release.primaryLabel}
            </a>
            <a
              href={ALL_MUSIC}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-silver w-full sm:w-auto"
            >
              <ExternalLink size={13} />
              Todas as plataformas
            </a>
          </div>
        </div>
      </div>

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
          <p className="mt-6 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Ouça os lançamentos da GUIGA MUSIC e encontre cada faixa nas principais plataformas digitais.
          </p>
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
