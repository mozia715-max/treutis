"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-bg/90 px-[5vw] py-5 backdrop-blur">
      <Link href="/" className="flex items-center">
        <Image
          src="/treutis-logo.png"
          alt="Treutis"
          width={140}
          height={24}
          className="h-5 w-auto"
          priority
        />
      </Link>
      <nav className="hidden gap-8 text-[13px] font-semibold uppercase tracking-wider md:flex">
        <Link href="/" className="hover:text-red">
          New Arrivals
        </Link>
        <Link href="/collection" className="hover:text-red">
          Collection
        </Link>
      </nav>
      <Link
        href="/cart"
        className="border border-fg px-3.5 py-2 text-xs font-semibold uppercase tracking-wider hover:border-red hover:text-red"
      >
        Cart ({count})
      </Link>
    </header>
  );
}
