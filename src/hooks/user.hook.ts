import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "@/services/userService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
interface UpdateUserData {
  id: string;
  userData: FieldValues;
}
export const useGetUsers = () => {
  return useQuery({
    queryKey: ["GET_USERS"],
    queryFn: async () => await getAllUsers(),
  });
};

export const useUserUpdate = (refetch: () => void) => {
  return useMutation<any, Error, UpdateUserData>({
    mutationKey: ["USER_UPDATE"],
    mutationFn: async ({ id, userData }) => await updateUser(id, userData),
    onSuccess: () => {
      toast.success("User updated successfully.");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUserDelete = (refetch: () => void) => {
  return useMutation<any, Error, string>({
    mutationKey: ["USER_DELETE"],
    mutationFn: async (id) => await deleteUser(id),
    onSuccess: () => {
      toast.success("User deleted successfully.");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useSingleUser = (email: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_USER", email],
    queryFn: async () => await getSingleUser(email),
    enabled: !!email,
  });
};
