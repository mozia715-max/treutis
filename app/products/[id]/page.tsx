import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import AddToCartForm from "@/components/AddToCartForm";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  return (
    <main>
      <div className="px-[5vw] pt-5 text-xs uppercase tracking-wider text-muted">
        <Link href="/" className="hover:text-red">
          Home
        </Link>{" "}
        / <span>{product.category}</span> / <span>{product.name}</span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-px border-b border-white/10 bg-white/10 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden bg-bg-alt">
          <div className="absolute inset-0 bg-gradient-to-br from-[#202023] to-[#0d0d0e]" />
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="bg-bg-alt p-[5vw]">
          <div className="mb-3.5 text-[11px] font-bold uppercase tracking-wider text-red">
            {product.category}
          </div>
          <h1 className="font-display mb-4 text-[clamp(30px,3.2vw,42px)] uppercase leading-tight">
            {product.name}
          </h1>
          <div className="font-display mb-6 text-2xl">
            AED {product.price}
          </div>
          <p className="mb-7 max-w-[440px] text-sm leading-relaxed text-muted">
            {product.description}
          </p>
          <div className="mb-7 border-t border-white/10">
            <div className="flex justify-between border-b border-white/10 py-2.5 text-[13px]">
              <span className="text-muted">Fabric</span>
              <span>{product.fabric}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 py-2.5 text-[13px]">
              <span className="text-muted">Fit</span>
              <span>{product.fit}</span>
            </div>
          </div>
          <AddToCartForm product={product} />
        </div>
      </div>
    </main>
  );
}
