import React, { useEffect, useRef, useState } from "react";

const PILLARS = [
  { number: "01", title: "Música", text: "Dark pop, R&B alternativo e rap se encontram em canções que colocam emoção, atmosfera e narrativa no centro." },
  { number: "02", title: "Imagem", text: "Cada lançamento também é construído visualmente — sombras, cidade, chuva, luz e personagens que ampliam a história." },
  { number: "03", title: "Emoção", text: "Cicatrizes, desejo, conflitos, superação e relações intensas. O projeto nasce de sentimentos que continuam depois da música." },
];

export default function About({ bgImage }) {
  const sectionRef = useRef(null);
  // Keep the content visible even if the observer is delayed/unsupported.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative py-28 sm:py-40 overflow-hidden bg-[#080808]"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none" aria-hidden="true">
        <span className="font-display font-extrabold text-[28vw] sm:text-[22vw] leading-none text-white/[0.025] tracking-tighter">
          GM
        </span>
      </div>

      {bgImage && (
        <div
          className="absolute inset-0 opacity-[0.14] pointer-events-none"
          style={{
            maskImage: "radial-gradient(circle at 65% 50%, black 0%, transparent 68%)",
            WebkitMaskImage: "radial-gradient(circle at 65% 50%, black 0%, transparent 68%)",
          }}
        >
          <img src={bgImage} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          <p className="section-label mb-5">O Projeto</p>
          <h2 className="headline text-4xl sm:text-6xl lg:text-7xl text-white mb-8">
            SOBRE <span className="text-white/35">GUIGA MUSIC</span>
          </h2>

          <div className="max-w-3xl space-y-6">
            <p className={`text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed text-white transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-6"}`}>
              GUIGA MUSIC transforma <span className="text-white">cicatrizes, desejos e conflitos internos</span> em música.
            </p>
            <p className={`text-base sm:text-lg lg:text-xl font-light leading-relaxed text-white/60 transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-6"}`}>
              O projeto mistura dark pop, R&B alternativo e rap com uma atmosfera urbana e cinematográfica. Cada faixa é pensada como uma cena: tem uma história, uma imagem e uma emoção para carregar.
            </p>
            <p className={`text-base sm:text-lg lg:text-xl font-light leading-relaxed text-white/60 transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-6"}`}>
              Aqui, música e imagem caminham juntas para falar com quem já caiu, sentiu, sobreviveu e continuou seguindo — mesmo quando ninguém conhecia a história por trás das marcas.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {PILLARS.map((pillar, i) => (
              <article
                key={pillar.number}
                className={`bg-[#080808]/95 p-7 sm:p-8 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-8"}`}
                style={{ transitionDelay: `${350 + i * 120}ms` }}
              >
                <span className="text-xs tracking-[0.3em] text-white/30">{pillar.number}</span>
                <h3 className="mt-5 text-lg uppercase tracking-[0.2em] text-white">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/50">{pillar.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-14 flex items-center gap-6">
            <div className="h-px w-16 bg-white/20" />
            <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-white/35">
              Música • Imagem • Emoção
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
