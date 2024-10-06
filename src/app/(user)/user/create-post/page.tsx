"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaTimes } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type PostFormData = {
  title: string;
  content: string;
  category: string;
  premium: boolean;
};

const categories = ["Web", "Software Engineering", "AI", "Mobile", "DevOps"];

const initialPosts = [
  {
    id: 1,
    title: "Mastering React Hooks",
    content: "Learn how to use hooks in React.",
    category: "Web",
    premium: false,
  },
  {
    id: 2,
    title: "Getting Started with Next.js",
    content: "Discover the features of Next.js.",
    category: "Web",
    premium: true,
  },
];

const CreatePost = () => {
  const [showModal, setShowModal] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [posts, setPosts] = useState(initialPosts);
  const [currentPost, setCurrentPost] = useState<PostFormData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormData>();

  const onSubmit = (data: PostFormData) => {
    data.content = editorContent;

    if (currentPost) {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === currentPost.id ? { ...post, ...data } : post
        )
      );
    } else {
      setPosts((prev) => [...prev, { id: prev.length + 1, ...data }]);
    }

    reset();
    setShowModal(false);
    setCurrentPost(null);
    setEditorContent("");
  };

  const handleEdit = (post) => {
    setCurrentPost(post);
    setEditorContent(post.content);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const filteredPosts = posts.filter(
    (post) => post.category === selectedCategory || selectedCategory === ""
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={() => {
            setShowModal(true);
            reset();
          }}
          className="bg-[#009CA6] text-white px-4 py-2 rounded-lg"
        >
          Create Post
        </button>
      </div>

      <select
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="mb-4 border border-gray-300 rounded-lg p-2"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Premium</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <tr key={post.id} className="border-b">
                  <td className="py-2 px-4">{post.title}</td>
                  <td className="py-2 px-4">{post.category}</td>
                  <td className="py-2 px-4">{post.premium ? "Yes" : "No"}</td>
                  <td className="py-2 px-4 flex space-x-2">
                    <button
                      className="text-[#009CA6] hover:underline"
                      onClick={() => handleEdit(post)}
                    >
                      <FaEdit size={22} />
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(post.id)}
                    >
                      <MdDelete size={22} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-2 px-4 text-center">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => {
                setShowModal(false);
                reset();
                setCurrentPost(null);
                setEditorContent("");
              }}
              className="absolute top-4 right-4 text-red-500 text-2xl"
            >
              <FaTimes />
            </button>

            <h2 className="text-2xl mb-4 font-semibold">
              {currentPost ? "Edit Post" : "Create New Post"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Post Title</label>
                <input
                  {...register("title", { required: true })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter post title"
                  defaultValue={currentPost?.title}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">Title is required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Content</label>
                <textarea
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter post content"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Category</label>
                <select
                  {...register("category", { required: true })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  defaultValue={currentPost?.category}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm">Category is required</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  {...register("premium")}
                  type="checkbox"
                  className="mr-2"
                  defaultChecked={currentPost?.premium}
                />
                <label>
                  Tag this post as Premium (only accessible to verified users)
                </label>
              </div>

              <button
                type="submit"
                className="bg-[#009CA6] text-white px-4 py-2 rounded-lg"
              >
                {currentPost ? "Update Post" : "Submit Post"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
