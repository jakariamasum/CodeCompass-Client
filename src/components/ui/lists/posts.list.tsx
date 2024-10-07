import { IPost } from "@/types";
import { BiPencil, BiTrash } from "react-icons/bi";

interface PostListProps {
  posts: IPost[];
  searchTerm: string;
  selectedCategory: string;
  currentPage: number;
  postsPerPage: number;
  onEdit: (post: IPost) => void;
  onDelete: (id: string) => void;
}

export const PostList = ({
  posts,
  searchTerm,
  selectedCategory,
  currentPage,
  postsPerPage,
  onEdit,
  onDelete,
}: PostListProps) => {
  const filteredPosts = posts.filter(
    (post) =>
      (post.category === selectedCategory || selectedCategory === "") &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
            >
              Premium
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentPosts.map((post) => (
            <tr key={post._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {post.title}
                </div>
                <div className="text-sm text-gray-500 sm:hidden">
                  {post.category}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                <div className="text-sm text-gray-900">{post.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    post.isPremium
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {post.isPremium ? "Premium" : "Free"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(post)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                  aria-label={`Edit ${post.title}`}
                >
                  <BiPencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(post._id)}
                  className="text-red-600 hover:text-red-900"
                  aria-label={`Delete ${post.title}`}
                >
                  <BiTrash className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
