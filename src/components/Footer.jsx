import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Music2, Youtube, Facebook, Settings as SettingsIcon, ArrowUp } from "lucide-react";

const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/guigamusicofficial/", Icon: Instagram },
  { name: "TikTok", href: "https://www.tiktok.com/@guigamusic", Icon: Music2 },
  { name: "YouTube", href: "https://www.youtube.com/@guigamusicofficial", Icon: Youtube },
  { name: "Facebook", href: "https://www.facebook.com/guigamusicofficial", Icon: Facebook },
];

export default function Footer() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    const db = globalThis.__B44_DB__;
    db?.auth?.isAuthenticated?.().then(setAuthed).catch(() => setAuthed(false));
  }, []);

  const top = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-white/5 bg-[#050505] py-14 sm:py-20 safe-bottom">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 safe-x">
        <div className="grid md:grid-cols-3 items-center gap-10">
          <div className="flex justify-center md:justify-start">
            <img src="/assets/guiga-music-logo-oficial.webp" alt="GUIGA MUSIC" className="w-32 sm:w-40 h-auto object-contain opacity-90" />
          </div>

          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-white/30">Música para quem sente além da superfície.</p>
            <div className="flex items-center justify-center gap-3 mt-5">
              {SOCIALS.map(({ name, href, Icon }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-white/40 hover:text-white transition-colors duration-500">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <button onClick={top} className="group inline-flex items-center gap-3 min-h-[44px] px-4 border border-white/10 text-[10px] uppercase tracking-[0.25em] text-white/40 hover:text-white hover:border-white/25 transition-all duration-500">
              Voltar ao topo <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {authed && (
          <div className="flex justify-center mt-8">
            <Link to="/settings" className="inline-flex items-center gap-2 min-h-[44px] px-4 text-xs uppercase tracking-[0.25em] text-white/30 hover:text-white transition-colors duration-500">
              <SettingsIcon size={13} /> Configurações
            </Link>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/25">© 2026 GUIGA MUSIC — Todos os direitos reservados</p>
          <a href="mailto:contato@guigamusic.com.br" className="inline-block mt-3 text-xs text-white/30 hover:text-white/70 transition-colors">contato@guigamusic.com.br</a>
        </div>
      </div>
    </footer>
  );
}
