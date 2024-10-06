"use client";
import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const initialPosts = [
  {
    id: 1,
    title: "Mastering React Hooks",
    category: "Web",
    views: 500,
    upvotes: 120,
  },
  {
    id: 2,
    title: "Getting Started with Next.js",
    category: "Web",
    views: 750,
    upvotes: 200,
  },
  {
    id: 3,
    title: "Understanding JavaScript Promises",
    category: "Software Engineering",
    views: 300,
    upvotes: 90,
  },
  {
    id: 4,
    title: "Exploring AI in Everyday Applications",
    category: "AI",
    views: 400,
    upvotes: 110,
  },
  {
    id: 5,
    title: "A Guide to CSS Flexbox",
    category: "Web",
    views: 650,
    upvotes: 160,
  },
];

const MyPosts = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  const handleDelete = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-2 mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Posts</h2>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full md:w-1/3"
        />
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Views</th>
              <th className="py-3 px-4 text-left">Upvotes</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <tr key={post.id} className="border-b">
                  <td className="py-2 px-4">{post.title}</td>
                  <td className="py-2 px-4">{post.category}</td>
                  <td className="py-2 px-4">{post.views}</td>
                  <td className="py-2 px-4">{post.upvotes}</td>
                  <td className="py-2 px-4 flex space-x-2">
                    <button className="text-blue-600 hover:underline">
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(post.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-2 px-4 text-center">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-600 text-white"
          } `}
        >
          Previous
        </button>

        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-blue-600 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyPosts;
