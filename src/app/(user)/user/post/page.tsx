"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";

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

const Post = () => {
  const [showModal, setShowModal] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [posts, setPosts] = useState(initialPosts);
  const [currentPost, setCurrentPost] = useState<PostFormData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); // Adjust posts per page as needed

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormData>();

  const onSubmit = (data: PostFormData) => {
    data.content = editorContent;

    if (currentPost) {
      // Update existing post
      setPosts((prev) =>
        prev.map((post) =>
          post.id === currentPost.id ? { ...post, ...data } : post
        )
      );
    } else {
      // Create new post
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
    (post) =>
      (post.category === selectedCategory || selectedCategory === "") &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">My Posts</h1>
        <button
          onClick={() => {
            setShowModal(true);
            reset();
            setCurrentPost(null);
            setEditorContent("");
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Create Post
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 ml-2"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 border-b">Title</th>
            <th className="py-2 border-b">Category</th>
            <th className="py-2 border-b">Premium</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id}>
              <td className="py-2 border-b">{post.title}</td>
              <td className="py-2 border-b">{post.category}</td>
              <td className="py-2 border-b">{post.premium ? "Yes" : "No"}</td>
              <td className="py-2 border-b">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="bg-gray-300 px-4 py-2 rounded-lg mr-2"
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-gray-300 px-4 py-2 rounded-lg"
        >
          Next
        </button>
      </div>

      {/* Modal for Creating/Editing Post */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
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
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">Title is required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Content</label>
                <textarea
                  {...register("content", { required: true })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter post content"
                  rows={4}
                />
                {errors.content && (
                  <p className="text-red-500 text-sm">Content is required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Category</label>
                <select
                  {...register("category", { required: true })}
                  className="w-full border border-gray-300 rounded-lg p-2"
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
                />
                <label>
                  Tag this post as Premium (only accessible to verified users)
                </label>
              </div>

              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
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

export default Post;
