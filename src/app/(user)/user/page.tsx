"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiEdit, FiThumbsUp, FiMessageSquare, FiStar } from "react-icons/fi";
import { useUser } from "@/context/user.provider";
import { useUserPosts } from "@/hooks/post.hook";
import { useSingleUser } from "@/hooks/user.hook";
import { IPost } from "@/types";

export default function UserDashboard() {
  const { user } = useUser();
  const { data: posts } = useUserPosts(user?._id as string);
  const { data: userData } = useSingleUser(user?.email as string);
  const [activeTab, setActiveTab] = useState<"overview" | "posts">("overview");
  const totalLikes = posts?.reduce(
    (sum: number, post: IPost) => sum + post.likes,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center">
              <Image
                src={userData?.profilePic || ""}
                alt={`${userData?.fname} ${userData?.lname}`}
                width={200}
                height={200}
                className="rounded-full mb-4"
              />
              <h2 className="text-2xl font-semibold">{`${userData?.fname} ${userData?.lname}`}</h2>
              <p className="text-gray-600">{userData?.email}</p>
              <div className="mt-4 flex items-center">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    userData?.verified === "yes"
                      ? "bg-green-100 text-green-800"
                      : userData?.verified === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {userData?.verified === "yes"
                    ? "Verified"
                    : userData?.verified === "pending"
                    ? "Pending"
                    : "Not Verified"}
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-around">
              <div className="text-center">
                <p className="text-2xl font-semibold">
                  {userData?.following?.length}
                </p>
                <p className="text-gray-600">Following</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold">
                  {userData?.followers?.length}
                </p>
                <p className="text-gray-600">Followers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex mb-6">
              <button
                className={`mr-4 pb-2 ${
                  activeTab === "overview" ? "border-b-2 border-blue-500" : ""
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`pb-2 ${
                  activeTab === "posts" ? "border-b-2 border-blue-500" : ""
                }`}
                onClick={() => setActiveTab("posts")}
              >
                Posts
              </button>
            </div>

            {activeTab === "overview" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Statistics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <StatCard
                    icon={<FiEdit />}
                    title="Total Posts"
                    value={posts?.length}
                  />
                  <StatCard
                    icon={<FiThumbsUp />}
                    title="Total Likes"
                    value={totalLikes}
                  />
                  <StatCard
                    icon={<FiMessageSquare />}
                    title="Total Comments"
                    value={20}
                  />
                </div>
              </div>
            )}

            {activeTab === "posts" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Your Posts</h3>
                <div className="space-y-4">
                  {posts.map((post: IPost) => (
                    <PostCard key={post?._id} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => (
  <div className="bg-gray-50 rounded-lg p-4 flex items-center">
    <div className="text-blue-500 text-2xl mr-4">{icon}</div>
    <div>
      <p className="text-gray-600">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  </div>
);

interface PostCardProps {
  post: IPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex justify-between items-start">
      <h4 className="text-lg font-semibold">{post.title}</h4>
      {post.isPremium && (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center">
          <FiStar className="mr-1" /> Premium
        </span>
      )}
    </div>
    <div className="mt-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <span className="flex items-center text-gray-600">
          <FiThumbsUp className="mr-1" /> {post.likes}
        </span>
        <span className="flex items-center text-gray-600">
          <FiMessageSquare className="mr-1" /> {20}
        </span>
      </div>
      <span className="text-sm text-gray-500">
        {new Date(post.createdAt as string).toLocaleDateString()}
      </span>
    </div>
  </div>
);
