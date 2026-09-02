"use client";

import { useState } from "react";

export default function ReviewForm() {
  const [rating, setRating] = useState(0);

  return (
    <div className="mx-auto mt-20 max-w-3xl rounded-3xl bg-[#3E3028] p-8 sm:p-10">

      <div className="mb-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#C8B99F]">
          We'd love to hear from you
        </p>

        <h3 className="font-serif text-4xl font-semibold text-[#F7F1E7]">
          Leave a Review
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#F7F1E7]/60">
          Tell us about your experience with Manjaly's Fresh Direct.
        </p>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <label className="mb-3 block text-sm font-medium text-[#F7F1E7]">
          Your rating
        </label>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl transition-transform duration-200 hover:scale-110 ${
                star <= rating
                  ? "text-[#C8B99F]"
                  : "text-[#F7F1E7]/20"
              }`}
              aria-label={`${star} star`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="mb-5">
        <label
          htmlFor="review-name"
          className="mb-2 block text-sm font-medium text-[#F7F1E7]"
        >
          Your name
        </label>

        <input
          id="review-name"
          type="text"
          placeholder="Enter your name"
          className="w-full rounded-xl border border-[#F7F1E7]/15 bg-[#F7F1E7]/5 px-4 py-3 text-sm text-[#F7F1E7] outline-none placeholder:text-[#F7F1E7]/30 focus:border-[#C8B99F]"
        />
      </div>

      {/* Review */}
      <div className="mb-6">
        <label
          htmlFor="review"
          className="mb-2 block text-sm font-medium text-[#F7F1E7]"
        >
          Your review
        </label>

        <textarea
          id="review"
          rows={5}
          placeholder="Tell us about your experience..."
          className="w-full resize-none rounded-xl border border-[#F7F1E7]/15 bg-[#F7F1E7]/5 px-4 py-3 text-sm text-[#F7F1E7] outline-none placeholder:text-[#F7F1E7]/30 focus:border-[#C8B99F]"
        />
      </div>

      {/* Submit */}
      <button
        type="button"
        className="rounded-full bg-[#F7F1E7] px-7 py-3.5 text-sm font-medium text-[#3E3028] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
      >
        Submit Review →
      </button>

    </div>
  );
}