import { getAllProducts } from "@/lib/products";
import CollectionFilter from "@/components/CollectionFilter";

export const revalidate = 60;

export default async function CollectionPage() {
  const products = await getAllProducts();

  return (
    <main>
      <div className="flex items-baseline justify-between border-b border-white/10 px-[5vw] py-16 pb-7">
        <h2 className="font-display text-[34px] uppercase tracking-wide">
          Full Collection
        </h2>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          {products.length} pieces
        </span>
      </div>

      {products.length === 0 ? (
        <div className="px-[5vw] py-24 text-center text-muted">
          No products yet.
        </div>
      ) : (
        <CollectionFilter products={products} />
      )}
    </main>
  );
}
