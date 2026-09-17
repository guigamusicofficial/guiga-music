import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ArrowUpRight } from "lucide-react";

const PHOTOS = [
  { src: "/assets/03_Algumas_Cicatrizes_YouTube_16x9.png", title: "Cicatrizes", caption: "Algumas cicatrizes ninguém vê", span: "col-span-2 row-span-2" },
  { src: "/assets/Miniatura_Live_Depois_da_Meia_Noite_YouTube.png", title: "Depois da Meia-Noite", caption: "Universo GUIGA MUSIC", span: "col-span-2 row-span-1" },
  { src: "/assets/O_Delirio_de_um_Coracao_Teimoso_3000x3000.jpg", title: "O Delírio", caption: "Coração Teimoso", span: "col-span-1 row-span-2" },
  { src: "/assets/Cicatrizes_na_Pele_referencia.jpg", title: "Cicatrizes na Pele", caption: "Tempestade e superação", span: "col-span-1 row-span-1" },
  { src: "/assets/Banner_YouTube_GUIGA_MUSIC_sem_GM_final_2560x1440.png", title: "GUIGA MUSIC", caption: "Música que marca. Histórias que ficam.", span: "col-span-2 row-span-1" },
];

export default function Gallery() {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);
  const next = useCallback(() => setActive((i) => i === null ? i : (i + 1) % PHOTOS.length), []);
  const prev = useCallback(() => setActive((i) => i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  return (
    <section id="galeria" className="relative py-28 sm:py-40 bg-[#070707] overflow-hidden">
      <div className="absolute -left-40 top-1/3 w-[500px] h-[500px] rounded-full bg-[#2D0B31]/20 blur-[150px] pointer-events-none" />
      <div className="absolute -right-40 bottom-0 w-[450px] h-[450px] rounded-full bg-[#4E0505]/10 blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 safe-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 sm:mb-20">
          <div>
            <p className="section-label mb-5">Galeria</p>
            <h2 className="headline text-4xl sm:text-6xl lg:text-7xl text-white">MOMENTOS</h2>
            <p className="mt-6 text-base sm:text-lg text-white/45 max-w-lg leading-relaxed">
              Imagens que fazem parte do universo GUIGA MUSIC — lançamentos, personagens, atmosferas e histórias entre a sombra e a luz.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/30">
            <span>Explore</span><ArrowUpRight size={15} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[210px] md:auto-rows-[250px] gap-2 sm:gap-4 grid-flow-dense">
          {PHOTOS.map((photo, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all duration-500 ${photo.span}`}
              aria-label={`Abrir imagem — ${photo.title}`}
            >
              <img src={photo.src} alt={photo.title} loading="lazy" className="block w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/5 opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <span className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-left translate-y-3 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                <span className="block font-display font-bold text-base sm:text-xl text-white leading-tight">{photo.title}</span>
                <span className="block text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/45 mt-2">{photo.caption}</span>
              </span>
              <span className="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 bg-black/40 backdrop-blur-sm border border-white/10 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <ZoomIn size={15} />
              </span>
            </motion.button>
          ))}
        </div>

        <p className="mt-7 text-[10px] uppercase tracking-[0.3em] text-white/25 md:hidden">Toque em uma imagem para ampliar</p>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            <div className="absolute inset-0 bg-black/92 backdrop-blur-md" onClick={close} />
            <button onClick={close} className="absolute top-5 right-5 z-10 inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-white/70 hover:text-white" aria-label="Fechar"><X size={24} /></button>
            <button onClick={prev} className="absolute left-2 sm:left-6 z-10 inline-flex items-center justify-center min-h-[48px] min-w-[48px] text-white/60 hover:text-white" aria-label="Anterior"><ChevronLeft size={30} /></button>
            <button onClick={next} className="absolute right-2 sm:right-6 z-10 inline-flex items-center justify-center min-h-[48px] min-w-[48px] text-white/60 hover:text-white" aria-label="Próxima"><ChevronRight size={30} /></button>

            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.35 }} className="relative z-[1] max-w-6xl w-full flex flex-col items-center">
                <div className="relative w-full h-[62vh] sm:h-[74vh]">
                  <img src={PHOTOS[active].src} alt={PHOTOS[active].title} className="w-full h-full object-contain" />
                </div>
                <div className="mt-5 text-center">
                  <span className="font-display font-bold text-lg sm:text-xl text-white">{PHOTOS[active].title}</span>
                  <span className="block text-xs sm:text-sm uppercase tracking-[0.25em] text-white/40 mt-1">{PHOTOS[active].caption}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
