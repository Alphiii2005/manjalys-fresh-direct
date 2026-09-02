import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import DeliveryBanner from "@/components/DeliveryBanner";
import Footer from "@/components/Footer";

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
      <Navbar />
      <Hero />
      <ProductSection products={products}/>
      <AboutSection />
      <Testimonials />
      <DeliveryBanner />
      <Footer />
    </main>
  );
}