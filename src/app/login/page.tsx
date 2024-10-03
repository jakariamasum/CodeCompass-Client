"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("Login Data", data);
    // TODO: login logic
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Welcome
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-lg font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              placeholder="example@service.com"
              type="email"
              className={`mt-1 text-black px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring focus:ring-yellow-300 focus:border-yellow-400 outline-none`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-lg font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                placeholder="******"
                type={showPassword ? "text" : "password"}
                className={`mt-1 text-black px-4 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring focus:ring-yellow-300 focus:border-yellow-400 outline-none w-full`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 focus:outline-none"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Login
            </button>
          </div>

          <div className="text-center mt-4">
            <Link
              href="/forgot-password"
              className="text-yellow-500 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="text-yellow-500 hover:underline font-semibold"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
