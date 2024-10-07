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
