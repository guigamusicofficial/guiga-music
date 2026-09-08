import React from "react";
import { Instagram, Music2, Youtube, Facebook } from "lucide-react";

export const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/guigamusicofficial/", Icon: Instagram },
  { name: "TikTok", href: "https://www.tiktok.com/@guigamusic", Icon: Music2 },
  { name: "YouTube", href: "https://www.youtube.com/@guigamusicofficial", Icon: Youtube },
  { name: "Facebook", href: "https://www.facebook.com/guigamusicofficial", Icon: Facebook },
];

export default function Social() {
  return (
    <section id="redes" className="relative py-28 sm:py-36 overflow-hidden">
      {/* subtle violet ambient */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#2D0B31]/20 blur-[140px] pointer-events-none" />
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 text-center">
        <p className="section-label mb-5">Conecte-se</p>
        <h2 className="headline text-4xl sm:text-6xl lg:text-7xl text-white mb-14">
          SIGA <span className="text-white/40">GUIGA MUSIC</span>
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {SOCIALS.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="group flex items-center gap-3 px-6 py-4 chrome-edge bg-white/[0.02] hover:bg-white/[0.05]"
            >
              <Icon size={20} className="text-white/60 group-hover:text-white transition-colors duration-500" />
              <span className="text-[0.7rem] uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors duration-500">
                {name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}