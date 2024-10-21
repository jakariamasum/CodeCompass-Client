import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex text-black items-center justify-center p-4">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md text-center">
        <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-lg mb-6 text-gray-700">Please try again!</p>
        <Link href="/" className="text-blue-500 underline">
          Go to Home
        </Link>
      </div>
    </div>
  );
}
