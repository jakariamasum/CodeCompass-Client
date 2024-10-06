"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import Content from "@/components/ui/Content";

type PostFormData = {
  title: string;
  content: string;
  category: string;
  premium: boolean;
};

const categories = ["Web", "Software Engineering", "AI", "Mobile", "DevOps"];

const Post = () => {
  const [showModal, setShowModal] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormData>();

  const onSubmit = (data: PostFormData) => {
    data.content = editorContent;
    console.log(data);
    reset();
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Create Post
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-red-500 text-2xl"
            >
              <FaTimes />
            </button>

            <h2 className="text-2xl mb-4 font-semibold">Create New Post</h2>

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
                <Content value={editorContent} onChange={setEditorContent} />
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
                Submit Post
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
