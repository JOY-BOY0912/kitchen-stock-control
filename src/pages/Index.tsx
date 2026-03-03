import { Loader2, LayoutDashboard } from "lucide-react";
import { useInventory } from "@/hooks/useInventory";
import StatsBar from "@/components/StatsBar";
import InventoryCard from "@/components/InventoryCard";

const Index = () => {
  const { data: items, isLoading, isError, toggleStatus, isToggling, togglingId } = useInventory();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
        <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <LayoutDashboard className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-serif font-light text-foreground tracking-wide">Inventory Management</h1>
            <p className="text-sm text-muted-foreground font-sans">Manage item availability</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground text-sm">Loading inventory…</p>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="glass-card p-8 text-center">
            <p className="text-destructive font-medium">Failed to load inventory.</p>
            <p className="text-muted-foreground text-sm mt-1">Please check your connection and try again.</p>
          </div>
        )}

        {/* Content */}
        {items && (
          <>
            <StatsBar items={items} />

            <div className="space-y-3">
              {items.map((item) => (
                <InventoryCard
                  key={item.id}
                  item={item}
                  onToggle={toggleStatus}
                  isToggling={isToggling && togglingId === item.id}
                />
              ))}

              {items.length === 0 && (
                <div className="glass-card p-12 text-center">
                  <p className="text-muted-foreground">No inventory items found.</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
