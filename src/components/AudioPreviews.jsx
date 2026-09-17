import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Pause, Play, Volume2 } from "lucide-react";

const TRACKS = [
  {
    id: "cicatrizes",
    title: "Cicatrizes na Pele",
    eyebrow: "TRECHO EXCLUSIVO • 20 SEGUNDOS",
    cover: "/assets/Cicatrizes_na_Pele_referencia.jpg",
    audio: "/audio/cicatrizes-na-pele-20s.mp3",
    link: "https://hyperfollow.com/guigamusic",
  },
  {
    id: "delirio",
    title: "O Delírio de um Coração Teimoso",
    eyebrow: "TRECHO EXCLUSIVO • 20 SEGUNDOS",
    cover: "/assets/O_Delirio_de_um_Coracao_Teimoso_3000x3000.jpg",
    audio: "/audio/o-delirio-de-um-coracao-teimoso-20s.mp3",
    link: "https://open.spotify.com/intl-pt/album/3k6TKPJvY4pybYZePohRNq",
  },
];

function PreviewCard({ track, activeId, setActiveId }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      const current = Math.min(audio.currentTime, 20);
      setProgress((current / 20) * 100);
      if (audio.currentTime >= 20) {
        audio.pause();
        audio.currentTime = 0;
        setProgress(0);
        setPlaying(false);
        if (activeId === track.id) setActiveId(null);
      }
    };
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
      if (activeId === track.id) setActiveId(null);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, [activeId, setActiveId, track.id]);

  useEffect(() => {
    if (activeId !== track.id && playing) {
      audioRef.current?.pause();
      setPlaying(false);
    }
  }, [activeId, playing, track.id]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    setActiveId(track.id);
    audio.currentTime = 0;
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <article className="group relative overflow-hidden border border-white/10 bg-white/[0.025] hover:border-white/20 transition-all duration-700">
      <div className="absolute inset-0 bg-gradient-to-br from-[#35103a]/20 via-transparent to-[#4e0505]/15 pointer-events-none" />
      <div className="relative flex flex-col sm:flex-row">
        <div className="relative aspect-square w-full sm:w-[220px] md:w-[250px] shrink-0 overflow-hidden">
          <img src={track.cover} alt={track.title} className="w-full h-full object-cover transition-transform duration-[1600ms] group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <button
            type="button"
            onClick={toggle}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full border border-white/30 bg-black/55 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/75 hover:scale-105 transition-all duration-300"
            aria-label={`${playing ? "Pausar" : "Ouvir"} trecho de ${track.title}`}
          >
            {playing ? <Pause size={24} fill="currentColor" /> : <Play size={25} fill="currentColor" className="ml-1" />}
          </button>
          <div className="absolute left-5 bottom-5 right-5 h-px bg-white/20 overflow-hidden">
            <div className="h-full bg-white transition-[width] duration-100" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="relative flex-1 p-7 sm:p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/35">
            <span className="w-7 h-px bg-white/25" />
            {track.eyebrow}
          </div>
          <h3 className="mt-5 font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight max-w-xl">{track.title}</h3>
          <div className="mt-7 flex items-center gap-4 text-white/35">
            <Volume2 size={16} />
            <span className="text-xs uppercase tracking-[0.25em]">Ouça uma prévia</span>
            <span className="ml-auto text-xs tabular-nums text-white/40">00:20</span>
          </div>
          <div className="mt-7">
            <a href={track.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 btn-silver">
              Ouvir completa
              <ArrowUpRight size={15} />
            </a>
          </div>
          <audio ref={audioRef} src={track.audio} preload="metadata" aria-label={`Prévia de ${track.title}`} />
        </div>
      </div>
    </article>
  );
}

export default function AudioPreviews() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section id="previas" className="relative py-28 sm:py-36 bg-[#060606] overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#2d0b31]/15 blur-[160px] pointer-events-none" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="section-label mb-5">Escute antes de ir</p>
          <h2 className="headline text-4xl sm:text-6xl lg:text-7xl text-white">
            PRÉVIAS <span className="text-white/35">GUIGA MUSIC</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-white/45 max-w-2xl leading-relaxed">
            Dê o play e entre por 20 segundos no universo de cada faixa. Se a música te encontrar, continue a experiência nas plataformas.
          </p>
        </div>

        <div className="grid gap-5">
          {TRACKS.map((track) => (
            <PreviewCard key={track.id} track={track} activeId={activeId} setActiveId={setActiveId} />
          ))}
        </div>
      </div>
    </section>
  );
}
