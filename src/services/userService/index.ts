import axiosInstance from "@/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const getAllUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/users");
    console.log(data);
    return data.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const updateUser = async (id: string, userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.put(`/users/profile/${id}`, userData);
    return data;
  } catch (error: any) {
    console.error("Error updating user:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while updating the user"
    );
  }
};
export const deleteUser = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/users/${id}`);
    return data;
  } catch (error: any) {
    console.error("Error deleting user:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while deleting the user"
    );
  }
};

export const getSingleUser = async (email: string) => {
  try {
    const { data } = await axiosInstance.get(`/users/${email}`);
    return data.data;
  } catch (error: any) {
    console.error("Error getting user:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while getting the user"
    );
  }
};
