"use client";

import { useState } from "react";
import Image from "next/image";
import { FaEdit, FaCheckCircle } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { useForm } from "react-hook-form";

const user = {
  name: "John Doe",
  email: "john@gmail.com",
  bio: "Happy Coding!",
  verified: false,
  profilePic:
    "https://i.ibb.co.com/YQd9HKR/man-avatar-clipart-illustration-free-png.png",
  followers: 110,
  following: 10,
  posts: [
    {
      title: "Common mistaks in programming",
      date: "24-06-2025",
      upvotes: 120,
      downvotes: 20,
      comments: 500,
    },
  ],
};

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      bio: user.bio,
    },
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    reset();
  };

  const onSubmit = (data) => {
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center border-b pb-5 mb-5">
        <div className="flex items-center space-x-4">
          <div className="relative w-24 h-24">
            <Image
              src={user.profilePic || "/default-avatar.png"}
              alt="Profile Picture"
              fill
              className="rounded-full"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <span>{user.name}</span>
              {user.verified && (
                <FaCheckCircle
                  className="text-blue-500"
                  title="Verified User"
                />
              )}
            </h2>
            <p className="text-gray-600">{user.bio}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <div className="flex space-x-4 mt-2">
              <span className="text-sm">Followers: {user.followers}</span>
              <span className="text-sm">Following: {user.following}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleEditToggle}
          className="text-blue-500 hover:text-blue-700 flex items-center"
        >
          {isEditing ? "Cancel" : <FaEdit />}
          <span className="ml-2">{isEditing ? "" : "Edit Profile"}</span>
        </button>
      </div>

      {!user.verified && (
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg mb-5">
          <p>
            Your account is not verified.{" "}
            <button className="hover:underline text-blue-600 hover:text-gray-500">
              Verify Now
            </button>
          </p>
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">Name is required</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full cursor-not-allowed bg-slate-200 text-black p-2 border border-gray-300 rounded-lg focus:outline-none"
              readOnly
              value={user.email}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Bio</label>
            <input
              type="text"
              {...register("bio")}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-4">My Posts</h3>
        {user.posts.length > 0 ? (
          <div className="space-y-4">
            {user.posts.map((post, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg"
              >
                <div>
                  <h4 className="text-lg font-bold">{post.title}</h4>
                  <p className="text-gray-600 text-sm">
                    Posted on: {post.date}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <span className="text-gray-600">Upvotes: {post.upvotes}</span>
                  <span className="text-gray-600">
                    Comments: {post.comments}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <MdOutlinePostAdd className="text-5xl mx-auto mb-3" />
            <p>No posts yet.</p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Followers & Following</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h4 className="text-lg font-bold">Followers</h4>
            <p>{user.followers}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h4 className="text-lg font-bold">Following</h4>
            <p>{user.following}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
