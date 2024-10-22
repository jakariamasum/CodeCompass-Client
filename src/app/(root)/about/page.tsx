import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          About CodeCompass
        </h1>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Image
                className="h-48 w-full object-cover md:w-48"
                src="https://i.ibb.co.com/zH1KKmY/Blue-Modern-Technology-brand-Logo-removebg-preview.png"
                alt="TechTips team"
                width={192}
                height={192}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Our Mission
              </div>
              <p className="mt-2 text-gray-600">
                At TechTips, we&lsquo;re passionate about demystifying
                technology and empowering our readers with practical,
                easy-to-understand tips and tricks. Our goal is to make the
                complex world of tech accessible to everyone.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Our Expertise
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Latest gadget reviews</li>
              <li>Software tutorials</li>
              <li>Cybersecurity advice</li>
              <li>Productivity hacks</li>
              <li>Emerging tech trends</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Why Choose Us
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Expert writers and tech enthusiasts</li>
              <li>Up-to-date and accurate information</li>
              <li>Easy-to-follow guides</li>
              <li>Community-driven content</li>
              <li>Regular updates and fresh content</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-indigo-100 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["John Doe", "Jane Smith", "Mike Johnson"].map((name, index) => (
              <div key={index} className="text-center">
                <Image
                  className="mx-auto rounded-full"
                  src={`https://i.ibb.co.com/t8pdMbT/pleased-cheerful-redhaired-male-with-pleasant-smil-2021-08-31-04-23-54-utc-1-1-800x800.jpg`}
                  alt={name}
                  width={128}
                  height={128}
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-800">
                  {name}
                </h3>
                <p className="text-gray-600">Tech Enthusiast</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-block bg-indigo-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-600 transition-colors duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </main>
    </div>
  );
}
