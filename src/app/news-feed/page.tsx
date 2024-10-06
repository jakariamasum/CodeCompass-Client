"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

const staticPosts = [
  {
    id: 1,
    title: "Understanding React Hooks",
    category: "Web",
    image:
      "https://i.ibb.co.com/MGhT0ds/tim-mossholder-V37i-Tr-YZz2-E-unsplash.jpg",
    excerpt:
      "Learn about useState, useEffect, and other powerful hooks in React.",
  },
  {
    id: 2,
    title: "AI in Healthcare",
    category: "AI",
    image:
      "https://i.ibb.co.com/MGhT0ds/tim-mossholder-V37i-Tr-YZz2-E-unsplash.jpg",
    excerpt:
      "How AI is transforming the healthcare industry and improving patient outcomes.",
  },
  {
    id: 3,
    title: "Introduction to Kubernetes",
    category: "DevOps",
    image:
      "https://i.ibb.co.com/MGhT0ds/tim-mossholder-V37i-Tr-YZz2-E-unsplash.jpg",
    excerpt:
      "Kubernetes is a game-changer for managing containers in the cloud. Here’s why.",
  },
  {
    id: 4,
    title: "Mastering Mobile App Development",
    category: "Mobile",
    image:
      "https://i.ibb.co.com/MGhT0ds/tim-mossholder-V37i-Tr-YZz2-E-unsplash.jpg",
    excerpt:
      "Discover the best practices and tools for mobile app development.",
  },
];

const NewsFeed = () => {
  const [filteredPosts, setFilteredPosts] = useState(staticPosts);
  const { register, handleSubmit } = useForm();

  const handleSearch = ({ search }) => {
    if (!search) {
      setFilteredPosts(staticPosts);
    } else {
      const filtered = staticPosts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  return (
    <div className="px-2 lg:px-24 bg-slate-50 text-black mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Tech Tips & Tutorials
        </h1>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700">
          Create Post
        </button>
      </div>

      <div className="mb-10 flex items-center space-x-4">
        <form onSubmit={handleSubmit(handleSearch)} className="flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tech tips..."
              className="w-full p-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-indigo-400"
              {...register("search")}
            />
            <button
              type="submit"
              className="absolute right-4 top-2 text-gray-500"
            >
              <FaSearch size={20} />
            </button>
          </div>
        </form>
      </div>

      {filteredPosts.map((post, idx) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className={`flex flex-col md:flex-row md:even:flex-row-reverse items-center mb-10 bg-white rounded-lg shadow-lg overflow-hidden ${
            idx % 2 == 0 ? "border-t-4 border-indigo-600" : ""
          }`}
        >
          <div className="md:w-1/3">
            <Image
              src={post.image}
              alt={post.title}
              className="object-cover w-full h-64 md:h-full"
              width={100}
              height={64}
            />
          </div>

          <div className="md:w-2/3 p-6">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              {post.title}
            </h2>
            <p className="text-indigo-600 mb-4">{post.category}</p>
            <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
            <button className="mt-4 text-indigo-600 hover:underline">
              Read More
            </button>
          </div>
        </motion.div>
      ))}

      {filteredPosts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No posts found.</p>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
