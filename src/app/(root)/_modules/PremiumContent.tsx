import Image from "next/image";
import Link from "next/link";

const PremiumContent = () => {
  const premiumPosts = [
    {
      id: 1,
      title: "Mastering Advanced JavaScript Patterns",
      preview: "Discover the most effective JavaScript design patterns...",
      benefits: [
        "In-depth guides",
        "Exclusive tips",
        "Early access to content",
      ],
      image:
        "https://i.ibb.co.com/7KRbXTy/premium-photo-1661688733510-fc956e94ccbf-w-500-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg",
      category: "Web Development",
    },
    {
      id: 2,
      title: "AI-Powered Apps: From Concept to Production",
      preview: "Explore the entire process of building AI-powered apps...",
      benefits: ["Expert knowledge", "Practical tips", "Premium access"],
      image:
        "https://i.ibb.co.com/7KRbXTy/premium-photo-1661688733510-fc956e94ccbf-w-500-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg",
      category: "AI & Machine Learning",
    },
  ];

  return (
    <section className="bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 border-b-4 border-yellow-500 inline-block">
          Premium Content
        </h2>
        <p className="text-center mb-6 text-lg">
          Unlock exclusive, in-depth tech tips, tutorials, and guides by
          becoming a premium member.
        </p>

        <div className="flex flex-col space-y-8 md:space-y-0 md:space-x-8 md:flex-row">
          {premiumPosts.map((post) => (
            <div
              key={post.id}
              className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300"
            >
              <div className="relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  width={100}
                  height={100}
                />
                <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100">
                  <p className="text-gray-300 text-center px-4">
                    {post.preview}
                  </p>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-400 italic mb-4">
                    Exclusive content available with a premium subscription.
                  </p>

                  <span className="px-3 py-1 bg-yellow-500 text-gray-900 rounded-full text-sm inline-block mb-4">
                    {post.category}
                  </span>

                  <div className="text-gray-400 text-sm flex flex-wrap space-x-2">
                    {post.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="bg-gray-700 px-3 py-1 rounded-full mb-2"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    href="/subscribe"
                    className="bg-yellow-500 text-gray-900 font-bold px-5 py-2 rounded-full hover:bg-yellow-600 transition"
                  >
                    Subscribe Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-3xl font-semibold mb-4">Why Go Premium?</h3>
          <p className="text-gray-400 mt-4">
            Get exclusive, high-quality tech content, including:
          </p>
          <ul className="text-gray-400 mt-4 space-y-2">
            <li>✔️ In-depth guides and tutorials</li>
            <li>✔️ Early access to new content</li>
            <li>✔️ Expert tips from industry leaders</li>
            <li>✔️ Access to premium-only resources</li>
          </ul>
          <Link
            href="/subscribe"
            className="mt-6 inline-block bg-yellow-500 text-gray-900 font-bold px-6 py-2 rounded-full hover:bg-yellow-600 transition"
          >
            Subscribe Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PremiumContent;
