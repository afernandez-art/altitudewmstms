import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconColor?: string;
  trend?: { value: number; label: string; direction: "up" | "down" | "neutral" };
  highlight?: boolean;
  onClick?: () => void;
}

export function KPICard({ title, value, icon, iconColor = "text-primary", trend, highlight = false, onClick }: KPICardProps) {
  return (
    <div className={cn("kpi-card", highlight && "ring-2 ring-red-500/50", onClick && "cursor-pointer hover:scale-[1.02]")} onClick={onClick}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
        <div className={cn("size-9 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-background-dark", iconColor)}>{icon}</div>
      </div>
      <p className="text-3xl font-black tracking-tight">{value}</p>
      {trend && (
        <div className="flex items-center gap-1.5">
          {trend.direction === "up" && <TrendingUp size={14} className="text-emerald-500" />}
          {trend.direction === "down" && <TrendingDown size={14} className="text-red-500" />}
          {trend.direction === "neutral" && <Minus size={14} className="text-slate-400" />}
          <span className={cn("text-xs font-medium", trend.direction === "up" && "text-emerald-500", trend.direction === "down" && "text-red-500", trend.direction === "neutral" && "text-slate-400")}>
            {trend.value > 0 && "+"}{trend.value}%
          </span>
          <span className="text-xs text-slate-400">{trend.label}</span>
        </div>
      )}
    </div>
  );
}