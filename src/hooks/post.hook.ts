import { createPost, getAllPost } from "@/services/postServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

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
export const useGetPosts = () => {
  return useQuery({
    queryKey: ["GET_POSTS"],
    queryFn: async () => await getAllPost(),
  });
};
