import React, { useEffect, useRef, useState } from "react";

export default function About({ bgImage }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const paragraphs = [
    "GUIGA MUSIC transforma emoções, conflitos e histórias em música.",
    "Entre cicatrizes, desejo, superação e relações intensas, cada lançamento constrói um universo próprio onde música e imagem fazem parte da mesma história.",
    "Uma identidade urbana, noturna e cinematográfica criada para quem não apenas escuta música — sente.",
  ];

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative py-32 sm:py-44 overflow-hidden bg-[#080808]"
    >
      {/* giant background monogram */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
        aria-hidden="true"
      >
        <span className="font-display font-extrabold text-[28vw] sm:text-[22vw] leading-none text-white/[0.03] tracking-tighter">
          GUIGA
        </span>
      </div>

      {/* ambient texture image */}
      {bgImage && (
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ maskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 70%)", WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 70%)" }}
        >
          <img src={bgImage} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="section-label mb-5">O Projeto</p>
          <h2 className="headline text-4xl sm:text-6xl lg:text-7xl text-white mb-14">
            SOBRE <span className="text-white/40">GUIGA MUSIC</span>
          </h2>

          <div className="space-y-8">
            {paragraphs.map((text, i) => (
              <p
                key={i}
                className={`text-lg sm:text-xl lg:text-2xl font-light leading-relaxed text-white/70 transition-all duration-1000 ${
                  visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-sm"
                }`}
                style={{ transitionDelay: `${i * 200}ms`, letterSpacing: "0.02em" }}
              >
                {text}
              </p>
            ))}
          </div>

          <div className="mt-16 flex items-center gap-6">
            <div className="h-px w-16 bg-white/20" />
            <span className="text-sm uppercase tracking-[0.4em] text-white/40">
              Música • Imagem • Emoção
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}