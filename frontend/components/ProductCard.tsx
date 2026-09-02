"use client";

import { useCart } from "@/context/CartContext";

type Product = {
  id: number;
  name: string;
  description: string;
  price_per_kg: string;
  stock_kg: string;
  image: string;
};

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#3E3028]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* Image */}
      <div className="relative h-72 overflow-hidden bg-[#E9E0D2]">

        {product.image ? (
          <img
            src={`http://127.0.0.1:8000${product.image}`}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-serif text-4xl text-[#3E3028]/30">
              {product.name}
            </span>
          </div>
        )}

        {/* Fresh badge */}
        <div className="absolute left-4 top-4 rounded-full bg-[#68735B] px-3 py-1.5 text-xs font-medium text-white shadow-sm">
          Fresh
        </div>

      </div>

      {/* Content */}
      <div className="p-6">

        <div className="flex items-start justify-between gap-4">

          <div>
            <h3 className="font-serif text-2xl font-semibold text-[#3E3028]">
              {product.name}
            </h3>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#3E3028]/60">
              {product.description}
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-6 flex items-center justify-between border-t border-[#3E3028]/10 pt-5">

          <div>
            <p className="font-serif text-2xl font-semibold text-[#3E3028]">
              £{product.price_per_kg}
            </p>

            <p className="text-xs text-[#3E3028]/50">
              per kg
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="rounded-full bg-[#3E3028] px-5 py-2.5 text-sm font-medium text-[#F7F1E7] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#514137]"
          >
            Add +
          </button>

        </div>

      </div>

    </article>
  );
}