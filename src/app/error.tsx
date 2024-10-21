"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FiAlertTriangle, FiHome, FiRefreshCcw } from "react-icons/fi";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center">
          <FiAlertTriangle className="mx-auto h-16 w-16 text-yellow-400" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Oops! Something went wrong
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {error.message || "We're sorry, but an unexpected error occurred."}
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={() => reset()}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          >
            <FiRefreshCcw className="mr-2 h-4 w-4" />
            Try again
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          >
            <FiHome className="mr-2 h-4 w-4" />
            Go back home
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            If the problem persists, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
