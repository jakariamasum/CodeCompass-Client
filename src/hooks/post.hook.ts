import { createPost, getAllPost, updatePost } from "@/services/postServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
interface UpdatePostData {
  id: string;
  postData: FieldValues;
}
export const usePostCreation = (refetch: () => void) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["POST_CREATION"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully.");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const usePostUpdate = (refetch: () => void) => {
  return useMutation<any, Error, UpdatePostData>({
    mutationKey: ["POST_UPDATE"],
    mutationFn: async ({ id, postData }) => await updatePost(id, postData),
    onSuccess: () => {
      toast.success("Post updated successfully.");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useGetPosts = () => {
  return useQuery({
    queryKey: ["GET_POSTS"],
    queryFn: async () => await getAllPost(),
  });
};
