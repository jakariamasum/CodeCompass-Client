/* eslint-disable react/no-unescaped-entities */
"use client";
import { loadStripe } from "@stripe/stripe-js";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/components";
import {
  FaCheckCircle,
  FaLaptopCode,
  FaRocket,
  FaUnlockAlt,
} from "react-icons/fa";
import { useUser } from "@/context/user.provider";
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PremiumSubscription() {
  const { user } = useUser();
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch(
      "https://code-compass-server.vercel.app/api/v1/payment/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerEmail: user?.email }),
      }
    );

    const { sessionId } = await response.json();

    if (stripe) {
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error("Stripe checkout error:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl shadow-2xl rounded-lg bg-white text-gray-800">
        <CardHeader className="text-center p-6 border-b bg-gradient-to-r from-purple-600 to-[#009CA6] text-white">
          <CardTitle className="text-4xl font-extrabold">
            Tech & Tips Premium
          </CardTitle>
          <p className="text-gray-200 mt-2">
            Get exclusive access to in-depth tech guides and tips for just{" "}
            <span className="font-semibold">$20/month</span>.
          </p>
        </CardHeader>

        <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#009CA6]">
              Why Go Premium?
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-700">
                <FaLaptopCode className="text-[#009CA6] mr-3" />
                Exclusive guides on the latest tech trends
              </li>
              <li className="flex items-center text-gray-700">
                <FaUnlockAlt className="text-[#009CA6] mr-3" />
                Access to members-only tips and tricks
              </li>
              <li className="flex items-center text-gray-700">
                <FaRocket className="text-[#009CA6] mr-3" />
                Early access to new features and tutorials
              </li>
              <li className="flex items-center text-gray-700">
                <FaCheckCircle className="text-[#009CA6] mr-3" />
                Ad-free browsing experience
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-2xl font-bold text-[#009CA6] mb-4">
              What's Included
            </h3>
            <p className="text-gray-700 mb-4">
              Our premium plan offers you the best tech tips, tutorials, and
              guides designed to help you stay ahead of the curve in the tech
              world. Here's what you can expect:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li className="text-gray-700">
                Deep dives into programming and development trends
              </li>
              <li className="text-gray-700">
                Advanced troubleshooting and tech support tips
              </li>
              <li className="text-gray-700">
                In-depth reviews and comparisons of the latest gadgets
              </li>
              <li className="text-gray-700">
                Exclusive video tutorials and webinars
              </li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="p-6 border-t text-center bg-gradient-to-r from-purple-600 to-[#009CA6]">
          {user ? (
            <Button
              onClick={handleCheckout}
              className="w-full py-4 text-lg  hover:text-black hover:bg-gray-100 font-semibold rounded-md shadow-md transition duration-300 ease-in-out"
            >
              Subscribe Now
            </Button>
          ) : (
            <Link href={"/login"}>
              <Button className="w-full py-4 text-lg  hover:text-black hover:bg-gray-100 font-semibold rounded-md shadow-md transition duration-300 ease-in-out">
                Login before pay
              </Button>
            </Link>
          )}
          <p className="text-sm text-gray-300 mt-2">
            Cancel anytime, no hidden fees.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
