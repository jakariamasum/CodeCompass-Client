"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useGetPosts } from "@/hooks/post.hook";
import InfiniteScroll from "react-infinite-scroll-component";
import { IPost } from "@/types";
import "suneditor/dist/css/suneditor.min.css";
import dynamic from "next/dynamic";
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

type Post = {
  _id: string;
  user: {
    _id: string;
    fname: string;
    profilePic: string;
  };
  title: string;
  content: string;
  category: string;
  isPremium: boolean;
  tags: string[];
  likes: number;
  dislikes: number;
  createdAt: string;
};

export default function NewsFeed() {
  const { data: allPosts, isLoading } = useGetPosts();
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [sort, setSort] = useState<"latest" | "popular" | "controversial">(
    "latest"
  );
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 1;

  useEffect(() => {
    if (allPosts) {
      const filteredPosts = allPosts.filter(
        (post: IPost) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.content.toLowerCase().includes(search.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          )
      );

      switch (sort) {
        case "latest":
          filteredPosts.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "popular":
          filteredPosts.sort((a: any, b: any) => b.likes - a.likes);
          break;
        case "controversial":
          filteredPosts.sort(
            (a: any, b: any) => b.likes + b.dislikes - (a.likes + a.dislikes)
          );
          break;
      }

      setDisplayedPosts(filteredPosts);
    }
  }, [allPosts, search, sort]);
  const loadMorePosts = () => {
    if (allPosts) {
      const nextPage = page + 1;
      const startIndex = (nextPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newPosts = allPosts.slice(startIndex, endIndex);

      setDisplayedPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage(nextPage);
      setHasMore(endIndex < allPosts.length);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4 z-10">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Tech Tips News Feed
            </h1>
            <Link
              href={"/user/create-post"}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Create Post
            </Link>
          </div>

          <div className="flex gap-4">
            <div className="relative flex-grow">
              <input
                type="search"
                placeholder="Search tips..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <select
              value={sort}
              onChange={(e) =>
                setSort(
                  e.target.value as "latest" | "popular" | "controversial"
                )
              }
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="latest">Latest</option>
              <option value="popular">Most Popular</option>
              <option value="controversial">Controversial</option>
            </select>
          </div>
        </div>

        <InfiniteScroll
          dataLength={displayedPosts.length}
          next={loadMorePosts}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }
          endMessage={
            <p className="text-center text-gray-500 py-8">
              No more posts to load.
            </p>
          }
        >
          <div className="space-y-6">
            <AnimatePresence>
              {displayedPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white rounded-lg shadow-lg p-6 ${
                    index % 2 === 0 ? "transform translate-x-4" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={post.user.profilePic}
                        alt={post.user.fname}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {post.user.fname}
                        </h3>
                        <p className="text-sm text-gray-500">{post.category}</p>
                      </div>
                    </div>
                    {post.isPremium && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    )}
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-gray-800">
                    {post.title}
                  </h2>
                  <div>
                    <SunEditor
                      setContents={post?.content}
                      height="150px"
                      disable={true}
                      hideToolbar={true}
                      setOptions={{
                        height: "auto",
                        buttonList: [],
                      }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-red-600 transition-colors duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                        </svg>
                        <span>{post.dislikes}</span>
                      </button>
                    </div>
                    <button className="text-blue-600 hover:underline transition-colors duration-300">
                      Follow
                    </button>
                  </div>
                  <div className="mt-4">
                    {post.isPremium ? (
                      <button className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-300 cursor-pointer">
                        Subscribe to Premium ($20/month)
                      </button>
                    ) : (
                      <Link href={`/posts/${post._id}`} passHref>
                        <span className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 cursor-pointer">
                          See Full Post
                        </span>
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </InfiniteScroll>

        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}
