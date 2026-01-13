export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dashboard - Altitude WMS/TMS</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <p className="text-xs font-bold text-slate-500 uppercase">Ocupacion Bodega</p>
          <p className="text-3xl font-black mt-2">72%</p>
          <p className="text-sm text-green-400 mt-1">+3% vs ayer</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <p className="text-xs font-bold text-slate-500 uppercase">Pedidos Pendientes</p>
          <p className="text-3xl font-black mt-2">23</p>
          <p className="text-sm text-red-400 mt-1">-5 vs ayer</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <p className="text-xs font-bold text-slate-500 uppercase">Entregas en Ruta</p>
          <p className="text-3xl font-black mt-2">12</p>
          <p className="text-sm text-green-400 mt-1">+2 vs ayer</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <p className="text-xs font-bold text-slate-500 uppercase">Incidentes</p>
          <p className="text-3xl font-black text-red-400 mt-2">2</p>
          <p className="text-sm text-slate-400 mt-1">0 vs ayer</p>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="font-bold mb-4">Estado del Sistema</h3>
        <p className="text-slate-400">Altitude WMS/TMS v2.4.0</p>
        <div className="mt-4 flex gap-2">
          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">API Online</span>
          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">DB Connected</span>
        </div>
      </div>
    </div>
  );
}