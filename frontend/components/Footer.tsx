import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#2F2722] px-6 py-16"
    >
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-12 md:grid-cols-3">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex flex-col leading-none"
            >
              <span className="font-serif text-3xl font-semibold tracking-tight text-[#F7F1E7]">
                Manjaly's
              </span>

              <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#C8B99F]">
                Fresh Direct
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#F7F1E7]/50">
              Quality meat and farm produce, delivered straight
              to your door.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-[#C8B99F]">
              Explore
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm text-[#F7F1E7]/60 transition-colors hover:text-[#F7F1E7]"
              >
                Home
              </Link>

              <Link
                href="#products"
                className="text-sm text-[#F7F1E7]/60 transition-colors hover:text-[#F7F1E7]"
              >
                Shop
              </Link>

              <Link
                href="#about"
                className="text-sm text-[#F7F1E7]/60 transition-colors hover:text-[#F7F1E7]"
              >
                About
              </Link>

              <Link
                href="#contact"
                className="text-sm text-[#F7F1E7]/60 transition-colors hover:text-[#F7F1E7]"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-[#C8B99F]">
              Get In Touch
            </h3>

            <div className="space-y-3 text-sm text-[#F7F1E7]/60">
              <p>Email: Contact us</p>
              <p>Phone: Contact us</p>
              <p>UK Delivery</p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-[#F7F1E7]/10 pt-7 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-[#F7F1E7]/35">
            © {new Date().getFullYear()} Manjaly's Fresh Direct.
            All rights reserved.
          </p>

          <p className="text-xs text-[#F7F1E7]/30">
            Freshness you can trust.
          </p>

        </div>

      </div>
    </footer>
  );
}