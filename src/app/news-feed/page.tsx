"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetPosts } from "@/hooks/post.hook";
import { IPost } from "@/types";

const NewsFeed: React.FC = () => {
  const { data: posts = [], isPending } = useGetPosts();
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<IPost[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { register, handleSubmit } = useForm<{ search: string }>();

  useEffect(() => {
    setFilteredPosts(posts);
    setDisplayedPosts(posts.slice(0, 9));
  }, [posts]);

  const handleSearch = ({ search }: { search: string }) => {
    if (!search) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post: IPost) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
    setDisplayedPosts(filteredPosts.slice(0, 9));
    setHasMore(true);
  };

  const fetchMoreData = () => {
    const currentLength = displayedPosts.length;
    const moreItems = filteredPosts.slice(currentLength, currentLength + 9);
    if (moreItems.length === 0) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setDisplayedPosts([...displayedPosts, ...moreItems]);
    }, 500);
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#009CA6]"></div>
      </div>
    );
  }

  const getRowLayout = (posts: IPost[], rowIndex: number) => {
    const layouts = [
      <div key={3} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                {post.title}
              </h2>
              <p className="text-[#009CA6] mb-2">{post.category}</p>
              <Link
                href={`/posts/${post._id}`}
                className="text-[#009CA6] hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>,
      <div key={4} className="space-y-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="flex items-center bg-white rounded-lg shadow-lg overflow-hidden p-4"
          >
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={100}
              height={100}
              className="w-24 h-24 object-cover rounded-lg mr-6"
            />
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {post.title}
              </h2>
              <p className="text-[#009CA6] mb-2">{post.category}</p>
              <Link
                href={`/posts/${post._id}`}
                className="text-[#009CA6] hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>,
      <div key={5} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="relative bg-gradient-to-r from-[#009CA6] to-[#007A82] text-white rounded-lg shadow-lg overflow-hidden"
          >
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover opacity-50"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="mb-4">{post.category}</p>
              <Link
                href={`/posts/${post._id}`}
                className="inline-block bg-white text-[#009CA6] px-4 py-2 rounded hover:bg-gray-100 transition-colors"
              >
                Read Featured Post
              </Link>
            </div>
          </div>
        ))}
      </div>,
    ];

    return layouts[rowIndex % layouts.length];
  };

  return (
    <div className="px-4 lg:px-24 bg-gray-100 text-black mx-auto py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 md:mb-0">
          Tech Tips & Tutorials
        </h1>
        <button className="bg-[#009CA6] text-white px-6 py-3 rounded-full hover:bg-[#007A82] transition-colors shadow-lg">
          Create Post
        </button>
      </div>

      <form onSubmit={handleSubmit(handleSearch)} className="mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tech tips..."
            className="w-full p-4 pr-12 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#009CA6] focus:border-transparent"
            {...register("search")}
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#009CA6]"
          >
            <FaSearch size={24} />
          </button>
        </div>
      </form>

      <InfiniteScroll
        dataLength={displayedPosts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p className="text-center mt-4">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {displayedPosts.length > 0 ? (
          <div className="space-y-12">
            {Array.from({ length: Math.ceil(displayedPosts.length / 3) }).map(
              (_, rowIndex) => (
                <motion.div
                  key={rowIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: rowIndex * 0.1 }}
                >
                  {getRowLayout(
                    displayedPosts.slice(rowIndex * 3, (rowIndex + 1) * 3),
                    rowIndex
                  )}
                </motion.div>
              )
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg">
            <FaSearch size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">
              No posts found. Try a different search term.
            </p>
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default NewsFeed;
