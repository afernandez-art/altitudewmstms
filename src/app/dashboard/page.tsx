"use client";

import { useState, useEffect } from "react";
import { PieChart, Clock, Truck, AlertTriangle, TrendingUp, Forklift, Package, CheckCircle } from "lucide-react";
import { KPICard } from "@/components/ui/KPICard";
import { cn } from "@/lib/utils";

const mockKPIs = { warehouseOccupancy: 72, pendingOrders: 23, inRouteDeliveries: 12, criticalIncidents: 2 };
const mockActivities = [
  { id: 1, type: "dispatch", title: "Pedido #ALT-9021 Despachado", description: "Ruta Bogota - Medellin", time: "12:45 PM", icon: CheckCircle, iconBg: "bg-green-500/10", iconColor: "text-green-500" },
  { id: 2, type: "inbound", title: "Entrada de Mercancia: SKU-442", description: "Proveedor: Global Logist.", time: "11:30 AM", icon: Forklift, iconBg: "bg-primary/10", iconColor: "text-primary" },
  { id: 3, type: "incident", title: "Incidente Reportado: Camion R-44", description: "Retraso por clima en Via 4", time: "09:15 AM", icon: AlertTriangle, iconBg: "bg-red-500/10", iconColor: "text-red-500" },
  { id: 4, type: "adjustment", title: "Ajuste de Inventario: Pasillo 4", description: "Verificado por Supervisor", time: "08:30 AM", icon: Package, iconBg: "bg-slate-100 dark:bg-background-dark", iconColor: "text-slate-500" },
  { id: 5, type: "route", title: "Nueva Ruta Creada: #TR-102", description: "Destino: Zona Industrial", time: "Ayer", icon: Truck, iconBg: "bg-primary/10", iconColor: "text-primary" },
];
const mockZones = [
  { name: "Zona A (Carga Seca)", percentage: 85 },
  { name: "Zona B (Refrigerados)", percentage: 42 },
  { name: "Zona C (Peligrosos)", percentage: 12 },
];

export default function DashboardPage() {
  const [period, setPeriod] = useState("7d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Ocupacion de Bodega" value={`${mockKPIs.warehouseOccupancy}%`} icon={<PieChart size={22} />} iconColor="text-primary" trend={{ value: 5, label: "vs. mes pasado", direction: "up" }} />
        <KPICard title="Pedidos Pendientes" value={mockKPIs.pendingOrders} icon={<Clock size={22} />} iconColor="text-orange-500" trend={{ value: 2, label: "en las ultimas 24h", direction: "up" }} />
        <KPICard title="Entregas en Ruta" value={mockKPIs.inRouteDeliveries} icon={<Truck size={22} />} iconColor="text-blue-500" trend={{ value: 98, label: "eficiencia", direction: "up" }} />
        <KPICard title="Incidentes Criticos" value={mockKPIs.criticalIncidents} icon={<AlertTriangle size={22} />} iconColor="text-red-500" highlight={mockKPIs.criticalIncidents > 0} trend={{ value: -1, label: "requiere atencion", direction: "down" }} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="card-header flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Vista General de Operaciones</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Flujo de entrada y salida de materiales semanal</p>
            </div>
            <select value={period} onChange={(e) => setPeriod(e.target.value)} className="text-xs border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-background-dark rounded-lg focus:ring-primary py-1.5 pl-3 pr-8 text-slate-600 dark:text-slate-400">
              <option value="7d">Ultimos 7 dias</option>
              <option value="30d">Ultimos 30 dias</option>
              <option value="90d">Ultimos 90 dias</option>
            </select>
          </div>
          <div className="card-body">
            <div className="flex items-baseline gap-2 mb-4">
              <p className="text-2xl font-bold tracking-tight">1,240</p>
              <p className="text-xs text-slate-500">Movimientos totales</p>
              <p className="text-emerald-500 text-xs font-medium ml-auto flex items-center gap-0.5"><TrendingUp size={14} />+12.5%</p>
            </div>
            <div className="min-h-[280px]">
              <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 472 150">
                <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z" fill="url(#chartGradient)" />
                <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#135bec" strokeLinecap="round" strokeWidth="2.5" />
                <defs><linearGradient gradientUnits="userSpaceOnUse" id="chartGradient" x1="236" x2="236" y1="1" y2="149"><stop stopColor="#135bec" stopOpacity="0.15" /><stop offset="1" stopColor="#135bec" stopOpacity="0" /></linearGradient></defs>
              </svg>
              <div className="flex justify-between mt-4 px-2">{["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"].map((day) => (<p key={day} className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">{day}</p>))}</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="text-lg font-bold">Actividades Recientes</h3>
            <button className="text-xs font-medium text-primary hover:underline">Ver todo</button>
          </div>
          <div className="card-body">
            <div className="space-y-5 overflow-y-auto max-h-[360px] scrollbar-hide">
              {mockActivities.map((activity) => { const Icon = activity.icon; return (<div key={activity.id} className="flex gap-4"><div className={cn("size-9 rounded-full flex items-center justify-center flex-shrink-0", activity.iconBg)}><Icon size={20} className={activity.iconColor} /></div><div className="flex flex-col min-w-0"><p className="text-sm font-semibold truncate">{activity.title}</p><p className="text-xs text-slate-500 dark:text-slate-400">{activity.description} - {activity.time}</p></div></div>); })}
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h3 className="font-bold">Estatus de Almacenamiento</h3>
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5 text-xs text-slate-500"><span className="size-2 rounded-full bg-primary" /> Reservado</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500"><span className="size-2 rounded-full bg-slate-300 dark:bg-slate-700" /> Disponible</span>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockZones.map((zone) => (<div key={zone.name}><div className="flex justify-between items-center mb-2"><span className="text-sm font-medium">{zone.name}</span><span className="text-sm font-bold">{zone.percentage}%</span></div><div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${zone.percentage}%` }} /></div></div>))}
          </div>
        </div>
      </div>
    </div>
  );
}