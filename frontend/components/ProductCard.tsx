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
  return (
    <div className="border rounded-xl p-5 shadow-lg w-80 hover:shadow-xl hover:-translate-y-2 transition duration-300">
      {product.image && (
        <img
            src={`http://127.0.0.1:8000${product.image}`}
            alt={product.name}
            className="w-full h-60 object-cover rounded"
        />
      )}

      <h2 className="text-xl font-bold mt-3">
        {product.name}
      </h2>

      <p>{product.description}</p>

      <p>
        £{product.price_per_kg} / kg
      </p>

      <p>
        Available: {product.stock_kg} kg
      </p>

      <button className="bg-green-600 text-white font-semibold px-5 py-2 rounded-lg mt-4 hover:bg-green-700 transition">
        Add to Cart
      </button>
    </div>
  );
}