import Image from "next/image";
import Link from "next/link";
import { FaThumbsUp, FaComments } from "react-icons/fa";

const LatestPosts = () => {
  const posts = [
    {
      id: 1,
      title: "Exploring the Power of Quantum Computing",
      image:
        "https://i.ibb.co.com/mH74QBm/photo-1651169610763-fddf392fadb4-w-500-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg",
      excerpt:
        "Quantum computing is set to revolutionize how we solve complex problems...",
      author: {
        name: "Jane Doe",
        avatar: "https://i.ibb.co.com/FHPD6x8/Basic-Ui-28186-29.jpg",
      },
      datePosted: "September 28, 2024",
      category: "Web Development",
      upvotes: 45,
      comments: 12,
      link: "/posts/quantum-computing",
    },
    {
      id: 2,
      title: "Top 10 Tech Gadgets You Need in 2024",
      image:
        "https://i.ibb.co.com/mH74QBm/photo-1651169610763-fddf392fadb4-w-500-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg",
      excerpt:
        "From smartwatches to AR glasses, the future is full of innovation...",
      author: {
        name: "John Smith",
        avatar: "https://i.ibb.co.com/FHPD6x8/Basic-Ui-28186-29.jpg",
      },
      datePosted: "September 25, 2024",
      category: "AI & Gadgets",
      upvotes: 72,
      comments: 20,
      link: "/posts/tech-gadgets-2024",
    },
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">
          New Arrivals
        </h2>
        <div className="space-y-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition-shadow duration-300"
            >
              <div className="md:w-1/3 w-full h-64 md:h-auto">
                <Image
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <Link
                    href={post.link}
                    className="text-2xl font-semibold hover:underline text-black"
                  >
                    {post.title}
                  </Link>
                  <p className="text-gray-700 mt-3">{post.excerpt}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full object-cover"
                      width={10}
                      height={10}
                    />
                    <div className="ml-3">
                      <p className="text-gray-900 font-medium">
                        {post.author.name}
                      </p>
                      <p className="text-gray-500 text-sm">{post.datePosted}</p>
                    </div>
                  </div>

                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <FaThumbsUp />
                      <span>{post.upvotes} Upvotes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaComments />
                      <span>{post.comments} Comments</span>
                    </div>
                  </div>

                  <Link
                    href={post.link}
                    className="text-blue-500 font-semibold hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;
