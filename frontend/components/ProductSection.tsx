import ProductCard from "@/components/ProductCard";

type Product = {
  id: number;
  name: string;
  description: string;
  price_per_kg: string;
  stock_kg: string;
  image: string;
};

export default function ProductSection({
  products,
}: {
  products: Product[];
}) {
  return (
    <section
      id="products"
      className="bg-[#F7F1E7] px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mb-14">

          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#68735B]">
              From our selection
            </p>

            <h2 className="font-serif text-5xl font-semibold tracking-tight text-[#3E3028] sm:text-6xl">
              Our Products
            </h2>
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#3E3028]/60 sm:text-base">
            Carefully selected meat and farm produce, prepared with
            quality and freshness in mind.
          </p>

        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
}