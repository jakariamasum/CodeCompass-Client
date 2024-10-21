import { getAllPayments, getUserPayment } from "@/services/paymentService";
import { useQuery } from "@tanstack/react-query";

export const useGetPayments = () => {
  return useQuery({
    queryKey: ["GET_PAYMENTS"],
    queryFn: async () => await getAllPayments(),
  });
};
export const useUserPayments = (id: string) => {
  return useQuery({
    queryKey: ["GET_USER_PAYMENTS", id],
    queryFn: async () => await getUserPayment(id),
    enabled: !!id,
  });
};
