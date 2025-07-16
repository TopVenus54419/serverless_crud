export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string; // e.g., "coffee", "tea", "pastry"
  available: boolean;
  createdAt: string;
  updatedAt?: string;
}
