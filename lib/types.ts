export interface Product {
  id: string;
  name: string;
  category: string;
  fabric: string;
  fit: string;
  price: number;
  description: string;
  sizes: string[];
  imageUrl: string;
  inStock: boolean;
  createdAt: number;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  size: string;
  qty: number;
  imageUrl: string;
}
