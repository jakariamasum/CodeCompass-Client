import axiosInstance from "@/lib/AxiosInstance";
import { loadStripe } from "@stripe/stripe-js";
import envConfig from "@/config/envConfig";
const stripePromise = loadStripe(envConfig.stripe_key!);
console.log(stripePromise);

export const getAllPayments = async () => {
  try {
    const { data } = await axiosInstance.get("/payment");
    console.log(data);
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const getUserPayment = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/payment/${id}`);
    console.log(data.data);
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
