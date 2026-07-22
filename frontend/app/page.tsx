async function getProducts() {
  const response = await fetch(
    "http://127.0.0.1:8000/api/products/"
  );

  return response.json();
}


export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <h1>Manjaly's Fresh Direct</h1>

      {products.map((product: any) => (
        <div key={product.id}>
          <h2>{product.name}</h2>

          <p>
            £{product.price_per_kg} / kg
          </p>

          <p>
            Stock: {product.stock_kg} kg
          </p>

          {product.image && (
            <img
              src={`http://127.0.0.1:8000${product.image}`}
              alt={product.name}
              width="300"
            />
          )}
        </div>
      ))}
    </main>
  );
}