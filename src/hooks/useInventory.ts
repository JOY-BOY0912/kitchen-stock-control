import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchInventory, updateInventoryStatus, InventoryItem } from "@/services/inventoryApi";
import { useToast } from "@/hooks/use-toast";

export function useInventory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const query = useQuery({
    queryKey: ["inventory"],
    queryFn: fetchInventory,
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: "Available" | "Out of Stock" }) =>
      updateInventoryStatus(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["inventory"] });
      const previous = queryClient.getQueryData<InventoryItem[]>(["inventory"]);
      queryClient.setQueryData<InventoryItem[]>(["inventory"], (old) =>
        old?.map((item) => (item.id === id ? { ...item, status } : item))
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["inventory"], context?.previous);
      toast({
        title: "Update failed",
        description: "Could not update item status. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Status updated",
        description: "Item availability has been updated successfully.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });

  return { ...query, toggleStatus: mutation.mutate, isToggling: mutation.isPending, togglingId: mutation.variables?.id };
}
