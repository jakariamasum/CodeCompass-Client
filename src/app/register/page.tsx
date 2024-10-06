"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useUserRegistration } from "@/hooks/auth.hook";

type RegisterFormData = {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePic: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");
  const { mutate: handleUserRegistration, isPending } = useUserRegistration();

  const onSubmit = (data: RegisterFormData) => {
    data.profilePic =
      "https://i.ibb.co.com/bdfpZcG/blank-profile-picture-973460-960-720.png";
    setLoading(true);
    setTimeout(() => {
      handleUserRegistration(data);
      setLoading(false);
    }, 2000);
  };
  if (isPending) {
    <>Loading.....</>;
  }
  return (
    <div className="flex items-center justify-center h-screen text-black">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              {...register("fname", { required: "First Name is required" })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-[#009CA6] focus:border-[#009CA6]"
              placeholder="John"
            />
            {errors.fname && (
              <p className="text-red-500 text-sm">{errors.fname.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              {...register("lname", { required: "Last Name is required" })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-[#009CA6] focus:border-[#009CA6]"
              placeholder="Doe"
            />
            {errors.lname && (
              <p className="text-red-500 text-sm">{errors.lname.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="john@doe.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="******"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type={showConfirmPassword ? "text" : "password"}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="******"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-2 rounded-lg text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#009CA6]"
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
