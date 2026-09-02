import Link from "next/link";

export default function DeliveryBanner() {
  return (
    <section className="bg-[#4F5C43] px-6 py-24 sm:py-28">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">

        <p className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-[#F7F1E7]/60">
          Manjaly's Fresh Direct
        </p>

        <h2 className="max-w-4xl font-serif text-5xl font-semibold leading-[1] tracking-tight text-[#F7F1E7] sm:text-6xl md:text-7xl">
          Fresh quality,
          <br />
          <span className="italic font-normal text-[#C8B99F]">
            delivered to your door.
          </span>
        </h2>

        <Link
          href="#products"
          data-tooltip="Start your order"
          className="delivery-button mt-10"
        >
          <span className="delivery-button-wrapper">
            <span className="delivery-button-text">
              Order Now
            </span>

            <span className="delivery-button-icon">
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 1 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 1 1-4 0z" />
              </svg>
            </span>
          </span>
        </Link>

      </div>
    </section>
  );
}