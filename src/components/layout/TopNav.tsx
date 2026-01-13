"use client";

import { Search, Bell, HelpCircle, User } from "lucide-react";

export function TopNav() {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input type="text" placeholder="Buscar pedidos, SKUs, rutas..." className="form-input pl-10 h-10" />
      </div>
      <div className="flex items-center gap-2">
        <button className="btn-ghost relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 size-4 bg-red-500 rounded-full text-[10px] text-white font-bold flex items-center justify-center">3</span>
        </button>
        <button className="btn-ghost"><HelpCircle size={20} /></button>
        <div className="ml-2 flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-border-dark">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Agustin Fernandez</p>
            <p className="text-xs text-slate-500 dark:text-text-muted">Supervisor Deposito</p>
          </div>
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}