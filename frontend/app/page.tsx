import ProductCard from "@/components/ProductCard";

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
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}

    </main>
  );
}