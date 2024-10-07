"use client";
import { useState } from "react";
import { IPost } from "@/types";
import {
  useGetPosts,
  usePostCreation,
  usePostDelete,
  usePostUpdate,
} from "@/hooks/post.hook";
import { PostList } from "@/components/ui/lists/posts.list";
import { PostModal } from "@/components/ui/modals/post.create";
import PostEditModal from "@/components/ui/modals/post.edit";

const categories = ["Web", "Software Engineering", "AI", "Mobile", "DevOps"];

const Post = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

  const { data: posts, refetch: postRefetch } = useGetPosts();
  const { mutate: handlePostCreate } = usePostCreation(postRefetch);
  const { mutate: handlePostUpdate } = usePostUpdate(postRefetch);
  const { mutate: handlePostDelete } = usePostDelete(postRefetch);

  const handleEdit = (post: IPost) => {
    setSelectedPost(post);
    setEditShowModal(true);
  };

  return (
    <div className="container mx-auto p-6">
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

      <PostList
        posts={posts || []}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        onEdit={handleEdit}
        onDelete={handlePostDelete}
      />

      <div className="mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="bg-gray-300 px-4 py-2 rounded-lg mr-2"
        >
          Previous
        </button>
        <button
          disabled={false}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-gray-300 px-4 py-2 rounded-lg"
        >
          Next
        </button>
      </div>

      <PostModal
        showModal={showModal}
        setShowModal={setShowModal}
        editorContent={editorContent}
        setEditorContent={setEditorContent}
        handlePostCreate={handlePostCreate}
        categories={categories}
      />
      <PostEditModal
        showModal={showEditModal}
        setShowModal={setEditShowModal}
        editorContent={editorContent}
        post={selectedPost}
        setEditorContent={setEditorContent}
        handlePostEdit={handlePostUpdate}
        categories={categories}
      />
    </div>
  );
};

export default Post;
