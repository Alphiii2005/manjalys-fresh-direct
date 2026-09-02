"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-[#3E3028]/10 bg-[#F7F1E7]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="group flex flex-col leading-none"
        >
          <span className="font-serif text-2xl font-semibold tracking-tight text-[#3E3028]">
            Manjaly's
          </span>

          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.25em] text-[#68735B]">
            Fresh Direct
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-[#3E3028] transition-colors duration-200 hover:text-[#68735B]"
          >
            Home
          </Link>

          <Link
            href="/#products"
            className="text-sm font-medium text-[#3E3028]/70 transition-colors duration-200 hover:text-[#68735B]"
          >
            Shop
          </Link>

          <Link
            href="/#about"
            className="text-sm font-medium text-[#3E3028]/70 transition-colors duration-200 hover:text-[#68735B]"
          >
            About
          </Link>

          <Link
            href="/#contact"
            className="text-sm font-medium text-[#3E3028]/70 transition-colors duration-200 hover:text-[#68735B]"
          >
            Contact
          </Link>
        </div>

        {/* Cart */}
        <Link
          href="/cart"
          className="group flex items-center gap-3 rounded-full border border-[#3E3028]/15 bg-[#3E3028] px-5 py-2.5 text-sm font-medium text-[#F7F1E7] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#514137]"
        >
          <span>Basket</span>

          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#F7F1E7] px-1.5 text-xs font-semibold text-[#3E3028]">
            {cart.length}
          </span>
        </Link>

      </div>
    </nav>
  );
}