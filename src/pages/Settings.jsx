const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Trash2, AlertTriangle, X } from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const authed = await db.auth.isAuthenticated();
        if (!authed) {
          navigate("/");
          return;
        }
        const me = await db.auth.me();
        setUser(me);
      } catch {
        navigate("/");
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const handleDelete = async () => {
    setDeleting(true);
    setError("");
    try {
      await db.functions.invoke("deleteAccount", {});
      try {
        await db.auth.logout();
      } catch {
        /* token already invalidated by deletion */
      }
      window.location.href = "/";
    } catch (e) {
      setError(e?.message || "Não foi possível excluir a conta.");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="w-8 h-8 border-4 border-white/10 border-t-white/60 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] safe-top safe-bottom">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 safe-x pt-28 pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 min-h-[44px] text-sm uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors duration-300 mb-12"
        >
          <ArrowLeft size={16} /> Voltar
        </Link>

        <p className="section-label mb-5">Conta</p>
        <h1 className="headline text-4xl sm:text-6xl text-white mb-10">Configurações</h1>

        <div className="frosted border border-white/5 p-8 sm:p-10 max-w-xl">
          <h2 className="font-display font-bold text-xl text-white mb-2">Conta vinculada</h2>
          <p className="text-sm text-white/50 mb-8 break-all">
            {user?.email || "Usuário autenticado"}
          </p>

          <div className="h-px w-full bg-white/10 my-8" />

          <h3 className="font-display font-bold text-xl text-white mb-2">Excluir conta</h3>
          <p className="text-sm text-white/50 mb-6 leading-relaxed">
            A exclusão da conta é permanente. Todos os dados associados serão removidos e não poderão ser recuperados.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] text-sm uppercase tracking-[0.25em] border border-[#4E0505]/60 text-[#c97070] hover:bg-[#4E0505]/20 hover:border-[#4E0505] transition-all duration-500"
          >
            <Trash2 size={15} /> Excluir Conta
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => !deleting && setOpen(false)}
          />
          <div className="relative frosted border border-white/10 p-8 sm:p-10 max-w-md w-full">
            <button
              onClick={() => !deleting && setOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white"
              aria-label="Fechar"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-3 mb-5">
              <AlertTriangle size={22} className="text-[#c97070]" />
              <h3 className="font-display font-bold text-2xl text-white">Excluir conta?</h3>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-8">
              Esta ação é <strong className="text-white">irreversível</strong>. Ao confirmar, sua
              conta e todos os dados associados serão permanentemente excluídos. Você será
              desconectado e não poderá recuperar as informações.
            </p>
            {error && <p className="text-sm text-[#c97070] mb-5">{error}</p>}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={deleting}
                className="btn-silver flex-1 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] text-sm uppercase tracking-[0.25em] bg-[#4E0505] text-white hover:bg-[#6a0a0a] transition-colors duration-500 disabled:opacity-50"
              >
                {deleting ? "Excluindo..." : "Confirmar Exclusão"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}