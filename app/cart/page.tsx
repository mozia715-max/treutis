"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, removeItem, updateQty, total } = useCart();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

  function buildWhatsAppMessage() {
    const lines = items.map(
      (i) => `• ${i.name} (${i.size}) x${i.qty} — AED ${i.price * i.qty}`
    );
    const message = [
      "Hi Treutis! I'd like to order:",
      "",
      ...lines,
      "",
      `Total: AED ${total}`,
      "",
      "Name:",
      "Delivery address:",
    ].join("\n");
    return encodeURIComponent(message);
  }

  const checkoutUrl = `https://wa.me/${whatsappNumber}?text=${buildWhatsAppMessage()}`;

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-[900px] px-[5vw] py-[6vw]">
        <h1 className="font-display mb-8 text-4xl uppercase">Your Cart</h1>
        <div className="py-20 text-center text-muted">
          Your cart is empty.
          <br />
          <Link href="/collection" className="mt-5 inline-block text-red hover:underline">
            Browse the collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[900px] px-[5vw] py-[6vw]">
      <h1 className="font-display mb-8 text-4xl uppercase">Your Cart</h1>

      {items.map((item) => (
        <div
          key={`${item.productId}-${item.size}`}
          className="grid grid-cols-[90px_1fr_auto_auto] items-center gap-5 border-b border-white/10 py-5"
        >
          <div className="relative aspect-[4/5] w-[90px] overflow-hidden border border-white/10 bg-gradient-to-br from-[#202023] to-[#0d0d0e]">
            {item.imageUrl && (
              <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
            )}
          </div>
          <div>
            <h4 className="mb-1.5 text-sm font-bold uppercase">{item.name}</h4>
            <div className="text-xs text-muted">
              Size {item.size} · AED {item.price}
            </div>
          </div>
          <div className="flex items-center border border-fg">
            <button
              className="px-3 py-2 font-bold"
              onClick={() =>
                updateQty(item.productId, item.size, Math.max(1, item.qty - 1))
              }
            >
              −
            </button>
            <span className="min-w-[20px] px-2.5 text-center text-sm">
              {item.qty}
            </span>
            <button
              className="px-3 py-2 font-bold"
              onClick={() => updateQty(item.productId, item.size, item.qty + 1)}
            >
              +
            </button>
          </div>
          <button
            className="text-[11px] font-semibold uppercase tracking-wider text-muted hover:text-red"
            onClick={() => removeItem(item.productId, item.size)}
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-8 flex items-center justify-between border-t-2 border-fg pt-6">
        <span className="font-display text-2xl">Total: AED {total}</span>
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red px-7 py-4 text-[13px] font-bold uppercase tracking-wider hover:bg-fg hover:text-bg"
        >
          Checkout on WhatsApp
        </a>
      </div>
    </main>
  );
}
