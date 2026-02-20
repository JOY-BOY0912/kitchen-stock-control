import { Package, TrendingUp, AlertTriangle } from "lucide-react";
import { InventoryItem } from "@/services/inventoryApi";

interface StatsBarProps {
  items: InventoryItem[];
}

const StatsBar = ({ items }: StatsBarProps) => {
  const total = items.length;
  const available = items.filter((i) => i.status === "Available").length;
  const outOfStock = items.filter((i) => i.status === "Out of Stock").length;

  const stats = [
    { label: "Total Items", value: total, icon: Package, color: "text-primary" },
    { label: "Available", value: available, icon: TrendingUp, color: "text-success" },
    { label: "Out of Stock", value: outOfStock, icon: AlertTriangle, color: "text-destructive" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="glass-card p-5 flex items-center gap-4">
          <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
            <stat.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
