export interface InventoryItem {
  id: number;
  food_item: string;
  status: "Available" | "Out of Stock";
  price: number;
}

const API_BASE = "https://n8n.srv1302157.hstgr.cloud/webhook";

export async function fetchInventory(): Promise<InventoryItem[]> {
  const res = await fetch(`${API_BASE}/get-inventory`);
  if (!res.ok) throw new Error("Failed to fetch inventory");
  return res.json();
}

export async function updateInventoryStatus(
  id: number,
  status: "Available" | "Out of Stock"
): Promise<void> {
  const res = await fetch(`${API_BASE}/update-inventory`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  if (!res.ok) throw new Error("Failed to update item status");
}
