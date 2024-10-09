"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import Image from "next/image";
import {
  useGetPosts,
  usePostDislike,
  usePostLike,
  useSinglePost,
} from "@/hooks/post.hook";
import CommentSection from "@/components/ui/Comment";
import { useUser } from "@/context/user.provider";
import { IUser } from "@/types";
import {
  useCommentCreation,
  useSinglePostComments,
} from "@/hooks/comment.hook";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default function PostDetails({ params }: { params: { id: string } }) {
  const { refetch: postRefetch } = useGetPosts();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [hasDisliked, setHasDisliked] = useState<boolean>(false);
  const { user } = useUser();

  const { data: post, refetch: singlePostRefetch } = useSinglePost(params?.id);
  const { mutate: handleLike } = usePostLike(postRefetch);
  const { mutate: handleDisLike } = usePostDislike(postRefetch);
  const { mutate: handleComment } = useCommentCreation(postRefetch);
  const { data: comments } = useSinglePostComments(params?.id);

  const handleLikeClick = () => {
    if (!hasLiked) {
      handleLike(post?._id);
      singlePostRefetch();
      setHasLiked(true);
    }
  };

  const handleDislikeClick = () => {
    if (!hasDisliked) {
      handleDisLike(post?._id);
      singlePostRefetch();
      setHasDisliked(true);
    }
  };

  const handleFollowClick = () => {
    singlePostRefetch();
    setIsFollowing(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-black bg-gray-100 min-h-screen">
      <article className="bg-white shadow-lg p-6 mb-6">
        <header className="mb-4">
          <h1 className="text-3xl font-bold mb-2">{post?.title}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src={post?.user?.profilePic}
                alt={post?.user?.fname}
                className="w-12 h-12 rounded-full"
                width={12}
                height={12}
              />
              <div>
                <p className="font-semibold">{post?.user?.fname}</p>
                <p className="text-sm text-gray-500">
                  {new Date(post?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={handleFollowClick}
              disabled={isFollowing}
              className={`px-4 py-2 rounded-full ${
                isFollowing
                  ? "bg-gray-200 text-gray-800 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        </header>

        <div className="mb-6">
          <SunEditor
            setContents={post?.content}
            disable={true}
            hideToolbar={true}
            setOptions={{
              height: "auto",
              buttonList: [],
            }}
          />
        </div>

        <footer className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Category: {post?.category}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleLikeClick}
                  disabled={hasLiked}
                  className={`text-blue-500 hover:text-blue-600 ${
                    hasLiked ? "cursor-not-allowed text-gray-400" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                </button>
                <span>{post?.likes}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDislikeClick}
                  disabled={hasDisliked}
                  className={`text-red-500 hover:text-red-600 ${
                    hasDisliked ? "cursor-not-allowed text-gray-400" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                    />
                  </svg>
                </button>
                <span>{post?.dislikes}</span>
              </div>
            </div>
            {post?.isPremium && (
              <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-sm font-semibold">
                Premium
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {post?.tags?.map((tag: any) => (
              <span
                key={tag}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </footer>
      </article>
      <CommentSection
        postId={params?.id}
        comments={comments}
        currentUser={user as IUser}
        onAddComment={handleComment}
      />
    </div>
  );
}
