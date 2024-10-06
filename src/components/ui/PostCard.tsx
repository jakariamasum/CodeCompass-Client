import { motion } from "framer-motion";

const PostCard = ({ post }) => {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-6"
      whileHover={{ scale: 1.03 }}
    >
      <h2 className="text-2xl font-semibold">{post.title}</h2>
      <p className="text-gray-500">{post.category}</p>
      <p className="mt-2">{post.excerpt}</p>
      <button className="mt-4 text-blue-500 hover:underline">Read More</button>
    </motion.div>
  );
};

export default PostCard;
