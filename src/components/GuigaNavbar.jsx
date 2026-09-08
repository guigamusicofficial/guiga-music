import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Início", id: "inicio" },
  { label: "Música", id: "lancamentos" },
  { label: "Sobre", id: "sobre" },
  { label: "Galeria", id: "galeria" },
  { label: "Contato", id: "contato" },
];

export default function GuigaNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (id) =>
    (hash === "" && id === "inicio") || hash === `#${id}`;

  const handleNavClick = (e, id) => {
    setOpen(false);
    // Re-selecting the active section scrolls back to its top.
    if (isActive(id)) {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[70] transition-all duration-700 safe-top ${
          scrolled ? "frosted border-b border-white/5" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 safe-x">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link
              to="/#inicio"
              onClick={(e) => handleNavClick(e, "inicio")}
              className="group flex items-center"
              aria-label="GUIGA MUSIC — Início"
            >
              <span className="font-display font-extrabold tracking-[0.18em] text-sm sm:text-base text-white/90 group-hover:text-white transition-colors duration-500">
                GUIGA
                <span className="text-white/40 ml-1.5 font-medium tracking-[0.18em]">MUSIC</span>
              </span>
            </Link>

            <ul className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    to={`/#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`relative inline-flex items-center min-h-[44px] py-3 text-[0.7rem] uppercase tracking-[0.3em] transition-colors duration-500 ${
                      isActive(link.id) ? "text-white" : "text-white/55 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute left-0 right-0 bottom-0 h-px bg-white/60 origin-left transition-transform duration-500 ${
                        isActive(link.id) ? "scale-x-100" : "scale-x-0 hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden text-white/80 hover:text-white p-1 -mr-1 inline-flex items-center justify-center min-h-[44px] min-w-[44px]"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[60] md:hidden frosted transition-all duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.id}
              to={`/#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="font-display text-2xl font-bold tracking-[0.15em] text-white/80 hover:text-white transition-colors duration-300 inline-flex items-center justify-center min-h-[44px] px-4 py-2"
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}