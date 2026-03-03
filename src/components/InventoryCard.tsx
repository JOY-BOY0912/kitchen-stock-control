import { Loader2, UtensilsCrossed } from "lucide-react";
import { InventoryItem } from "@/services/inventoryApi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface InventoryCardProps {
  item: InventoryItem;
  onToggle: (args: { id: number; status: "Available" | "Out of Stock" }) => void;
  isToggling: boolean;
}

const InventoryCard = ({ item, onToggle, isToggling }: InventoryCardProps) => {
  const isAvailable = item.status === "Available";
  const newStatus = isAvailable ? "Out of Stock" : "Available";

  return (
    <div className="glass-card p-6 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-300 hover:shadow-lg hover:border-primary/15">
      {/* Icon */}
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
        <UtensilsCrossed className="w-6 h-6 text-muted-foreground" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-foreground truncate">{item.food_item}</h3>
        <p className="text-lg font-serif font-light text-primary mt-0.5">
          ₹{item.price.toFixed(2)}
        </p>
      </div>

      {/* Status + Action */}
      <div className="flex items-center gap-3 sm:flex-shrink-0">
        <Badge
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            isAvailable ? "status-available" : "status-out-of-stock"
          }`}
          variant="outline"
        >
          {item.status}
        </Badge>

        <Button
          size="sm"
          variant={isAvailable ? "destructive" : "default"}
          disabled={isToggling}
          onClick={() => onToggle({ id: item.id, status: newStatus })}
          className="min-w-[140px] text-xs font-display uppercase tracking-wider transition-all duration-300"
        >
          {isToggling ? (
            <Loader2 className="w-4 h-4 animate-spin mr-1" />
          ) : null}
          {isAvailable ? "Mark Out of Stock" : "Mark Available"}
        </Button>
      </div>
    </div>
  );
};

export default InventoryCard;
