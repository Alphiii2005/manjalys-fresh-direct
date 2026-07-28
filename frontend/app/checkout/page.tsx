"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {

  const { cart } = useCart();

  const total = cart.reduce(
    (sum: number, product: any) =>
      sum + Number(product.price_per_kg) * product.quantity,
    0
  );


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    notes: "",
  });


  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  }


  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();


    try {

      // Create order in Django
      const orderResponse = await fetch(
        "http://127.0.0.1:8000/api/orders/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer: formData,
            cart: cart,
          }),
        }
      );


      const orderData = await orderResponse.json();

      console.log("Order created:", orderData);



      // Create Stripe checkout session
      const stripeResponse = await fetch(
        "http://127.0.0.1:8000/api/orders/checkout/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_id: orderData.order_id,
          }),
        }
      );


      const stripeData = await stripeResponse.json();

      console.log("Stripe response:", stripeData);



      if (stripeData.checkout_url) {

        window.location.href = stripeData.checkout_url;

      } else {

        alert("Stripe checkout failed");

      }


    } catch (error) {

      console.error("Checkout error:", error);

      alert("Something went wrong during checkout");

    }

  }


  return (
    <main className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">


        {/* Customer Information */}

        <div>

          <h2 className="text-2xl font-semibold mb-4">
            Customer Information
          </h2>


          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >


            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />


            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />


            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />


            <input
              type="text"
              name="address"
              placeholder="Delivery Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />


            <input
              type="text"
              name="city"
              placeholder="Town / City"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />


            <input
              type="text"
              name="postcode"
              placeholder="Postcode"
              value={formData.postcode}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />


            <textarea
              name="notes"
              placeholder="Delivery Notes (Optional)"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              rows={4}
            />


            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Pay Securely
            </button>


          </form>

        </div>



        {/* Order Summary */}

        <div>

          <h2 className="text-2xl font-semibold mb-4">
            Order Summary
          </h2>


          {cart.length === 0 ? (

            <p>Your cart is empty.</p>

          ) : (

            <>

              {cart.map((product: any) => (

                <div
                  key={product.id}
                  className="flex justify-between mb-3"
                >

                  <div>

                    <p className="font-semibold">
                      {product.name}
                    </p>

                    <p>
                      {product.quantity} kg
                    </p>

                  </div>


                  <p>
                    £
                    {(
                      Number(product.price_per_kg) *
                      product.quantity
                    ).toFixed(2)}
                  </p>


                </div>

              ))}


              <hr className="my-4" />


              <h3 className="text-xl font-bold">
                Total: £{total.toFixed(2)}
              </h3>

            </>

          )}


        </div>


      </div>


    </main>
  );
}