const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Image } from "@/components/ui/image";

const PHOTOS = [
  {
    src: "https://media.db.com/images/public/6aa07b6fc97a0fa45486ba9b/8b8431335_generated_image.png",
    title: "Estúdio",
    caption: "Entre as tomadas",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://media.db.com/images/public/6aa07b6fc97a0fa45486ba9b/40c4ad318_generated_image.png",
    title: "Palco",
    caption: "Luz e fumaça",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://media.db.com/images/public/6aa07b6fc97a0fa45486ba9b/c27c6a197_generated_image.png",
    title: "Som",
    caption: "Frequências",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://media.db.com/images/public/6aa07b6fc97a0fa45486ba9b/178fdb197_generated_image.png",
    title: "Madrugada",
    caption: "A cidade como palco",
    span: "col-span-2 row-span-1",
  },
  {
    src: "https://media.db.com/images/public/6aa07b6fc97a0fa45486ba9b/c54237e70_generated_image.png",
    title: "Teclas",
    caption: "Silêncio antes da nota",
    span: "col-span-1 row-span-1 md:row-span-2",
  },
  {
    src: "https://media.db.com/images/public/6aa07b6fc97a0fa45486ba9b/cb1fbda87_generated_image.png",
    title: "Corredor",
    caption: "Onde tudo começa",
    span: "col-span-1 row-span-1",
  },
];

export default function Gallery() {
  const [active, setActive] = useState(null);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % PHOTOS.length)),
    []
  );
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length)),
    []
  );

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
    <section id="galeria" className="relative py-28 sm:py-36 bg-[#070707]">
      <div className="absolute inset-0 light-sweep pointer-events-none" />
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 safe-x">
        <div className="mb-16 sm:mb-20">
          <p className="section-label mb-5">Galeria</p>
          <h2 className="headline text-4xl sm:text-6xl lg:text-7xl text-white">MOMENTOS</h2>
          <p className="mt-6 text-sm text-muted-foreground max-w-md">
            Fragmentos do universo GUIGA MUSIC — entre a sombra e a luz.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] sm:auto-rows-[220px] md:auto-rows-[260px] gap-3 sm:gap-4 grid-flow-dense">
          {PHOTOS.map((photo, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-colors duration-500 ${photo.span}`}
              aria-label={`Abrir imagem — ${photo.title}`}
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fittingType="fill"
                className="block w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500 pointer-events-none" />
              <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-left translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                <span className="block font-display font-bold text-lg text-white leading-tight">
                  {photo.title}
                </span>
                <span className="block text-sm uppercase tracking-[0.25em] text-white/50 mt-1">
                  {photo.caption}
                </span>
              </span>
              <span className="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 frosted-light border border-white/10 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <ZoomIn size={15} />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={close} />

            <button
              onClick={close}
              className="absolute top-5 right-5 z-10 inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-white/70 hover:text-white"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
            <button
              onClick={prev}
              className="absolute left-3 sm:left-6 z-10 inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-white/60 hover:text-white"
              aria-label="Anterior"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 sm:right-6 z-10 inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-white/60 hover:text-white"
              aria-label="Próxima"
            >
              <ChevronRight size={28} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-[1] max-w-5xl w-full flex flex-col items-center"
              >
                <div className="relative w-full h-[58vh] sm:h-[72vh]">
                  <Image
                    src={PHOTOS[active].src}
                    alt={PHOTOS[active].title}
                    fittingType="fit"
                    className="w-full h-full"
                  />
                </div>
                <div className="mt-5 text-center">
                  <span className="font-display font-bold text-xl text-white">
                    {PHOTOS[active].title}
                  </span>
                  <span className="block text-sm uppercase tracking-[0.25em] text-white/45 mt-1">
                    {PHOTOS[active].caption}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}