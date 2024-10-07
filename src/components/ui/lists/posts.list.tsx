import { IPost } from "@/types";

interface PostListProps {
  searchTerm: string;
  selectedCategory: string;
  currentPage: number;
  postsPerPage: number;
  onEdit: (post: IPost) => void;
  onDelete: (id: string) => void;
}

export const PostList = ({
  searchTerm,
  selectedCategory,
  currentPage,
  postsPerPage,
  onEdit,
  onDelete,
}: PostListProps) => {
  const posts: IPost[] = [];

  const filteredPosts = posts.filter(
    (post) =>
      (post.category === selectedCategory || selectedCategory === "") &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
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
          <tr key={post._id}>
            <td className="py-2 border-b">{post.title}</td>
            <td className="py-2 border-b">{post.category}</td>
            <td className="py-2 border-b">{post.isPremium ? "Yes" : "No"}</td>
            <td className="py-2 border-b">
              <button
                onClick={() => onEdit(post)}
                className="text-blue-500 hover:underline mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(post._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
