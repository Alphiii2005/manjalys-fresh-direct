"use client";

import Link from "next/link";



import { useCart } from "@/context/CartContext";


export default function Navbar() {

  const { cart } = useCart();


  return (
    <nav className="flex justify-between items-center p-5 border-b">

      <h1 className="text-2xl font-bold">
        Manjaly's Fresh Direct
      </h1>


      <Link
        href="/cart"
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        🛒 Cart ({cart.length})
      </Link>
    </nav>
  );
}