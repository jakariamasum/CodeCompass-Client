"use client";

import { IComment, IUser } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useUser } from "@/context/user.provider";

type CommentSectionProps = {
  postId: string;
  comments: IComment[];
  currentUser: IUser;
  onAddComment: (commentData: { post: string; content: string }) => void;
};

const Avatar: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <Image
    src={src}
    alt={alt}
    className="w-10 h-10 rounded-full object-cover"
    width={10}
    height={10}
  />
);

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <button
    {...props}
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
  >
    {children}
  </button>
);

export default function CommentSection({
  postId,
  comments,
  currentUser,
  onAddComment,
}: CommentSectionProps) {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    try {
      console.log(data);
      data.user = currentUser?._id || "66f81ad621b5697c1f0313a4";
      data.post = postId;
      onAddComment(data);
      reset();
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Comments</h2>

      {comments?.length > 0 ? (
        <ul className="space-y-6">
          {comments?.map((comment) => (
            <li key={comment?._id} className="flex space-x-4">
              <Avatar
                src={comment?.user?.profilePic}
                alt={comment?.user?.fname}
              />
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <h3 className="font-semibold">{comment?.user?.fname}</h3>
                  <time
                    className="text-sm text-gray-500"
                    dateTime={comment.createdAt}
                  >
                    {moment(comment.createdAt).format("MMM Do, YYYY")}
                  </time>
                </div>
                <p className="mt-1 text-gray-700">{comment?.content}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">
          No comments yet. Be the first to comment!
        </p>
      )}

      {user ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Add a comment
            </label>
            <div className="mt-1 flex items-start space-x-4">
              <Avatar
                src={
                  currentUser?.profilePic ||
                  "https://i.ibb.co.com/bdfpZcG/blank-profile-picture-973460-960-720.png"
                }
                alt={currentUser?.fname}
              />
              <textarea
                id="comment"
                rows={3}
                className="shadow-md focus:ring-[#009CA6] focus:border-[#009CA6] block w-full sm:text-sm border border-gray-300 rounded-lg p-4 placeholder-gray-400 transition duration-150 ease-in-out hover:border-[#009CA6] focus:outline-none focus:ring-2 focus:ring-opacity-50"
                placeholder="Write your comment here..."
                {...register("content")}
              />
            </div>
          </div>
          <div className="flex justify-end ">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </form>
      ) : (
        <p className="text-[#009CA6] italic">Please login for comment</p>
      )}
    </div>
  );
}
