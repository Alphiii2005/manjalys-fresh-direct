import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#F7F1E7]">
      <Navbar />

      <section className="flex min-h-screen items-center justify-center px-6 pt-20">
        <div className="w-full max-w-2xl text-center">

          {/* Success icon */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#68735B] text-3xl text-white shadow-lg">
            ✓
          </div>

          {/* Heading */}
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-[#68735B]">
            Order Confirmed
          </p>

          <h1 className="font-serif text-5xl font-semibold tracking-tight text-[#3E3028] sm:text-6xl">
            Thank you for your order.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#3E3028]/60">
            Your payment has been received successfully. We&apos;ve received
            your order and will begin preparing it for you.
          </p>

          {/* Confirmation card */}
          <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-[#3E3028]/10 bg-white p-7 text-left shadow-sm">
            <div className="flex items-center justify-between border-b border-[#3E3028]/10 pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#3E3028]/40">
                  Payment
                </p>
                <p className="mt-1 text-sm font-medium text-[#3E3028]">
                  Successfully received
                </p>
              </div>

              <span className="rounded-full bg-[#68735B]/10 px-3 py-1.5 text-xs font-medium text-[#68735B]">
                Paid
              </span>
            </div>

            <p className="pt-5 text-sm leading-6 text-[#3E3028]/60">
              A confirmation email has been sent with your order details.
              Please keep it for your records.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/#products"
              className="rounded-full bg-[#3E3028] px-7 py-3.5 text-sm font-medium text-[#F7F1E7] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#514137] hover:shadow-lg"
            >
              Continue Shopping
            </Link>

            <Link
              href="/"
              className="rounded-full border border-[#3E3028]/15 px-7 py-3.5 text-sm font-medium text-[#3E3028] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3E3028]/30 hover:bg-white"
            >
              Back to Home
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}