import React, { useState } from "react";
import { Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ nome: "", email: "", assunto: "", mensagem: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    // Placeholder: wire to a backend function / email service when ready.
    // No email address is invented here.
    setTimeout(() => {
      setStatus("sent");
      setForm({ nome: "", email: "", assunto: "", mensagem: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1200);
  };

  const fieldClass =
    "w-full bg-transparent border-0 border-b border-white/15 focus:border-white/60 px-0 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors duration-300";

  return (
    <section id="contato" className="relative py-28 sm:py-36 bg-[#070707]">
      <div className="absolute inset-0 light-sweep pointer-events-none" />
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <p className="section-label mb-5">Contato</p>
            <h2 className="headline text-4xl sm:text-6xl lg:text-7xl text-white">
              FALE <span className="text-white/40">CONOSCO</span>
            </h2>
            <p className="mt-6 text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
              Shows, parcerias, produção e assuntos profissionais.
            </p>
            <div className="mt-10 h-px w-24 bg-white/20" />
            <p className="mt-10 text-sm uppercase tracking-[0.3em] text-white/30">
              Resposta em até 72h
            </p>
          </div>

          <form onSubmit={handleSubmit} className="frosted border border-white/5 p-8 sm:p-10">
            <div className="space-y-7">
              <div>
                <label htmlFor="nome" className="block text-sm uppercase tracking-[0.3em] text-white/40 mb-2">
                  Nome
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  value={form.nome}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm uppercase tracking-[0.3em] text-white/40 mb-2">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label htmlFor="assunto" className="block text-sm uppercase tracking-[0.3em] text-white/40 mb-2">
                  Assunto
                </label>
                <input
                  id="assunto"
                  name="assunto"
                  type="text"
                  required
                  value={form.assunto}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="Assunto da mensagem"
                />
              </div>
              <div>
                <label htmlFor="mensagem" className="block text-sm uppercase tracking-[0.3em] text-white/40 mb-2">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  required
                  rows={4}
                  value={form.mensagem}
                  onChange={handleChange}
                  className={`${fieldClass} resize-none`}
                  placeholder="Escreva sua mensagem"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-silver w-full sm:w-auto group disabled:opacity-50"
              >
                {status === "sending" ? (
                  "ENVIANDO..."
                ) : status === "sent" ? (
                  "MENSAGEM ENVIADA"
                ) : (
                  <>
                    ENVIAR
                    <Send size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}