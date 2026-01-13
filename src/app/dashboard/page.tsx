export default function DashboardPage() {
  const kpis = [
    { label: "Ocupación Bodega", value: "72%", trend: "+3%" },
    { label: "Pedidos Pendientes", value: "23", trend: "-5" },
    { label: "Entregas en Ruta", value: "12", trend: "+2" },
    { label: "Incidentes", value: "2", trend: "0", alert: true },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <span className="text-sm text-slate-400">Última actualización: hace 5 min</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="kpi-card">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{kpi.label}</p>
            <p className={`text-3xl font-black mt-2 ${kpi.alert ? "text-danger" : "text-white"}`}>
              {kpi.value}
            </p>
            <p className={`text-sm mt-1 ${kpi.trend.startsWith("+") ? "text-success" : kpi.trend.startsWith("-") ? "text-danger" : "text-slate-400"}`}>
              {kpi.trend} vs ayer
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header"><h3 className="font-bold">Actividad Reciente</h3></div>
          <div className="card-body space-y-3">
            {[
              { time: "14:32", action: "ASN #1234 recibido", status: "success" },
              { time: "14:15", action: "Picking #5678 completado", status: "success" },
              { time: "13:58", action: "Incidente en LU-001", status: "danger" },
              { time: "13:45", action: "Despacho #9012 en ruta", status: "primary" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="text-slate-500 w-12">{item.time}</span>
                <span className={`w-2 h-2 rounded-full ${item.status === "success" ? "bg-success" : item.status === "danger" ? "bg-danger" : "bg-primary"}`} />
                <span>{item.action}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h3 className="font-bold">Estado del Sistema</h3></div>
          <div className="card-body">
            <p className="text-slate-400">Altitude WMS/TMS v2.4.0</p>
            <p className="text-sm text-slate-500 mt-2">Stitch Design System activo</p>
          </div>
        </div>
      </div>
    </div>
  );
}