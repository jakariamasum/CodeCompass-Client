"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import Image from "next/image";
import {
  useGetPosts,
  usePostDislike,
  usePostLike,
  useSinglePost,
  useUserFollow,
} from "@/hooks/post.hook";
import CommentSection from "@/components/ui/Comment";
import { useUser } from "@/context/user.provider";
import { IUser, IComment } from "@/types";
import {
  useCommentCreation,
  useSinglePostComments,
} from "@/hooks/comment.hook";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { BiPrinter, BiShareAlt } from "react-icons/bi";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useSingleUser } from "@/hooks/user.hook";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default function PostDetails({ params }: { params: { id: string } }) {
  const { refetch: postRefetch } = useGetPosts();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [localLikes, setLocalLikes] = useState<number>(0);
  const [localDislikes, setLocalDislikes] = useState<number>(0);
  const [localComments, setLocalComments] = useState<IComment[]>([]);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState<boolean>(false);

  const { user } = useUser();
  const { data: visitor } = useSingleUser(user?.email as string);

  const { data: post, refetch: singlePostRefetch } = useSinglePost(params?.id);
  const { mutate: handleLike } = usePostLike(postRefetch);
  const { mutate: handleDisLike } = usePostDislike(postRefetch);
  const { data: comments, refetch: refetchComments } = useSinglePostComments(
    params?.id
  );
  const { mutate: handleComment } = useCommentCreation(refetchComments);
  const { mutate: handleFollow } = useUserFollow(singlePostRefetch);

  useEffect(() => {
    if (post && visitor) {
      setLocalLikes(post.likes);
      setLocalDislikes(post.dislikes);
      setIsFollowing(visitor.following.includes(post.user._id));
    }
    if (post) {
      setLocalLikes(post.likes);
      setLocalDislikes(post.dislikes);
      setIsFollowing(post.user.followers.includes(user?._id));
    }
    if (comments) {
      setLocalComments(comments);
    }
  }, [post, user, comments]);

  const handleLikeClick = () => {
    handleLike(post?._id);
    setLocalLikes((prev) => prev + 1);
    singlePostRefetch();
  };

  const handleDislikeClick = () => {
    handleDisLike(post?._id);
    setLocalDislikes((prev) => prev + 1);
    singlePostRefetch();
  };

  const handleFollowClick = () => {
    handleFollow({
      userId: visitor?._id as string,
      followerId: post?.user?._id,
    });
    setIsFollowing((prev) => !prev);
    singlePostRefetch();
  };

  const handlePrintClick = async () => {
    if (post) {
      const content = document.getElementById("post-content");
      if (content) {
        const canvas = await html2canvas(content);
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
        });

        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save(`${post.title}.pdf`);
      }
    }
  };
  const handleShare = (platform: string) => {
    const url = window.location.href;
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(post?.title || "")}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          url
        )}&title=${encodeURIComponent(post?.title || "")}`;
        break;
    }

    window.open(shareUrl, "_blank");
    setIsShareMenuOpen(false);
  };

  if (!post)
    return (
      <div className="flex justify-center items-center py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-black">
      <div className="max-w-4xl mx-auto p-6  bg-gray-100 min-h-screen">
        <article id="post-content" className="bg-white shadow-lg p-6 mb-6">
          <header className="mb-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
              <div className="flex gap-2 items-center">
                <button
                  onClick={handlePrintClick}
                  className="text-gray-600 hover:text-gray-800"
                  aria-label="Save as PDF"
                >
                  <BiPrinter className="h-6 w-6" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
                    className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    aria-label="Share post"
                  >
                    <BiShareAlt className="h-6 w-6" />
                  </button>
                  {isShareMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <button
                          onClick={() => handleShare("facebook")}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                        >
                          <FaFacebookF className="mr-2" /> Share on Facebook
                        </button>
                        <button
                          onClick={() => handleShare("twitter")}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                        >
                          <FaTwitter className="mr-2" /> Share on Twitter
                        </button>
                        <button
                          onClick={() => handleShare("linkedin")}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                        >
                          <FaLinkedinIn className="mr-2" /> Share on LinkedIn
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src={post.user.profilePic}
                  alt={post.user.fname}
                  className="w-12 h-12 rounded-full"
                  width={48}
                  height={48}
                />
                <div>
                  <p className="font-semibold">{post.user.fname}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {user && (
                <button
                  onClick={handleFollowClick}
                  className={`px-4 py-2 rounded-full ${
                    isFollowing
                      ? "bg-gray-200 text-gray-800"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  } transition-colors duration-200`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              )}
            </div>
          </header>

          <div className="mb-6">
            <SunEditor
              setContents={post.content}
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
                  Category: {post.category}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleLikeClick}
                    className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                    aria-label="Like post"
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
                  <span>{localLikes}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleDislikeClick}
                    className="text-red-500 hover:text-red-600 transition-colors duration-200"
                    aria-label="Dislike post"
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
                  <span>{localDislikes}</span>
                </div>
              </div>
              {post.isPremium && (
                <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-sm font-semibold">
                  Premium
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags?.map((tag: string) => (
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
          postId={params.id}
          comments={localComments}
          currentUser={user as IUser}
          onAddComment={handleComment}
        />
      </div>
    </div>
  );
}
