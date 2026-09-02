"use client";

import { useEffect, useState } from "react";

const rotatingProducts = [
  "Meat",
  "Eggs",
  "Brisket",
  "Liver",
  "Chicken",
];

export default function Hero() {
  const [currentProduct, setCurrentProduct] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct(
        (previous) =>
          (previous + 1) % rotatingProducts.length
      );
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#3E3028] pt-20">

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, #F7F1E7 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Decorative glow */}
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#68735B]/20 blur-3xl" />

      {/* Main content */}
      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-6 py-20">

        <div className="max-w-5xl">

          {/* Badge */}
          <div className="mb-7 inline-flex items-center rounded-full border border-[#D7C9B2]/30 bg-[#F7F1E7]/10 px-5 py-2 text-sm text-[#F7F1E7] backdrop-blur-sm">
            <span className="mr-2">🌿</span>
            Locally Sourced · UK Delivery
          </div>

          {/* Heading */}
          <h1 className="max-w-5xl font-serif text-5xl font-semibold leading-[0.95] tracking-tight text-[#F7F1E7] sm:text-6xl md:text-7xl lg:text-8xl">

            <span className="block">
              Premium
            </span>

            <span className="block text-[#F7F1E7]">

              {/* Animated product */}
              <span
                key={currentProduct}
                className="inline-block min-w-[5ch] animate-product-fade italic font-normal text-[#C8B99F]"
              >
                {rotatingProducts[currentProduct]}
              </span>

              {/* This stays WHITE */}
              <span className="ml-3 text-[#F7F1E7]">
                & Farm Produce
              </span>

            </span>

          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-base leading-8 text-[#F7F1E7]/70 sm:text-lg">
            Fresh, quality meat and farm produce, carefully sourced
            and delivered straight to your door.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">

            <a
              href="#products"
              className="rounded-full bg-[#F7F1E7] px-7 py-3.5 font-medium text-[#3E3028] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Shop Now →
            </a>

            <a
              href="#about"
              className="rounded-full border border-[#F7F1E7]/30 px-7 py-3.5 font-medium text-[#F7F1E7] transition-all duration-300 hover:-translate-y-1 hover:border-[#F7F1E7] hover:bg-[#F7F1E7]/10"
            >
              About Us
            </a>

          </div>

          {/* Stats */}
          <div className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-[#F7F1E7]/15 pt-8">

            <div>
              <p className="font-serif text-3xl font-semibold text-[#F7F1E7]">
                50+
              </p>

              <p className="mt-1 text-xs uppercase tracking-wider text-[#F7F1E7]/50">
                Families served
              </p>
            </div>

            <div>
              <p className="font-serif text-3xl font-semibold text-[#F7F1E7]">
                Fresh
              </p>

              <p className="mt-1 text-xs uppercase tracking-wider text-[#F7F1E7]/50">
                Quality produce
              </p>
            </div>

            <div>
              <p className="font-serif text-3xl font-semibold text-[#F7F1E7]">
                UK
              </p>

              <p className="mt-1 text-xs uppercase tracking-wider text-[#F7F1E7]/50">
                Local delivery
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}