/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";

const FeaturedSection = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start">
        <div className="lg:w-2/3 w-full lg:mr-8 mb-8 lg:mb-0">
          <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D"
              alt="Featured Post"
              width={100}
              height={64}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                <Link
                  href="/posts/featured-post"
                  className="hover:underline text-black"
                >
                  How AI is Changing the World of Technology
                </Link>
              </h2>
              <p className="text-gray-700 mb-4">
                Explore how artificial intelligence is transforming various
                industries, from healthcare to automation.
              </p>
              <Link
                href="/posts/featured-post"
                className="text-yellow-500 font-semibold hover:underline"
              >
                Read more
              </Link>
            </div>
            <div className="absolute top-0 left-0 bg-yellow-500 text-white px-4 py-2 rounded-br-lg">
              Featured
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 w-full">
          <h3 className="text-xl font-semibold mb-4 text-black">Trending</h3>
          <div className="space-y-6">
            <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D"
                alt="Trending Post 1"
                className="w-20 h-20 object-cover rounded-lg"
                width={100}
                height={64}
              />
              <div>
                <h4 className="text-lg font-bold">
                  <Link
                    href="https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D"
                    className="hover:underline text-black"
                  >
                    Top 10 Tech Gadgets of 2024
                  </Link>
                </h4>
                <p className="text-gray-600">
                  Discover the latest must-have gadgets in 2024.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D"
                alt="Trending Post 2"
                className="w-20 h-20 object-cover rounded-lg"
                width={100}
                height={64}
              />
              <div>
                <h4 className="text-lg font-bold">
                  <Link
                    href="https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D"
                    className="hover:underline text-black"
                  >
                    Blockchain Beyond Cryptocurrency
                  </Link>
                </h4>
                <p className="text-gray-600">
                  Explore blockchain's applications outside of crypto.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D"
                alt="Trending Post 3"
                className="w-20 h-20 object-cover rounded-lg"
                width={100}
                height={64}
              />
              <div>
                <h4 className="text-lg font-bold">
                  <Link
                    href="https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D"
                    className="hover:underline text-black"
                  >
                    The Future of Quantum Computing
                  </Link>
                </h4>
                <p className="text-gray-600">
                  Learn how quantum computing could change everything.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
