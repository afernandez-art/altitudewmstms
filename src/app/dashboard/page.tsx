export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dashboard - Altitude WMS/TMS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="kpi-card">
          <p className="text-xs font-bold text-slate-500 uppercase">Ocupacion Bodega</p>
          <p className="text-3xl font-black">72%</p>
        </div>
        <div className="kpi-card">
          <p className="text-xs font-bold text-slate-500 uppercase">Pedidos Pendientes</p>
          <p className="text-3xl font-black">23</p>
        </div>
        <div className="kpi-card">
          <p className="text-xs font-bold text-slate-500 uppercase">Entregas en Ruta</p>
          <p className="text-3xl font-black">12</p>
        </div>
        <div className="kpi-card">
          <p className="text-xs font-bold text-slate-500 uppercase">Incidentes</p>
          <p className="text-3xl font-black text-red-500">2</p>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="font-bold">Sistema Operativo</h3></div>
        <div className="card-body"><p className="text-slate-500">Altitude WMS/TMS v2.4.0 - Stitch Design System activo</p></div>
      </div>
    </div>
  );
}