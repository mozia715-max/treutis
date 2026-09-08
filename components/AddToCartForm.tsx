"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { Product } from "@/lib/types";

export default function AddToCartForm({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0] || "");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  function handleAdd() {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size,
      qty: 1,
      imageUrl: product.imageUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div>
      {product.sizes.length > 0 && (
        <div className="mb-7 flex flex-wrap gap-2.5">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`border px-4 py-2.5 text-sm font-semibold ${
                size === s
                  ? "border-red bg-red"
                  : "border-fg hover:border-red"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
      <div className="flex gap-4">
        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className="bg-red px-7 py-4 text-[13px] font-bold uppercase tracking-wider hover:bg-fg hover:text-bg disabled:cursor-not-allowed disabled:bg-bg-alt-2 disabled:text-muted"
        >
          {product.inStock
            ? added
              ? "Added ✓"
              : "Add to Cart"
            : "Out of Stock"}
        </button>
        <button
          onClick={() => {
            handleAdd();
            router.push("/cart");
          }}
          disabled={!product.inStock}
          className="border border-fg px-7 py-4 text-[13px] font-bold uppercase tracking-wider hover:border-red hover:text-red disabled:cursor-not-allowed disabled:opacity-40"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
