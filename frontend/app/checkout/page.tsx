"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart } = useCart();

  const total = cart.reduce(
    (sum: number, product: any) =>
      sum + Number(product.price_per_kg) * product.quantity,
    0
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      // Create order in Django
      const orderResponse = await fetch(
        "http://127.0.0.1:8000/api/orders/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer: formData,
            cart: cart,
          }),
        }
      );

      const orderData = await orderResponse.json();

      console.log("Order created:", orderData);

      // Create Stripe checkout session
      const stripeResponse = await fetch(
        "http://127.0.0.1:8000/api/orders/checkout/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_id: orderData.order_id,
          }),
        }
      );

      const stripeData = await stripeResponse.json();

      console.log("Stripe response:", stripeData);

      if (stripeData.checkout_url) {
        window.location.href = stripeData.checkout_url;
      } else {
        alert("Stripe checkout failed");
      }
    } catch (error) {
      console.error("Checkout error:", error);

      alert("Something went wrong during checkout");
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F1E7]">
      <Navbar />

      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mb-12">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#68735B]">
              Almost there
            </p>

            <h1 className="font-serif text-5xl font-semibold tracking-tight text-[#3E3028] sm:text-6xl">
              Checkout
            </h1>

            <p className="mt-4 text-sm text-[#3E3028]/60 sm:text-base">
              Enter your details and complete your order securely.
            </p>
          </div>

          {cart.length === 0 ? (
            /* Empty Cart */
            <div className="rounded-3xl border border-[#3E3028]/10 bg-white px-6 py-20 text-center">

              <div className="mb-5 text-5xl">
                🛒
              </div>

              <h2 className="font-serif text-3xl font-semibold text-[#3E3028]">
                Your basket is empty
              </h2>

              <p className="mt-3 text-sm text-[#3E3028]/55">
                Add some products before checking out.
              </p>

              <Link
                href="/#products"
                className="mt-8 inline-flex rounded-full bg-[#3E3028] px-7 py-3.5 text-sm font-medium text-[#F7F1E7] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#514137]"
              >
                Browse Products →
              </Link>

            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_420px]">

              {/* Customer Information */}
              <div className="rounded-3xl border border-[#3E3028]/10 bg-white p-7 sm:p-9">

                <div className="mb-8">
                  <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#68735B]">
                    Delivery details
                  </p>

                  <h2 className="font-serif text-3xl font-semibold text-[#3E3028]">
                    Your Information
                  </h2>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-sm font-medium text-[#3E3028]"
                    >
                      Full Name
                    </label>

                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-[#3E3028]/15 bg-[#F7F1E7]/40 px-4 py-3.5 text-sm text-[#3E3028] outline-none transition-colors placeholder:text-[#3E3028]/30 focus:border-[#68735B] focus:bg-white"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid gap-5 sm:grid-cols-2">

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-[#3E3028]"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-[#3E3028]/15 bg-[#F7F1E7]/40 px-4 py-3.5 text-sm text-[#3E3028] outline-none transition-colors placeholder:text-[#3E3028]/30 focus:border-[#68735B] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-[#3E3028]"
                      >
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-[#3E3028]/15 bg-[#F7F1E7]/40 px-4 py-3.5 text-sm text-[#3E3028] outline-none transition-colors placeholder:text-[#3E3028]/30 focus:border-[#68735B] focus:bg-white"
                      />
                    </div>

                  </div>

                  {/* Address */}
                  <div>
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-medium text-[#3E3028]"
                    >
                      Delivery Address
                    </label>

                    <input
                      id="address"
                      type="text"
                      name="address"
                      placeholder="House number and street"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-[#3E3028]/15 bg-[#F7F1E7]/40 px-4 py-3.5 text-sm text-[#3E3028] outline-none transition-colors placeholder:text-[#3E3028]/30 focus:border-[#68735B] focus:bg-white"
                    />
                  </div>

                  {/* City + Postcode */}
                  <div className="grid gap-5 sm:grid-cols-2">

                    <div>
                      <label
                        htmlFor="city"
                        className="mb-2 block text-sm font-medium text-[#3E3028]"
                      >
                        Town / City
                      </label>

                      <input
                        id="city"
                        type="text"
                        name="city"
                        placeholder="Town or city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-[#3E3028]/15 bg-[#F7F1E7]/40 px-4 py-3.5 text-sm text-[#3E3028] outline-none transition-colors placeholder:text-[#3E3028]/30 focus:border-[#68735B] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="postcode"
                        className="mb-2 block text-sm font-medium text-[#3E3028]"
                      >
                        Postcode
                      </label>

                      <input
                        id="postcode"
                        type="text"
                        name="postcode"
                        placeholder="e.g. CW10 1AA"
                        value={formData.postcode}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-[#3E3028]/15 bg-[#F7F1E7]/40 px-4 py-3.5 text-sm text-[#3E3028] outline-none transition-colors placeholder:text-[#3E3028]/30 focus:border-[#68735B] focus:bg-white"
                      />
                    </div>

                  </div>

                  {/* Notes */}
                  <div>
                    <label
                      htmlFor="notes"
                      className="mb-2 block text-sm font-medium text-[#3E3028]"
                    >
                      Delivery Notes
                      <span className="ml-1 font-normal text-[#3E3028]/40">
                        (Optional)
                      </span>
                    </label>

                    <textarea
                      id="notes"
                      name="notes"
                      placeholder="Anything we should know about your delivery?"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      className="w-full resize-none rounded-xl border border-[#3E3028]/15 bg-[#F7F1E7]/40 px-4 py-3.5 text-sm text-[#3E3028] outline-none transition-colors placeholder:text-[#3E3028]/30 focus:border-[#68735B] focus:bg-white"
                    />
                  </div>

                  {/* Pay Button */}
                  <button
                    type="submit"
                    className="mt-3 flex w-full items-center justify-center rounded-full bg-[#3E3028] px-6 py-4 text-sm font-medium text-[#F7F1E7] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#514137]"
                  >
                    Pay Securely →
                  </button>

                  <p className="text-center text-xs text-[#3E3028]/40">
                    You'll be redirected to Stripe to complete your payment.
                  </p>

                </form>

              </div>

              {/* Order Summary */}
              <aside className="h-fit rounded-3xl bg-[#3E3028] p-7 text-[#F7F1E7] lg:sticky lg:top-28">

                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#C8B99F]">
                  Your selection
                </p>

                <h2 className="mt-3 font-serif text-3xl font-semibold">
                  Order Summary
                </h2>

                <div className="mt-8 space-y-5">

                  {cart.map((product: any) => (
                    <div
                      key={product.id}
                      className="flex gap-4"
                    >

                      {/* Product Image */}
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#F7F1E7]/10">

                        {product.image ? (
                          <img
                            src={`http://127.0.0.1:8000${product.image}`}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center px-1 text-center font-serif text-xs text-[#F7F1E7]/30">
                            {product.name}
                          </div>
                        )}

                      </div>

                      {/* Product Details */}
                      <div className="min-w-0 flex-1">

                        <div className="flex justify-between gap-4">

                          <p className="font-serif text-lg font-semibold">
                            {product.name}
                          </p>

                          <p className="shrink-0 text-sm font-medium">
                            £
                            {(
                              Number(product.price_per_kg) *
                              product.quantity
                            ).toFixed(2)}
                          </p>

                        </div>

                        <p className="mt-1 text-xs text-[#F7F1E7]/50">
                          {product.quantity} kg
                        </p>

                      </div>

                    </div>
                  ))}

                </div>

                {/* Total */}
                <div className="mt-8 border-t border-[#F7F1E7]/10 pt-6">

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-[#F7F1E7]/60">
                      Total
                    </span>

                    <span className="font-serif text-3xl font-semibold">
                      £{total.toFixed(2)}
                    </span>

                  </div>

                </div>

                <Link
                  href="/cart"
                  className="mt-6 block text-center text-xs text-[#F7F1E7]/40 transition-colors hover:text-[#F7F1E7]"
                >
                  ← Back to Basket
                </Link>

              </aside>

            </div>
          )}

        </div>
      </section>
    </main>
  );
}