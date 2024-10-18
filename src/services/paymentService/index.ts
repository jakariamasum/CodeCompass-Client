import axiosInstance from "@/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import envConfig from "@/config/envConfig";
const stripePromise = loadStripe(envConfig.stripe_key!);
console.log(stripePromise);

export const createPayment = async (paymentData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/payments'", paymentData);
    return data;
  } catch (error: any) {
    console.error("Error creating payment:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while creating the payment"
    );
  }
};

export const handlePurchasePremium = async () => {
  const stripe = await stripePromise;

  const response = await fetch(
    "https://code-compass-server.vercel.app/api/v1/payments",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceId: "bd" }),
    }
  );

  const session = await response.json();

  if (stripe && session.id) {
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  } else {
    console.error("Failed to create a checkout session.");
  }
};
