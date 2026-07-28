"use client";

import Link from "next/link";

import { useCart } from "@/context/CartContext";


export default function CartPage() {

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCart();

  const total = cart.reduce(
  (sum: number, product: any) =>
    sum + Number(product.price_per_kg) * product.quantity,
  0
);


  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Your Cart
      </h1>


      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (

        cart.map((product: any) => (

          <div
            key={product.id}
            className="border rounded-xl p-5 mb-4 flex gap-5 items-center"
          >

            {product.image && (
              <img
                src={`http://127.0.0.1:8000${product.image}`}
                alt={product.name}
                className="w-28 h-28 object-cover rounded"
              />
            )}


            <div>

              <h2 className="text-xl font-bold">
                {product.name}
              </h2>


              <p className="font-semibold mt-2">
                Subtotal: £
                {(Number(product.price_per_kg) * product.quantity).toFixed(2)}
              </p>


              <div className="flex items-center gap-3 mt-3">

                <button
                    onClick={() => decreaseQuantity(product.id)}
                    className="bg-gray-200 text-black px-3 py-1 rounded hover:bg-gray-300"
                >
                    -
                </button>


                <span>
                  {product.quantity} kg
                </span>


                <button
                 onClick={() => increaseQuantity(product.id)}
                 className="bg-gray-200 text-black px-3 py-1 rounded hover:bg-gray-300"
                >
                 +
                </button>

              </div>


              <button
                onClick={() => removeFromCart(product.id)}
                className="text-red-600 mt-3"
              >
                Remove
              </button>


            </div>

          </div>

        ))

      )}

      {cart.length > 0 && (
    <div className="mt-8 border-t pt-5">

        <h2 className="text-2xl font-bold">
        Total: £{total.toFixed(2)}
        </h2>

        <Link
            href="/checkout"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg mt-4 hover:bg-green-700"
            >
            Proceed to Checkout
        </Link>

    </div>
    )}

    </main>
  );
}