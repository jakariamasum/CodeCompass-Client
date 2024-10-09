import { createPayment } from "@/services/paymentService";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const usePaymentCreation = (refetch: () => void) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["PAYMENT_CREATION"],
    mutationFn: async (paymentData) => await createPayment(paymentData),
    onSuccess: () => {
      toast.success("Post created successfully.");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
