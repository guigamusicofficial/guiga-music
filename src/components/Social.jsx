import React from "react";
import { Instagram, Music2, Youtube, Facebook, ArrowUpRight } from "lucide-react";

export const SOCIALS = [
  { name: "Instagram", handle: "@guigamusicofficial", href: "https://www.instagram.com/guigamusicofficial/", Icon: Instagram },
  { name: "TikTok", handle: "@guigamusic", href: "https://www.tiktok.com/@guigamusic", Icon: Music2 },
  { name: "YouTube", handle: "@guigamusicofficial", href: "https://www.youtube.com/@guigamusicofficial", Icon: Youtube },
  { name: "Facebook", handle: "GUIGA MUSIC", href: "https://www.facebook.com/guigamusicofficial", Icon: Facebook },
];

export default function Social() {
  return (
    <section id="redes" className="relative py-28 sm:py-40 overflow-hidden bg-[#050505]">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[600px] rounded-full bg-[#2D0B31]/18 blur-[150px] pointer-events-none" />
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-14 sm:mb-20">
          <p className="section-label mb-5">Conecte-se</p>
          <h2 className="headline text-4xl sm:text-6xl lg:text-7xl text-white">SIGA <span className="text-white/35">GUIGA MUSIC</span></h2>
          <p className="mt-6 mx-auto max-w-lg text-base text-white/40 leading-relaxed">
            Acompanhe os próximos lançamentos, vídeos, bastidores e histórias do projeto.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SOCIALS.map(({ name, handle, href, Icon }) => (
            <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="group relative flex items-center gap-4 p-6 sm:p-7 border border-white/10 bg-white/[0.02] hover:bg-white/[0.055] hover:border-white/20 transition-all duration-500" aria-label={`${name} — ${handle}`}>
              <span className="flex items-center justify-center w-11 h-11 border border-white/10 text-white/55 group-hover:text-white transition-colors duration-500">
                <Icon size={20} strokeWidth={1.5} />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.28em] text-white/30">{name}</span>
                <span className="block mt-1 text-sm text-white/65 group-hover:text-white truncate transition-colors duration-500">{handle}</span>
              </span>
              <ArrowUpRight size={16} className="ml-auto shrink-0 text-white/20 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
              <span className="absolute left-0 bottom-0 h-px w-0 group-hover:w-full bg-white/60 transition-all duration-700" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
