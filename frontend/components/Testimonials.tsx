import ReviewForm from "./ReviewForm";

const testimonials = [
  {
    name: "Customer Name",
    location: "UK",
    review: "Customer review will appear here.",
  },
  {
    name: "Customer Name",
    location: "UK",
    review: "Customer review will appear here.",
  },
  {
    name: "Customer Name",
    location: "UK",
    review: "Customer review will appear here.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#F7F1E7] px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-14">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#68735B]">
            Customer experiences
          </p>

          <h2 className="font-serif text-5xl font-semibold tracking-tight text-[#3E3028] sm:text-6xl">
            What Our Customers Say
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#3E3028]/60 sm:text-base">
            We value every customer and every piece of feedback.
          </p>
        </div>

        {/* Reviews */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[#3E3028]/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex gap-1 text-[#B8955A]">
                ★ ★ ★ ★ ★
              </div>

              <p className="font-serif text-xl leading-8 text-[#3E3028]">
                "{testimonial.review}"
              </p>

              <div className="mt-7 border-t border-[#3E3028]/10 pt-5">
                <p className="text-sm font-semibold text-[#3E3028]">
                  {testimonial.name}
                </p>

                <p className="mt-1 text-xs text-[#3E3028]/50">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Review form */}
        <ReviewForm />

      </div>
    </section>
  );
}