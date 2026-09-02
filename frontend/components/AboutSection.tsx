export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-[#3E3028] px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* Left: Story */}
          <div>

            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#C8B99F]">
              Our Story
            </p>

            <h2 className="max-w-xl font-serif text-5xl font-semibold leading-[1] tracking-tight text-[#F7F1E7] sm:text-6xl">
              A Family's Promise
              <br />
              <span className="italic font-normal text-[#C8B99F]">
                of Quality
              </span>
            </h2>

            <div className="mt-8 max-w-xl space-y-5 text-sm leading-7 text-[#F7F1E7]/65 sm:text-base">

              <p>
                At Manjaly's Fresh Direct, we believe good food starts
                with good ingredients. Our goal is simple: to make
                quality meat and farm produce easier to enjoy at home.
              </p>

              <p>
                From carefully selected cuts of meat to fresh farm
                produce, we focus on quality, freshness and making
                every order feel personal.
              </p>

              <p>
                We're building Manjaly's Fresh Direct around the things
                that matter most: honest products, reliable service
                and food we're proud to put on the table.
              </p>

            </div>

          </div>

          {/* Right: Values */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Card 1 */}
            <div className="rounded-2xl border border-[#F7F1E7]/10 bg-[#F7F1E7]/5 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#F7F1E7]/10">

              <div className="mb-5 text-2xl">
                🌿
              </div>

              <h3 className="font-serif text-2xl font-semibold text-[#F7F1E7]">
                Fresh Quality
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#F7F1E7]/55">
                Quality meat and farm produce selected with care.
              </p>

            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-[#F7F1E7]/10 bg-[#F7F1E7]/5 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#F7F1E7]/10">

              <div className="mb-5 text-2xl">
                🤝
              </div>

              <h3 className="font-serif text-2xl font-semibold text-[#F7F1E7]">
                Family Focused
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#F7F1E7]/55">
                A personal approach to every order and customer.
              </p>

            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-[#F7F1E7]/10 bg-[#F7F1E7]/5 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#F7F1E7]/10">

              <div className="mb-5 text-2xl">
                🥩
              </div>

              <h3 className="font-serif text-2xl font-semibold text-[#F7F1E7]">
                Carefully Sourced
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#F7F1E7]/55">
                Products chosen with quality and freshness in mind.
              </p>

            </div>

            {/* Card 4 */}
            <div className="rounded-2xl border border-[#F7F1E7]/10 bg-[#F7F1E7]/5 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#F7F1E7]/10">

              <div className="mb-5 text-2xl">
                ❤️
              </div>

              <h3 className="font-serif text-2xl font-semibold text-[#F7F1E7]">
                Made With Care
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#F7F1E7]/55">
                We care about what goes into every order we deliver.
              </p>

            </div>

          </div>

        </div>

        {/* Quote */}
        <div className="mt-20 border-t border-[#F7F1E7]/10 pt-12 text-center">

          <p className="mx-auto max-w-3xl font-serif text-3xl italic leading-tight text-[#F7F1E7] sm:text-4xl">
            "Good food brings people together."
          </p>

          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#F7F1E7]/40">
            Manjaly's Fresh Direct
          </p>

        </div>

      </div>
    </section>
  );
}