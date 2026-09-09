"use client";

import { useMemo, useState } from "react";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function CollectionFilter({
  products,
}: {
  products: Product[];
}) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        query.trim() === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-white/10 px-[5vw] py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`border px-4 py-2 text-xs font-semibold uppercase tracking-wider ${
                category === c
                  ? "border-red bg-red text-fg"
                  : "border-white/20 text-fg hover:border-red"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search products…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-white/20 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-red sm:w-64"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="px-[5vw] py-24 text-center text-muted">
          No products match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-px border-b border-white/10 bg-white/10 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
