import axiosInstance from "@/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const createPost = async (postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/posts", postData);
    return data;
  } catch (error: any) {
    console.error("Error creating post:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while creating the post"
    );
  }
};

export const getAllPost = async () => {
  try {
    const { data } = await axiosInstance.get("/posts");
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const getUserPost = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/posts?user=${id}`);
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updatePost = async (id: string, postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.put(`/posts/${id}`, postData);
    return data;
  } catch (error: any) {
    console.error("Error updating post:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while updating the post"
    );
  }
};
export const deletePost = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/posts/${id}`);
    return data;
  } catch (error: any) {
    console.error("Error deleting post:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while deleting the post"
    );
  }
};
