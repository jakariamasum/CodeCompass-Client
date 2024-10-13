/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Abdullah Al Noman",
      role: "Founder & CEO",
      image:
        "https://i.ibb.co.com/t8pdMbT/pleased-cheerful-redhaired-male-with-pleasant-smil-2021-08-31-04-23-54-utc-1-1-800x800.jpg",
      linkedin: "https://www.linkedin.com/in/abdullah-al-noman/",
      twitter: "https://twitter.com/abdullah_noman",
    },
    {
      name: "John Smith",
      role: "Lead Developer",
      image:
        "https://i.ibb.co.com/t8pdMbT/pleased-cheerful-redhaired-male-with-pleasant-smil-2021-08-31-04-23-54-utc-1-1-800x800.jpg",
      linkedin: "https://www.linkedin.com/in/john-smith/",
      twitter: "https://twitter.com/john_smith",
    },
    {
      name: "Jane Doe",
      role: "UI/UX Designer",
      image:
        "https://i.ibb.co.com/t8pdMbT/pleased-cheerful-redhaired-male-with-pleasant-smil-2021-08-31-04-23-54-utc-1-1-800x800.jpg",
      linkedin: "https://www.linkedin.com/in/jane-doe/",
      twitter: "https://twitter.com/jane_doe",
    },
  ];

  return (
    <div className="px-2 lg:px-24 mx-auto p-6 bg-slate-50 text-black">
      <section className="text-center mb-12 bg-blue-500 py-10 rounded-lg text-white">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-4 text-lg">
          We are passionate about delivering the best tech tips and resources to
          help you stay on top of the latest trends and tools in the industry.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to empower tech enthusiasts by providing expert
            advice, personal experiences, and a platform for users to share
            their knowledge and learn from each other.
          </p>
        </div>
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-600">
            We envision a future where everyone, from beginners to experts, can
            easily access the knowledge and tools they need to thrive in the
            rapidly evolving world of technology.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-center text-4xl font-bold mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500 mb-4">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  LinkedIn
                </a>
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600"
                >
                  Twitter
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-500 text-white py-12 text-center rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Join Us on Our Journey</h2>
        <p className="mb-8 text-lg">
          We're always looking for passionate individuals to help us create,
          share, and grow the tech community.
        </p>
        <button className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100">
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
