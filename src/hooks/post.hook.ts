import {
  createPost,
  deletePost,
  followPost,
  getAllPost,
  getSinglePost,
  getUserPost,
  increaseDisLike,
  increaseLike,
  updatePost,
} from "@/services/postServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
interface UpdatePostData {
  id: string;
  postData: FieldValues;
}
interface FollowUser {
  id: string;
  user: string;
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

export const usePostDelete = (refetch: () => void) => {
  return useMutation<any, Error, string>({
    mutationKey: ["POST_DELETED"],
    mutationFn: async (id) => await deletePost(id),
    onSuccess: () => {
      toast.success("Post deleted successfully.");
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
export const useUserPosts = (id: string) => {
  return useQuery({
    queryKey: ["GET_USER_POSTS", id],
    queryFn: async () => await getUserPost(id),
    enabled: !!id,
  });
};
export const useSinglePost = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_POSTS", id],
    queryFn: async () => await getSinglePost(id),
    enabled: !!id,
  });
};

export const usePostLike = (refetch: () => void) => {
  return useMutation<any, Error, string>({
    mutationKey: ["POST_LIKE"],
    mutationFn: async (id) => await increaseLike(id),
    onSuccess: () => {
      toast.success("Post likes successfully.");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const usePostDislike = (refetch: () => void) => {
  return useMutation<any, Error, string>({
    mutationKey: ["POST_DISLIKE"],
    mutationFn: async (id) => await increaseDisLike(id),
    onSuccess: () => {
      toast.success("Post dislikes successfully.");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const usePostFollow = (refetch: () => void) => {
  return useMutation<any, Error, FollowUser>({
    mutationKey: ["POST_FOLLOW"],
    mutationFn: async ({ id, user }) => await followPost(id, user),
    onSuccess: () => {
      toast.success("Post follows successfully.");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
