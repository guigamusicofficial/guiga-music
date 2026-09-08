const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Music2, Youtube, Facebook, Settings as SettingsIcon } from "lucide-react";

const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/guigamusicofficial/", Icon: Instagram },
  { name: "TikTok", href: "https://www.tiktok.com/@guigamusic", Icon: Music2 },
  { name: "YouTube", href: "https://www.youtube.com/@guigamusicofficial", Icon: Youtube },
  { name: "Facebook", href: "https://www.facebook.com/guigamusicofficial", Icon: Facebook },
];

export default function Footer() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    db.auth.isAuthenticated().then(setAuthed).catch(() => setAuthed(false));
  }, []);

  return (
    <footer className="relative border-t border-white/5 bg-[#050505] py-16 sm:py-20 safe-bottom">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 safe-x">
        <div className="flex flex-col items-center text-center gap-8">
          <span className="font-display font-extrabold tracking-[0.2em] text-lg text-white/90">
            GUIGA <span className="text-white/40 font-medium">MUSIC</span>
          </span>

          <div className="flex items-center gap-5">
            {SOCIALS.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-2 text-white/40 hover:text-white transition-colors duration-500"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          {authed && (
            <Link
              to="/settings"
              className="inline-flex items-center gap-2 min-h-[44px] px-4 text-sm uppercase tracking-[0.25em] text-white/40 hover:text-white transition-colors duration-500"
            >
              <SettingsIcon size={14} />
              Configurações
            </Link>
          )}

          <div className="h-px w-16 bg-white/10" />

          <p className="font-mono text-sm uppercase tracking-[0.15em] text-white/30">
            © 2026 GUIGA MUSIC — Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}