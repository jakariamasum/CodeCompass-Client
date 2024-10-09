import axiosInstance from "@/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const createComment = async (commentData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(`/comments`, commentData);
    return data;
  } catch (error: any) {
    console.error("Error comment on post:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while comment on the post"
    );
  }
};

export const getAllComments = async () => {
  try {
    const { data } = await axiosInstance.get("/comments");
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getSinglePostComments = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/comments/${id}`);
    return data.data;
  } catch (error: any) {
    console.error("Error getting comment:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while getting the comment"
    );
  }
};
