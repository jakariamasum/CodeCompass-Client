"use client";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="px-2 lg:px-24 bg-slate-50 text-black mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

      <div className="bg-gray-100 p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Your Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">Your Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">Your Message</label>
            <textarea
              {...register("message", { required: "Message is required" })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
              rows={6}
            />
            {errors.message && (
              <span className="text-red-500 text-sm">
                {errors.message.message}
              </span>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">
          Other Ways to Contact Us
        </h2>
        <div className="space-y-4">
          <p>
            <strong>Phone:</strong> +123 456 7890
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-500 hover:underline"
            >
              support@example.com
            </a>
          </p>
          <p>
            <strong>Office Location:</strong> 123 Tech Street, Suite 456, City,
            Country
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
