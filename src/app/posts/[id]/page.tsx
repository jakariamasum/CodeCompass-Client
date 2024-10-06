"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaStar, FaUserCircle } from "react-icons/fa";

const PostDetails = () => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([
    {
      name: "John Doe",
      content: "This was an insightful post, thank you!",
    },
    {
      name: "Jane Smith",
      content: "I learned a lot from this post, especially about AI.",
    },
  ]);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const post = {
    title: "Mastering Web Development in 2024",
    description: `Web development is evolving at a fast pace. In 2024, the focus is on performance, security, and user experience. This post covers the most important trends and technologies you need to know to stay relevant in the web development industry.`,
    category: "Web Development",
    images: [
      "https://i.ibb.co.com/qdwG9jy/shutterstock-1361674454-100939444-orig.jpg",
      "https://i.ibb.co.com/qdwG9jy/shutterstock-1361674454-100939444-orig.jpg",
    ],
    videos: ["https://www.youtube.com/embed/lkIFF4maKMU?si=0TkOiKN3rraRD5nV"],
    author: "Abdullah Al Noman",
    date: "October 4, 2024",
    averageRating: 4.5,
  };

  return (
    <div className="px-2 lg:px-24 mx-auto p-4 bg-slate-50 text-black">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-gray-600">By {post.author}</span> |{" "}
            <span className="text-gray-600">{post.date}</span>
          </div>
          <div className="bg-blue-500 text-white py-1 px-3 rounded-lg text-sm">
            {post.category}
          </div>
        </div>
      </header>

      <section className="mb-12">
        <p className="text-lg text-gray-700 mb-4">{post.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {post.images.map((src, index) => (
            <div key={index} className="relative w-full h-60">
              <Image
                src={src}
                alt={`Post image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>

        <div className="mb-8">
          {post.videos.map((video, index) => (
            <div key={index} className="relative w-full h-72">
              <iframe
                width="100%"
                height="100%"
                className="rounded-lg"
                src={video}
                allowFullScreen
                title={`Video ${index + 1}`}
              ></iframe>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Rate This Post</h2>
        <div className="flex items-center">
          {Array(5)
            .fill("")
            .map((_, index) => (
              <FaStar
                key={index}
                className={`h-6 w-6 cursor-pointer ${
                  rating > index ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => handleRating(index + 1)}
              />
            ))}
          <span className="ml-4 text-lg text-gray-600">
            {post.averageRating.toFixed(1)} / 5
          </span>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <div className="space-y-6">
          {comments.map((comment, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FaUserCircle className="h-8 w-8 text-gray-500" />
                <span className="ml-3 font-medium">{comment.name}</span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-xl mb-3 font-medium">Leave a Comment</h3>
          <textarea
            rows={4}
            className="w-full border border-gray-300 p-3 rounded-lg mb-3"
            placeholder="Write your comment here..."
          ></textarea>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Post Comment
          </button>
        </div>
      </section>
    </div>
  );
};

export default PostDetails;
