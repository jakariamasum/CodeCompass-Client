"use client";
import { useState } from "react";
import { IPost } from "@/types";
import {
  usePostCreation,
  usePostDelete,
  usePostUpdate,
  useUserPosts,
} from "@/hooks/post.hook";
import { PostList } from "@/components/ui/lists/posts.list";
import { PostModal } from "@/components/ui/modals/post.create";
import PostEditModal from "@/components/ui/modals/post.edit";
import { useUser } from "@/context/user.provider";

const categories = [
  "Web Development",
  "Software Engineering",
  "Artificial Intelligence (AI)",
  "Mobile Development",
  "DevOps",
  "Cloud Computing",
  "Cybersecurity",
  "Data Science",
  "Machine Learning",
  "Blockchain",
  "Tech News",
  "Programming Languages",
  "UI/UX Design",
  "Gadgets and Devices",
  "Tech Reviews",
  "Productivity Tools",
  "Tech Tutorials",
  "Open Source",
  "Networking",
  "Tech Trends",
];

const Post = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const { user } = useUser();

  const { data: posts, refetch: postRefetch } = useUserPosts(
    user?._id as string
  );
  console.log(posts);
  const { mutate: handlePostCreate } = usePostCreation(postRefetch);
  const { mutate: handlePostUpdate } = usePostUpdate(postRefetch);
  const { mutate: handlePostDelete } = usePostDelete(postRefetch);
  const [tags, setTags] = useState<string[]>(["tech"]);

  const handleEdit = (post: IPost) => {
    setSelectedPost(post);
    setEditShowModal(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">My Posts</h1>
        <button
          onClick={() => {
            setShowModal(true);
            setEditorContent("");
          }}
          className="bg-[#009CA6] hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
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
        tags={tags}
        setTags={setTags}
      />
      <PostEditModal
        showModal={showEditModal}
        setShowModal={setEditShowModal}
        editorContent={editorContent}
        post={selectedPost}
        setEditorContent={setEditorContent}
        handlePostEdit={handlePostUpdate}
        categories={categories}
        tags={tags}
        setTags={setTags}
      />
    </div>
  );
};

export default Post;
