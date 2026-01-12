"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Plus,
  Search,
  Package,
  Filter,
  Eye,
  Edit,
  Calendar,
} from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase"
import { formatDate, formatDateTime } from "@/lib/utils"

interface Customer {
  id: string
  code: string
  business_name: string
}

interface ReceivingOrder {
  id: string
  order_number: string
  status: string
  expected_pallets: number | null
  expected_bultos: number | null
  external_reference: string | null
  expected_date: string | null
  created_at: string
  notes: string | null
  customers: Customer | null
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "success" | "warning" | "info" | "destructive" }> = {
  expected: { label: "Esperado", variant: "info" },
  in_dock: { label: "En Andén", variant: "warning" },
  unloading: { label: "Descargando", variant: "warning" },
  received: { label: "Recibido", variant: "success" },
  received_partial: { label: "Recibido Parcial", variant: "warning" },
  closed: { label: "Cerrado", variant: "secondary" },
}

export default function ASNPage() {
  const [orders, setOrders] = useState<ReceivingOrder[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    customer_id: "",
    external_reference: "",
    expected_date: "",
    expected_pallets: "",
    expected_bultos: "",
    notes: "",
  })

  // Cargar datos
  useEffect(() => {
    fetchOrders()
    fetchCustomers()
  }, [statusFilter])

  async function fetchOrders() {
    const supabase = getSupabaseClient()
    setLoading(true)

    try {
      let query = supabase
        .from('receiving_orders')
        .select('*, customers(id, code, business_name)')
        .order('created_at', { ascending: false })

      if (statusFilter !== "all") {
        query = query.eq('status', statusFilter)
      }

      const { data, error } = await query

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchCustomers() {
    const supabase = getSupabaseClient()
    
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('id, code, business_name')
        .eq('is_active', true)
        .order('business_name')

      if (error) throw error
      setCustomers(data || [])
    } catch (error) {
      console.error('Error fetching customers:', error)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const supabase = getSupabaseClient()

    try {
      // Generar número de orden: ASN-YYYYMMDD-XXXX
      const today = new Date()
      const dateStr = today.toISOString().split('T')[0].replace(/-/g, '')
      
      // Obtener el último número del día
      const { count } = await supabase
        .from('receiving_orders')
        .select('*', { count: 'exact', head: true })
        .like('order_number', `ASN-${dateStr}%`)

      const sequence = String((count || 0) + 1).padStart(4, '0')
      const orderNumber = `ASN-${dateStr}-${sequence}`

      // Obtener warehouse_id (usamos el primero disponible)
      const { data: warehouses } = await supabase
        .from('warehouses')
        .select('id')
        .limit(1)

      if (!warehouses || warehouses.length === 0) {
        alert('Error: No hay depósitos configurados')
        return
      }

      // Insertar la orden
      const { error } = await supabase.from('receiving_orders').insert({
        order_number: orderNumber,
        customer_id: formData.customer_id,
        warehouse_id: warehouses[0].id,
        external_reference: formData.external_reference || null,
        expected_date: formData.expected_date || null,
        expected_pallets: formData.expected_pallets ? parseInt(formData.expected_pallets) : null,
        expected_bultos: formData.expected_bultos ? parseInt(formData.expected_bultos) : null,
        notes: formData.notes || null,
        status: 'expected',
      })

      if (error) throw error

      // Cerrar modal y refrescar
      setIsModalOpen(false)
      setFormData({
        customer_id: "",
        external_reference: "",
        expected_date: "",
        expected_pallets: "",
        expected_bultos: "",
        notes: "",
      })
      fetchOrders()

    } catch (error) {
      console.error('Error creating ASN:', error)
      alert('Error al crear la ASN')
    } finally {
      setSaving(false)
    }
  }

  // Filtrar por búsqueda
  const filteredOrders = orders.filter(order => {
    if (!searchTerm) return true
    const search = searchTerm.toLowerCase()
    return (
      order.order_number.toLowerCase().includes(search) ||
      order.customers?.business_name.toLowerCase().includes(search) ||
      order.external_reference?.toLowerCase().includes(search)
    )
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ASN / Órdenes de Ingreso</h1>
          <p className="text-muted-foreground">
            Gestión de avisos de envío anticipados
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva ASN
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por número, cliente o referencia..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                {Object.entries(statusConfig).map(([value, config]) => (
                  <SelectItem key={value} value={value}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredOrders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número ASN</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Referencia</TableHead>
                  <TableHead>Fecha Esperada</TableHead>
                  <TableHead>Pallets</TableHead>
                  <TableHead>Bultos</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Creado</TableHead>
                  <TableHead className="w-[100px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        {order.order_number}
                      </div>
                    </TableCell>
                    <TableCell>
                      {order.customers?.business_name || "—"}
                    </TableCell>
                    <TableCell>
                      {order.external_reference || "—"}
                    </TableCell>
                    <TableCell>
                      {order.expected_date ? (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {formatDate(order.expected_date)}
                        </div>
                      ) : "—"}
                    </TableCell>
                    <TableCell>{order.expected_pallets || "—"}</TableCell>
                    <TableCell>{order.expected_bultos || "—"}</TableCell>
                    <TableCell>
                      <Badge variant={statusConfig[order.status]?.variant || "default"}>
                        {statusConfig[order.status]?.label || order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDateTime(order.created_at)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" title="Ver detalle">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {order.status === 'expected' && (
                          <Button variant="ghost" size="icon" title="Editar">
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No hay ASN registradas</h3>
              <p className="text-muted-foreground mb-4">
                Crea tu primera orden de ingreso
              </p>
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nueva ASN
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal Crear ASN */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nueva ASN / Orden de Ingreso</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {/* Cliente */}
              <div className="grid gap-2">
                <Label htmlFor="customer">Cliente *</Label>
                <Select
                  value={formData.customer_id}
                  onValueChange={(value) => setFormData({ ...formData, customer_id: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.business_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Referencia externa */}
              <div className="grid gap-2">
                <Label htmlFor="reference">Referencia Externa</Label>
                <Input
                  id="reference"
                  placeholder="PO, Remito, BL..."
                  value={formData.external_reference}
                  onChange={(e) => setFormData({ ...formData, external_reference: e.target.value })}
                />
              </div>

              {/* Fecha esperada */}
              <div className="grid gap-2">
                <Label htmlFor="date">Fecha Esperada</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.expected_date}
                  onChange={(e) => setFormData({ ...formData, expected_date: e.target.value })}
                />
              </div>

              {/* Pallets y Bultos */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="pallets">Pallets Esperados</Label>
                  <Input
                    id="pallets"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.expected_pallets}
                    onChange={(e) => setFormData({ ...formData, expected_pallets: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bultos">Bultos Esperados</Label>
                  <Input
                    id="bultos"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.expected_bultos}
                    onChange={(e) => setFormData({ ...formData, expected_bultos: e.target.value })}
                  />
                </div>
              </div>

              {/* Notas */}
              <div className="grid gap-2">
                <Label htmlFor="notes">Notas</Label>
                <textarea
                  id="notes"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Observaciones..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={saving || !formData.customer_id}>
                {saving ? "Guardando..." : "Crear ASN"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
