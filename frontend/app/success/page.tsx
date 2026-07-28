export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">

      <div className="text-center">

        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Payment Successful ✅
        </h1>

        <p className="text-lg">
          Thank you for your order!
        </p>

        <p className="mt-2">
          Your payment has been received.
        </p>

        <a
          href="/"
          className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </a>

      </div>

    </main>
  );
}