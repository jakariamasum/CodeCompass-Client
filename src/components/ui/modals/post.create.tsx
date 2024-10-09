import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { IPost } from "@/types";
import { useUser } from "@/context/user.provider";
import Content from "../Content";
import Tag from "../Tag";

interface PostModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  editorContent: string;
  setEditorContent: (content: string) => void;
  handlePostCreate: (data: IPost) => void;
  categories: string[];
  tags: string[];
  setTags: (tags: string[]) => void;
}

export const PostModal = ({
  showModal,
  setShowModal,
  editorContent,
  setEditorContent,
  handlePostCreate,
  categories,
  tags,
  setTags,
}: PostModalProps) => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPost>();

  const onSubmit = (data: IPost) => {
    data.content = editorContent;
    data.user = user?._id as string;
    data.tags = tags;
    handlePostCreate(data);
    reset();
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="relative bg-white w-full max-w-2xl mx-4 p-6 rounded-lg shadow-lg lg:mx-8">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-red-500 text-2xl"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl mb-4 font-semibold">Create New Post</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 overflow-y-auto max-h-[70vh]"
        >
          <div>
            <label className="block text-sm font-medium">Post Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter post title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Content</label>
            <Content value={editorContent} onChange={setEditorContent} />
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
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
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Content</label>
            <Tag value={tags} onChange={setTags} />
          </div>

          <div className="flex items-center">
            <input
              {...register("isPremium")}
              type="checkbox"
              className="mr-2"
            />
            <label>
              Tag this post as Premium (only accessible to verified users)
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#009CA6] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
};
