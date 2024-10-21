"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useGetPosts } from "@/hooks/post.hook";
import Image from "next/image";
import Link from "next/link";

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

export default function TechTipsFeed() {
  const { data: allPosts, isLoading } = useGetPosts();
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [sort, setSort] = useState<"latest" | "popular" | "controversial">(
    "latest"
  );
  const [search, setSearch] = useState("");
  const postsPerPage = 10;
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    if (allPosts) {
      const filteredAndSortedPosts = getFilteredAndSortedPosts(allPosts);
      setDisplayedPosts(filteredAndSortedPosts.slice(0, postsPerPage));
      setHasMore(filteredAndSortedPosts.length > postsPerPage);
    }
  }, [allPosts, search, sort]);

  const getFilteredAndSortedPosts = (posts: Post[]) => {
    const filteredPosts = posts.filter(
      (post: Post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        )
    );

    const sortedPosts = [...filteredPosts];
    switch (sort) {
      case "latest":
        sortedPosts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "popular":
        sortedPosts.sort((a, b) => b.likes - a.likes);
        break;
      case "controversial":
        sortedPosts.sort(
          (a, b) => b.likes + b.dislikes - (a.likes + a.dislikes)
        );
        break;
    }

    return sortedPosts;
  };

  const loadMorePosts = () => {
    if (allPosts) {
      const filteredAndSortedPosts = getFilteredAndSortedPosts(allPosts);
      const nextPosts = filteredAndSortedPosts.slice(
        displayedPosts.length,
        displayedPosts.length + postsPerPage
      );
      setDisplayedPosts((prevPosts) => [...prevPosts, ...nextPosts]);
      setHasMore(
        displayedPosts.length + nextPosts.length < filteredAndSortedPosts.length
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-black">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="sticky top-4 z-10 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Tech Tips News Feed
            </h1>
            <Link href={"/user/post"}>
              <button className="bg-[#009CA6]  text-white -foreground px-6 py-2 rounded-full hover:bg-[#009CA6] /90 transition-colors duration-300">
                Create Post
              </button>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="search"
                placeholder="Search tips..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009CA6] "
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
            <div className="relative">
              <select
                value={sort}
                onChange={(e) =>
                  setSort(
                    e.target.value as "latest" | "popular" | "controversial"
                  )
                }
                className="appearance-none w-full sm:w-auto p-3 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009CA6]  bg-white"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="controversial">Controversial</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </header>

        <main className="space-y-6">
          {displayedPosts.map((post, index) => (
            <article
              key={post._id}
              ref={
                index === displayedPosts.length - 1 ? lastPostElementRef : null
              }
              className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Image
                    src={post.user.profilePic}
                    alt={post.user.fname}
                    className="w-10 h-10 rounded-full"
                    width={10}
                    height={10}
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
                    className="h-6 w-6 text-[#009CA6] "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                )}
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-[#009CA6]  transition-colors duration-300">
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
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors duration-300">
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
                {post.isPremium ? (
                  <Link href={`/payment`}>
                    <button className=" text-[#009CA6] hover:text-white px-4 py-2 rounded-full hover:bg-[#009CA6]  transition-colors duration-300">
                      Subscribe
                    </button>
                  </Link>
                ) : (
                  <Link href={`/posts/${post._id}`}>
                    <button className="hover:text-white  text-[#009CA6] -foreground px-4 py-2 rounded-full hover:bg-[#009CA6] /90 transition-colors duration-300">
                      Read More
                    </button>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </main>

        {isLoading && displayedPosts.length === 0 && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#009CA6] "></div>
          </div>
        )}

        {!hasMore && (
          <p className="text-center text-gray-500 py-8">
            No more posts to load.
          </p>
        )}
      </div>
    </div>
  );
}
