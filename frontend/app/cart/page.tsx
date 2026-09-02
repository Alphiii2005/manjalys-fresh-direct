"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const total = cart.reduce(
    (sum: number, product: any) =>
      sum +
      Number(product.price_per_kg) * Number(product.quantity),
    0
  );

  return (
    <main className="min-h-screen bg-[#F7F1E7]">
      <Navbar />

      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mb-12">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#68735B]">
              Your selection
            </p>

            <h1 className="font-serif text-5xl font-semibold tracking-tight text-[#3E3028] sm:text-6xl">
              Your Basket
            </h1>

            <p className="mt-4 text-sm text-[#3E3028]/60 sm:text-base">
              Review your items before checking out.
            </p>
          </div>

          {cart.length === 0 ? (

            /* Empty Basket */
            <div className="rounded-3xl border border-[#3E3028]/10 bg-white px-6 py-20 text-center">

              <div className="mb-5 text-5xl">
                🛒
              </div>

              <h2 className="font-serif text-3xl font-semibold text-[#3E3028]">
                Your basket is empty
              </h2>

              <p className="mt-3 text-sm text-[#3E3028]/55">
                Add some fresh produce to get started.
              </p>

              <Link
                href="/#products"
                className="mt-8 inline-flex rounded-full bg-[#3E3028] px-7 py-3.5 text-sm font-medium text-[#F7F1E7] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#514137]"
              >
                Browse Products →
              </Link>

            </div>

          ) : (

            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

              {/* Cart Items */}
              <div className="space-y-4">

                {cart.map((product: any) => {

                  const itemTotal =
                    Number(product.price_per_kg) *
                    Number(product.quantity);

                  return (
                    <div
                      key={product.id}
                      className="rounded-2xl border border-[#3E3028]/10 bg-white p-5 transition-all duration-300 hover:shadow-md sm:p-6"
                    >

                      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                        {/* Product Image */}
                        <div className="h-28 w-full shrink-0 overflow-hidden rounded-xl bg-[#E9E0D2] sm:h-28 sm:w-32">

                          {product.image ? (
                            <img
                              src={`http://127.0.0.1:8000${product.image}`}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <span className="px-3 text-center font-serif text-lg text-[#3E3028]/30">
                                {product.name}
                              </span>
                            </div>
                          )}

                        </div>

                        {/* Product Information */}
                        <div className="flex-1">

                          <h2 className="font-serif text-2xl font-semibold text-[#3E3028]">
                            {product.name}
                          </h2>

                          <p className="mt-1 text-sm text-[#3E3028]/50">
                            £{Number(product.price_per_kg).toFixed(2)} per kg
                          </p>

                          {/* Quantity Controls */}
                          <div className="mt-4 flex items-center gap-3">

                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(product.id)
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#3E3028]/15 text-lg text-[#3E3028] transition-all duration-200 hover:bg-[#3E3028] hover:text-[#F7F1E7]"
                            >
                              −
                            </button>

                            <span className="min-w-16 text-center text-sm font-medium text-[#3E3028]">
                              {product.quantity} kg
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(product.id)
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#3E3028]/15 text-lg text-[#3E3028] transition-all duration-200 hover:bg-[#3E3028] hover:text-[#F7F1E7]"
                            >
                              +
                            </button>

                          </div>

                        </div>

                        {/* Price + Remove */}
                        <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end">

                          <p className="font-serif text-2xl font-semibold text-[#3E3028]">
                            £{itemTotal.toFixed(2)}
                          </p>

                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(product.id)
                            }
                            className="text-xs font-medium text-[#3E3028]/45 transition-colors hover:text-red-700"
                          >
                            Remove
                          </button>

                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>

              {/* Order Summary */}
              <aside className="h-fit rounded-3xl bg-[#3E3028] p-7 text-[#F7F1E7] lg:sticky lg:top-28">

                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#C8B99F]">
                  Order Summary
                </p>

                <h2 className="mt-3 font-serif text-3xl font-semibold">
                  Your order
                </h2>

                <div className="mt-8 space-y-4 border-b border-[#F7F1E7]/10 pb-6">

                  <div className="flex justify-between text-sm text-[#F7F1E7]/60">
                    <span>
                      Items
                    </span>

                    <span>
                      {cart.length}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-[#F7F1E7]/60">
                    <span>
                      Subtotal
                    </span>

                    <span>
                      £{total.toFixed(2)}
                    </span>
                  </div>

                </div>

                <div className="flex items-end justify-between py-6">

                  <span className="text-sm text-[#F7F1E7]/60">
                    Total
                  </span>

                  <span className="font-serif text-3xl font-semibold">
                    £{total.toFixed(2)}
                  </span>

                </div>

                <Link
                  href="/checkout"
                  className="flex w-full items-center justify-center rounded-full bg-[#F7F1E7] px-6 py-3.5 text-sm font-medium text-[#3E3028] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  Proceed to Checkout →
                </Link>

                <Link
                  href="/#products"
                  className="mt-4 flex w-full items-center justify-center text-xs text-[#F7F1E7]/45 transition-colors hover:text-[#F7F1E7]"
                >
                  Continue Shopping
                </Link>

              </aside>

            </div>

          )}

        </div>
      </section>
    </main>
  );
}