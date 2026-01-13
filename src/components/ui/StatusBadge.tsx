import { cn } from "@/lib/utils";

export type InboundStatus = "expected" | "in_dock" | "unloading" | "received" | "closed";
export type StockStatus = "available" | "committed" | "blocked";
export type OutboundStatus = "pending" | "picking" | "packing" | "ready" | "dispatched";
export type Status = InboundStatus | StockStatus | OutboundStatus;

const statusLabels: Record<Status, string> = {
  expected: "Esperado", in_dock: "En Anden", unloading: "Descargando", received: "Recibido", closed: "Cerrado",
  available: "Disponible", committed: "Comprometido", blocked: "Bloqueado",
  pending: "Pendiente", picking: "Picking", packing: "Packing", ready: "Listo", dispatched: "Despachado",
};

const statusColors: Record<Status, string> = {
  expected: "status-expected", in_dock: "status-dock", unloading: "status-unloading", received: "status-received", closed: "status-closed",
  available: "status-available", committed: "status-committed", blocked: "status-blocked",
  pending: "status-pending", picking: "status-picking", packing: "status-packing", ready: "status-ready", dispatched: "status-dispatched",
};

interface StatusBadgeProps { status: Status; size?: "sm" | "md" | "lg"; showDot?: boolean; animate?: boolean; }

export function StatusBadge({ status, size = "md", showDot = true, animate = false }: StatusBadgeProps) {
  const sizeClasses = { sm: "text-[10px] px-2 py-0.5", md: "text-xs px-2.5 py-1", lg: "text-sm px-3 py-1.5" };
  return (
    <span className={cn("status-badge", statusColors[status], sizeClasses[size])}>
      {showDot && <span className={cn("dot-indicator", animate && "animate-pulse", `bg-${statusColors[status].replace("status-", "status-")}`, { "bg-status-expected": status === "expected", "bg-status-dock": status === "in_dock", "bg-status-unloading": status === "unloading", "bg-status-received": status === "received", "bg-status-closed": status === "closed", "bg-status-available": status === "available", "bg-status-committed": status === "committed", "bg-status-blocked": status === "blocked", "bg-status-pending": status === "pending", "bg-status-picking": status === "picking", "bg-status-packing": status === "packing", "bg-status-ready": status === "ready", "bg-status-dispatched": status === "dispatched" })} />}
      {statusLabels[status]}
    </span>
  );
}

export function StatusDot({ status, animate = false }: { status: Status; animate?: boolean }) {
  return <span className={cn("dot-indicator", animate && "animate-pulse", { "bg-status-expected": status === "expected", "bg-status-dock": status === "in_dock", "bg-status-unloading": status === "unloading", "bg-status-received": status === "received", "bg-status-closed": status === "closed", "bg-status-available": status === "available", "bg-status-committed": status === "committed", "bg-status-blocked": status === "blocked", "bg-status-pending": status === "pending", "bg-status-picking": status === "picking", "bg-status-packing": status === "packing", "bg-status-ready": status === "ready", "bg-status-dispatched": status === "dispatched" })} />;
}