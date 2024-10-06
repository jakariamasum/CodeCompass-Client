"use client";
import { useState } from "react";

const staticPosts = [
  { id: 1, title: "Post 1", author: "John Doe", status: "Published" },
  { id: 2, title: "Post 2", author: "Jane Smith", status: "Draft" },
];

const PostManagement = () => {
  const [posts, setPosts] = useState(staticPosts);
  const [editingPost, setEditingPost] = useState(null);

  const deletePost = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  const startEdit = (post: any) => {
    setEditingPost(post);
  };

  const savePost = (post: any) => {
    const updatedPosts = posts.map((p) => (p.id === post.id ? post : p));
    setPosts(updatedPosts);
    setEditingPost(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Post Management</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="border p-2">{post.title}</td>
              <td className="border p-2">{post.author}</td>
              <td className="border p-2">{post.status}</td>
              <td className="border p-2 flex space-x-2">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={() => startEdit(post)}
                >
                  Edit
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-1 rounded"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingPost && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Edit Post</h3>
          <input
            type="text"
            value={editingPost.title}
            onChange={(e) =>
              setEditingPost({ ...editingPost, title: e.target.value })
            }
            className="w-full border p-2 mb-2"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => savePost(editingPost)}
          >
            Save Post
          </button>
        </div>
      )}
    </div>
  );
};

export default PostManagement;
