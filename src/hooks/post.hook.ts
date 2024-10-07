import { createPost } from "@/services/postServices";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const usePostCreation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["POST_CREATION"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post create successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
