"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  PackageCheck,
  ClipboardList,
  Truck,
  ShieldAlert,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
} from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase"
import { formatDate } from "@/lib/utils"

interface DashboardStats {
  recepcionesHoy: number
  pedidosPendientes: number
  enRuta: number
  enCuarentena: number
}

interface ReceivingOrder {
  id: string
  order_number: string
  status: string
  expected_pallets: number
  created_at: string
  customers: { business_name: string } | null
}

interface SalesOrder {
  id: string
  order_number: string
  status: string
  priority: number
  required_date: string
  customers: { business_name: string } | null
}

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "success" | "warning" | "info" | "destructive" }> = {
  expected: { label: "Esperado", variant: "info" },
  in_dock: { label: "En Andén", variant: "warning" },
  unloading: { label: "Descargando", variant: "warning" },
  received: { label: "Recibido", variant: "success" },
  closed: { label: "Cerrado", variant: "secondary" },
  pending: { label: "Pendiente", variant: "info" },
  in_picking: { label: "En Picking", variant: "warning" },
  in_packing: { label: "En Packing", variant: "warning" },
  ready: { label: "Listo", variant: "success" },
  dispatched: { label: "Despachado", variant: "default" },
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    recepcionesHoy: 0,
    pedidosPendientes: 0,
    enRuta: 0,
    enCuarentena: 0,
  })
  const [recentReceiving, setRecentReceiving] = useState<ReceivingOrder[]>([])
  const [urgentOrders, setUrgentOrders] = useState<SalesOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      const supabase = getSupabaseClient()
      const today = new Date().toISOString().split('T')[0]

      try {
        // Recepciones de hoy
        const { count: recepcionesHoy } = await supabase
          .from('receiving_orders')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', today)

        // Pedidos pendientes
        const { count: pedidosPendientes } = await supabase
          .from('sales_orders')
          .select('*', { count: 'exact', head: true })
          .in('status', ['pending', 'in_picking', 'in_packing'])

        // En ruta
        const { count: enRuta } = await supabase
          .from('sales_orders')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'dispatched')

        // En cuarentena
        const { count: enCuarentena } = await supabase
          .from('quarantine_items')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending')

        setStats({
          recepcionesHoy: recepcionesHoy || 0,
          pedidosPendientes: pedidosPendientes || 0,
          enRuta: enRuta || 0,
          enCuarentena: enCuarentena || 0,
        })

        // Últimas recepciones
        const { data: receiving } = await supabase
          .from('receiving_orders')
          .select('id, order_number, status, expected_pallets, created_at, customers(business_name)')
          .order('created_at', { ascending: false })
          .limit(5)

        setRecentReceiving(receiving || [])

        // Pedidos urgentes
        const { data: orders } = await supabase
          .from('sales_orders')
          .select('id, order_number, status, priority, required_date, customers(business_name)')
          .in('status', ['pending', 'in_picking', 'in_packing'])
          .order('priority', { ascending: true })
          .order('required_date', { ascending: true })
          .limit(5)

        setUrgentOrders(orders || [])

      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const kpiCards = [
    {
      title: "Recepciones Hoy",
      value: stats.recepcionesHoy,
      icon: PackageCheck,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Pedidos Pendientes",
      value: stats.pedidosPendientes,
      icon: ClipboardList,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "En Ruta",
      value: stats.enRuta,
      icon: Truck,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "En Cuarentena",
      value: stats.enCuarentena,
      icon: ShieldAlert,
      color: stats.enCuarentena > 0 ? "text-red-600" : "text-gray-600",
      bgColor: stats.enCuarentena > 0 ? "bg-red-100" : "bg-gray-100",
      alert: stats.enCuarentena > 0,
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Resumen operativo del día
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </p>
                  <p className="text-3xl font-bold mt-1">{kpi.value}</p>
                </div>
                <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
              {kpi.alert && (
                <div className="mt-3 flex items-center gap-1 text-sm text-red-600">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Requiere atención</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Últimas Recepciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PackageCheck className="h-5 w-5" />
              Últimas Recepciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentReceiving.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Pallets</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentReceiving.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.order_number}
                      </TableCell>
                      <TableCell>
                        {order.customers?.business_name || "—"}
                      </TableCell>
                      <TableCell>{order.expected_pallets || 0}</TableCell>
                      <TableCell>
                        <Badge variant={statusLabels[order.status]?.variant || "default"}>
                          {statusLabels[order.status]?.label || order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No hay recepciones recientes
              </p>
            )}
          </CardContent>
        </Card>

        {/* Pedidos Urgentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pedidos Urgentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {urgentOrders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Fecha Req.</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {urgentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.order_number}
                      </TableCell>
                      <TableCell>
                        {order.customers?.business_name || "—"}
                      </TableCell>
                      <TableCell>
                        {order.required_date ? formatDate(order.required_date) : "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusLabels[order.status]?.variant || "default"}>
                          {statusLabels[order.status]?.label || order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No hay pedidos pendientes
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
