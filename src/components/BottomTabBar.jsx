import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Music, Info, Mail } from "lucide-react";

const TABS = [
  { id: "inicio", label: "Início", Icon: Home },
  { id: "lancamentos", label: "Música", Icon: Music },
  { id: "sobre", label: "Sobre", Icon: Info },
  { id: "contato", label: "Contato", Icon: Mail },
];

export default function BottomTabBar() {
  const { hash } = useLocation();

  const isActive = (id) =>
    (hash === "" && id === "inicio") || hash === `#${id}`;

  const handleClick = (e, id) => {
    // Re-selecting the active tab scrolls back to the top of that section.
    if (isActive(id)) {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 frosted border-t border-white/5 safe-bottom"
      aria-label="Navegação principal"
    >
      <div className="flex items-stretch justify-around">
        {TABS.map(({ id, label, Icon }) => {
          const active = isActive(id);
          return (
            <Link
              key={id}
              to={`/#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={`relative flex flex-1 flex-col items-center justify-center gap-1 min-h-[56px] py-2 text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${
                active ? "text-white" : "text-white/45 hover:text-white/70"
              }`}
              aria-label={label}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={20} className={active ? "text-white" : "text-white/45"} />
              {label}
              <span
                className={`absolute top-0 left-1/2 -translate-x-1/2 h-0.5 bg-white/70 transition-opacity duration-300 ${
                  active ? "opacity-100 w-6" : "opacity-0 w-0"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}