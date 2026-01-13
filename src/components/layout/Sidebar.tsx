"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Warehouse,
  ClipboardList,
  Truck,
  Receipt,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Mountain,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
  { label: "Recepción", href: "/inbound/asn", icon: <Inbox size={20} /> },
  { label: "Almacén", href: "/almacen", icon: <Warehouse size={20} /> },
  { label: "Pedidos", href: "/pedidos", icon: <ClipboardList size={20} />, badge: 23 },
  { label: "Transporte", href: "/transporte", icon: <Truck size={20} /> },
  { label: "Facturación", href: "/facturacion", icon: <Receipt size={20} /> },
  { label: "Reportes", href: "/reportes", icon: <BarChart3 size={20} /> },
];

const bottomNavItems: NavItem[] = [
  { label: "Configuración", href: "/configuracion", icon: <Settings size={20} /> },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const isActive = (href: string) => pathname?.startsWith(href);

  return (
    <aside className={`${collapsed ? "w-20" : "w-64"} flex-shrink-0 border-r border-slate-200 dark:border-border-dark bg-white dark:bg-background-dark hidden lg:flex flex-col transition-all duration-300`}>
      {/* Logo */}
      <div className="h-16 px-4 flex items-center gap-3 border-b border-slate-200 dark:border-border-dark">
        <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white flex-shrink-0">
          <Mountain size={20} />
        </div>
        {!collapsed && (
          <h2 className="text-xl font-bold tracking-tight">
            Altitude <span className="text-primary">WMS/TMS</span>
          </h2>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-1">
        {mainNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              isActive(item.href)
                ? "bg-primary text-white font-medium shadow-lg shadow-primary/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-dark"
            }`}
          >
            {item.icon}
            {!collapsed && (
              <>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </Link>
        ))}

        <div className="pt-4 mt-4 border-t border-slate-200 dark:border-border-dark">
          {bottomNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive(item.href)
                  ? "bg-primary text-white font-medium"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-dark"
              }`}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
      </nav>

      {/* Collapse Button */}
      <div className="p-3 border-t border-slate-200 dark:border-border-dark">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-surface-dark transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span className="text-xs font-medium">Colapsar</span>}
        </button>
      </div>

      {/* System Info */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-200 dark:border-border-dark">
          <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4 border border-primary/20">
            <p className="text-xs font-bold text-primary mb-1">Sistema Altitude</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Versión v2.4.0 (Enterprise)<br />
              Soporte 24/7 activo.
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
