"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Plus, Search, Users, Edit, ToggleLeft, ToggleRight } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase"

interface Customer {
  id: string
  code: string
  business_name: string
  tax_id: string | null
  email: string | null
  phone: string | null
  contact_name: string | null
  is_active: boolean
  created_at: string
}

export default function ClientesPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)

  const [formData, setFormData] = useState({
    code: "",
    business_name: "",
    tax_id: "",
    email: "",
    phone: "",
    contact_name: "",
  })

  useEffect(() => {
    fetchCustomers()
  }, [])

  async function fetchCustomers() {
    const supabase = getSupabaseClient()
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('business_name')

      if (error) throw error
      setCustomers(data || [])
    } catch (error) {
      console.error('Error fetching customers:', error)
    } finally {
      setLoading(false)
    }
  }

  function openCreateModal() {
    setEditingCustomer(null)
    setFormData({
      code: "",
      business_name: "",
      tax_id: "",
      email: "",
      phone: "",
      contact_name: "",
    })
    setIsModalOpen(true)
  }

  function openEditModal(customer: Customer) {
    setEditingCustomer(customer)
    setFormData({
      code: customer.code,
      business_name: customer.business_name,
      tax_id: customer.tax_id || "",
      email: customer.email || "",
      phone: customer.phone || "",
      contact_name: customer.contact_name || "",
    })
    setIsModalOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const supabase = getSupabaseClient()

    try {
      if (editingCustomer) {
        const { error } = await supabase
          .from('customers')
          .update({
            code: formData.code,
            business_name: formData.business_name,
            tax_id: formData.tax_id || null,
            email: formData.email || null,
            phone: formData.phone || null,
            contact_name: formData.contact_name || null,
          })
          .eq('id', editingCustomer.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from('customers').insert({
          code: formData.code,
          business_name: formData.business_name,
          tax_id: formData.tax_id || null,
          email: formData.email || null,
          phone: formData.phone || null,
          contact_name: formData.contact_name || null,
          is_active: true,
        })

        if (error) throw error
      }

      setIsModalOpen(false)
      fetchCustomers()
    } catch (error) {
      console.error('Error saving customer:', error)
      alert('Error al guardar el cliente')
    } finally {
      setSaving(false)
    }
  }

  async function toggleActive(customer: Customer) {
    const supabase = getSupabaseClient()

    try {
      const { error } = await supabase
        .from('customers')
        .update({ is_active: !customer.is_active })
        .eq('id', customer.id)

      if (error) throw error
      fetchCustomers()
    } catch (error) {
      console.error('Error updating customer:', error)
    }
  }

  const filteredCustomers = customers.filter(customer => {
    if (!searchTerm) return true
    const search = searchTerm.toLowerCase()
    return (
      customer.code.toLowerCase().includes(search) ||
      customer.business_name.toLowerCase().includes(search) ||
      customer.tax_id?.toLowerCase().includes(search)
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-muted-foreground">Gestión de clientes del sistema</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Cliente
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por código, nombre o CUIT..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredCustomers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Razón Social</TableHead>
                  <TableHead>CUIT</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="w-[100px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.code}</TableCell>
                    <TableCell>{customer.business_name}</TableCell>
                    <TableCell>{customer.tax_id || "—"}</TableCell>
                    <TableCell>{customer.email || "—"}</TableCell>
                    <TableCell>{customer.phone || "—"}</TableCell>
                    <TableCell>{customer.contact_name || "—"}</TableCell>
                    <TableCell>
                      <Badge variant={customer.is_active ? "success" : "secondary"}>
                        {customer.is_active ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEditModal(customer)} title="Editar">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => toggleActive(customer)} title={customer.is_active ? "Desactivar" : "Activar"}>
                          {customer.is_active ? <ToggleRight className="h-4 w-4 text-green-600" /> : <ToggleLeft className="h-4 w-4" />}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No hay clientes registrados</h3>
              <p className="text-muted-foreground mb-4">Crea tu primer cliente para comenzar</p>
              <Button onClick={openCreateModal}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Cliente
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingCustomer ? "Editar Cliente" : "Nuevo Cliente"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="code">Código *</Label>
                  <Input id="code" placeholder="CLI-001" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tax_id">CUIT</Label>
                  <Input id="tax_id" placeholder="30-12345678-9" value={formData.tax_id} onChange={(e) => setFormData({ ...formData, tax_id: e.target.value })} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="business_name">Razón Social *</Label>
                <Input id="business_name" placeholder="Empresa S.A." value={formData.business_name} onChange={(e) => setFormData({ ...formData, business_name: e.target.value })} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="contacto@empresa.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" placeholder="+54 11 1234-5678" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact_name">Nombre de Contacto</Label>
                <Input id="contact_name" placeholder="Juan Pérez" value={formData.contact_name} onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })} />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={saving || !formData.code || !formData.business_name}>
                {saving ? "Guardando..." : editingCustomer ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
