"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  PackageCheck,
  Warehouse,
  ClipboardList,
  Truck,
  Navigation,
  Receipt,
  Settings,
  ChevronDown,
  Package,
  Calendar,
  ClipboardCheck,
  ShieldAlert,
  MapPin,
  Boxes,
  ArrowRightLeft,
  ListChecks,
  PackageSearch,
  PackagePlus,
  Users,
  Car,
  UserCircle,
  FileText,
  DollarSign,
} from "lucide-react"
import { useState } from "react"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children?: NavItem[]
}

const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Recepción",
    href: "/inbound",
    icon: PackageCheck,
    children: [
      { title: "ASN / Órdenes", href: "/inbound/asn", icon: Package },
      { title: "Turnos", href: "/inbound/turnos", icon: Calendar },
      { title: "Recepción", href: "/inbound/recepcion", icon: ClipboardCheck },
      { title: "Control Calidad", href: "/inbound/control", icon: ListChecks },
      { title: "Cuarentena", href: "/inbound/cuarentena", icon: ShieldAlert },
    ],
  },
  {
    title: "Almacén",
    href: "/warehouse",
    icon: Warehouse,
    children: [
      { title: "Ubicaciones", href: "/warehouse/ubicaciones", icon: MapPin },
      { title: "Stock", href: "/warehouse/stock", icon: Boxes },
      { title: "Movimientos", href: "/warehouse/movimientos", icon: ArrowRightLeft },
    ],
  },
  {
    title: "Pedidos",
    href: "/orders",
    icon: ClipboardList,
    children: [
      { title: "Lista Pedidos", href: "/orders", icon: ClipboardList },
      { title: "Picking", href: "/orders/picking", icon: PackageSearch },
      { title: "Packing", href: "/orders/packing", icon: PackagePlus },
    ],
  },
  {
    title: "Despacho",
    href: "/dispatch",
    icon: Truck,
  },
  {
    title: "Transporte",
    href: "/transport",
    icon: Navigation,
    children: [
      { title: "Vehículos", href: "/transport/vehiculos", icon: Car },
      { title: "Conductores", href: "/transport/conductores", icon: UserCircle },
      { title: "Entregas", href: "/transport/entregas", icon: Package },
    ],
  },
  {
    title: "Facturación",
    href: "/billing",
    icon: Receipt,
    children: [
      { title: "Tarifario", href: "/billing/tarifario", icon: DollarSign },
      { title: "Eventos", href: "/billing/eventos", icon: FileText },
    ],
  },
  {
    title: "Configuración",
    href: "/settings",
    icon: Settings,
    children: [
      { title: "Clientes", href: "/settings/clientes", icon: Users },
      { title: "Productos", href: "/settings/productos", icon: Package },
    ],
  },
]

function NavItemComponent({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(
    item.children?.some((child) => pathname.startsWith(child.href)) || false
  )
  
  const isActive = pathname === item.href || 
    (item.children && pathname.startsWith(item.href) && item.href !== "/")
  
  const hasChildren = item.children && item.children.length > 0

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center w-full gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
            isActive
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <item.icon className="h-5 w-5 flex-shrink-0" />
          <span className="flex-1 text-left">{item.title}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>
        {isOpen && (
          <div className="ml-4 mt-1 space-y-1 border-l pl-3">
            {item.children.map((child) => (
              <NavItemComponent key={child.href} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
        pathname === item.href
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <item.icon className="h-5 w-5 flex-shrink-0" />
      <span>{item.title}</span>
    </Link>
  )
}

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Warehouse className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Altitude</span>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navigation.map((item) => (
          <NavItemComponent key={item.href} item={item} />
        ))}
      </nav>
    </aside>
  )
}
