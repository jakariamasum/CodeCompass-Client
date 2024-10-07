import { deleteUser, getAllUsers, updateUser } from "@/services/userService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["GET_USERS"],
    queryFn: async () => await getAllUsers(),
  });
};

export const useUserUpdate = (refetch: () => void) => {
  return useMutation<any, Error, string>({
    mutationKey: ["USER_UPDATE"],
    mutationFn: async (id) => await updateUser(id),
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
