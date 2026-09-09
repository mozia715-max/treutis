import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const revalidate = 60; // refresh product list every 60s

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <main>
      {/* Hero */}
      <section className="grid min-h-[78vh] grid-cols-1 border-b border-white/10 md:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col justify-center px-[5vw] py-[6vw]">
          <div className="mb-6 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] text-red">
            <span className="h-0.5 w-6 bg-red" />
            SS26 Collection — Drop 01
          </div>
          <h1 className="font-display mb-6 text-[clamp(48px,7vw,92px)] uppercase leading-[0.92] tracking-wide">
            Built to
            <br />
            be <span className="text-red">worn</span>,
            <br />
            not shelved
          </h1>
          <p className="mb-8 max-w-[420px] text-base leading-relaxed text-muted">
            Treutis makes clothing for daily use — reinforced seams, real
            fabric weights, and cuts that hold their shape past the first
            wash.
          </p>
          <div className="flex gap-4">
            <Link
              href="/collection"
              className="bg-red px-7 py-4 text-[13px] font-bold uppercase tracking-wider hover:bg-fg hover:text-bg"
            >
              Shop the Drop
            </Link>
          </div>
        </div>
        <div className="relative flex items-center justify-center bg-white p-10">
          <Image
            src="/treutis-logo-white.png"
            alt="Treutis"
            width={1419}
            height={271}
            className="h-auto w-full max-w-[420px] animate-logo-intro"
          />
        </div>
      </section>

      {/* Product grid */}
      <div className="flex items-baseline justify-between border-b border-white/10 px-[5vw] py-16 pb-7">
        <h2 className="font-display text-[34px] uppercase tracking-wide">
          New In
        </h2>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          {products.length} pieces
        </span>
      </div>

      {products.length === 0 ? (
        <div className="px-[5vw] py-24 text-center text-muted">
          No products yet.{" "}
          <Link href="/admin" className="text-red hover:underline">
            Add your first one in the admin panel
          </Link>
          .
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-px border-b border-white/10 bg-white/10 sm:grid-cols-2 md:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
