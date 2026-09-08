import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col bg-bg-alt p-6 transition-colors hover:bg-bg-alt-2">
      <div className="mb-4 flex items-start justify-between text-[11px] font-semibold uppercase tracking-wider text-muted">
        <span>{product.category}</span>
        <span>{product.id.slice(0, 6).toUpperCase()}</span>
      </div>
      <Link href={`/products/${product.id}`}>
        <div className="relative mb-5 aspect-[4/5] overflow-hidden border border-white/10 bg-gradient-to-br from-[#202023] to-[#0d0d0e]">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute bottom-3 left-3 font-display text-sm text-fg/40">
              TREUTIS
            </div>
          )}
        </div>
      </Link>
      <h3 className="mb-2.5 text-[17px] font-bold uppercase tracking-wide">
        <Link href={`/products/${product.id}`} className="hover:text-red">
          {product.name}
        </Link>
      </h3>
      <div className="flex justify-between border-t border-dashed border-white/10 py-1.5 text-xs text-muted">
        <span>Fabric</span>
        <span>{product.fabric}</span>
      </div>
      <div className="mb-4 flex justify-between border-y border-dashed border-white/10 py-1.5 text-xs text-muted">
        <span>Fit</span>
        <span>{product.fit}</span>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <div className="font-display text-xl">AED {product.price}</div>
        <Link
          href={`/products/${product.id}`}
          className="border border-fg px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider hover:border-red hover:bg-red"
        >
          View
        </Link>
      </div>
    </div>
  );
}
