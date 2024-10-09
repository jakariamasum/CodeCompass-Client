import {
  createComment,
  getAllComments,
  getSinglePostComments,
} from "@/services/commentService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useCommentCreation = (refetch: () => void) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["COMMENT_CREATION"],
    mutationFn: async (commentData) => await createComment(commentData),
    onSuccess: () => {
      toast.success("Comment created successfully.");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetComments = () => {
  return useQuery({
    queryKey: ["GET_COMMENTS"],
    queryFn: async () => await getAllComments(),
  });
};

export const useSinglePostComments = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_POST_COMMENTS", id],
    queryFn: async () => await getSinglePostComments(id),
    enabled: !!id,
  });
};
