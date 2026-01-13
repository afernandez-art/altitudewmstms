"use client";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-background-dark border border-slate-200 dark:border-border-dark shadow-sm">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Ocupación de Bodega</p>
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold">72%</p>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500 text-sm font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              +5%
            </span>
            <span className="text-slate-400 text-xs">vs. mes pasado</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-background-dark border border-slate-200 dark:border-border-dark shadow-sm">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Pedidos Pendientes</p>
            <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold">23</p>
          <div className="flex items-center gap-2">
            <span className="text-orange-500 text-sm font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              +2%
            </span>
            <span className="text-slate-400 text-xs">en las últimas 24h</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-background-dark border border-slate-200 dark:border-border-dark shadow-sm">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Entregas en Ruta</p>
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold">12</p>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500 text-sm font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              98% eficienc.
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-background-dark border border-slate-200 dark:border-border-dark shadow-sm ring-2 ring-red-500/20">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Incidentes Críticos</p>
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-red-600 dark:text-red-500 tracking-tight text-3xl font-bold">2</p>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500 text-sm font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
              -1%
            </span>
            <span className="text-slate-400 text-xs">requiere atención</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 flex flex-col gap-4 bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-border-dark p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Vista General de Operaciones</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Flujo de entrada y salida de materiales semanal</p>
            </div>
            <select className="text-xs border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-surface-dark rounded-lg focus:ring-primary py-1.5 pl-3 pr-8">
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
            </select>
          </div>
          <div className="flex items-baseline gap-2 pt-2">
            <p className="text-2xl font-bold tracking-tight">1,240</p>
            <p className="text-xs text-slate-500">Movimientos totales</p>
            <p className="text-emerald-500 text-xs font-medium ml-auto flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              +12.5%
            </p>
          </div>
          <div className="mt-4 flex-1 min-h-[280px]">
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 472 150">
              <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z" fill="url(#chartGradient)"></path>
              <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#135bec" strokeLinecap="round" strokeWidth="3"></path>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="chartGradient" x1="236" x2="236" y1="1" y2="149">
                  <stop stopColor="#135bec" stopOpacity="0.2"></stop>
                  <stop offset="1" stopColor="#135bec" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
            </svg>
            <div className="flex justify-between mt-4 px-2">
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Lun</p>
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Mar</p>
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Mié</p>
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Jue</p>
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Vie</p>
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Sáb</p>
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Dom</p>
            </div>
          </div>
        </div>

        {/* Recent Activities List */}
        <div className="flex flex-col gap-4 bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-border-dark p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold">Actividades Recientes</h3>
            <button className="text-xs font-medium text-primary hover:underline">Ver todo</button>
          </div>
          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="size-9 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold">Pedido #ALT-9021 Despachado</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Ruta Buenos Aires - Córdoba · 12:45 PM</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold">Entrada de Mercancía: SKU-442</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Proveedor: Global Logist. · 11:30 AM</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="size-9 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold">Incidente Reportado: Camión R-44</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Retraso por clima en Ruta 9 · 09:15 AM</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="size-9 rounded-full bg-slate-100 dark:bg-surface-dark text-slate-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold">Ajuste de Inventario: Pasillo 4</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Verificado por Supervisor · 08:30 AM</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold">Nueva Ruta Creada: #TR-102</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Destino: Zona Industrial · Ayer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Data Grid */}
      <div className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-border-dark flex items-center justify-between">
          <h3 className="font-bold">Estatus de Almacenamiento</h3>
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="size-2 rounded-full bg-primary"></span> Reservado
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="size-2 rounded-full bg-slate-300 dark:bg-slate-700"></span> Disponible
            </span>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Zona A (Carga Seca)</span>
              <span className="text-sm font-bold">85%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-surface-dark rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Zona B (Refrigerados)</span>
              <span className="text-sm font-bold">42%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-surface-dark rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Zona C (Peligrosos)</span>
              <span className="text-sm font-bold">12%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-surface-dark rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '12%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
