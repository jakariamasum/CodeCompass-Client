/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { loginUser } from "@/hooks/auth.hook";
import { useRouter } from "next/navigation";

type LoginFormData = {
  email: string;
  password: string;
};

type RecoveryFormData = {
  email: string;
};

const Login = () => {
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>();

  const {
    register: recoveryRegister,
    handleSubmit: handleRecoverySubmit,
    formState: { errors: recoveryErrors },
  } = useForm<RecoveryFormData>();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [recoveryMessage, setRecoveryMessage] = useState("");
  const router = useRouter();

  const onLoginSubmit = async (data: LoginFormData) => {
    setLoading(true);

    try {
      const result = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (result.success) {
        if (result.data.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/user");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRecoverySubmit = async (data: RecoveryFormData) => {
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/users/recover/password/kk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email }),
        }
      );

      const result = await response.json();
      console.log(response);

      if (response.ok) {
        setRecoveryMessage(
          "If an account exists for this email, you will receive a recovery link shortly."
        );
      } else {
        throw new Error(result.message || "An error occurred");
      }
    } catch (error) {
      console.log("Recovery error:", error);
      setRecoveryMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {isRecoveryMode ? "Recover Your Password" : "Login to Your Account"}
        </h2>

        {isRecoveryMode ? (
          <form
            onSubmit={handleRecoverySubmit(onRecoverySubmit)}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                {...recoveryRegister("email", {
                  required: "Email is required",
                })}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter your email"
              />
              {recoveryErrors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {recoveryErrors.email.message}
                </p>
              )}
            </div>

            {recoveryMessage && (
              <p className="text-sm text-green-600 mt-2">{recoveryMessage}</p>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-2 rounded-lg text-white ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-500"
              }`}
              disabled={loading}
            >
              {loading ? "Sending Recovery Email..." : "Recover Password"}
            </motion.button>

            <button
              type="button"
              className="w-full text-teal-500 hover:underline mt-2"
              onClick={() => setIsRecoveryMode(false)}
            >
              Back to Login
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleLoginSubmit(onLoginSubmit)}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                {...loginRegister("email", { required: "Email is required" })}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter your email"
              />
              {loginErrors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {loginErrors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                {...loginRegister("password", {
                  required: "Password is required",
                })}
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter your password"
              />
              {loginErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {loginErrors.password.message}
                </p>
              )}
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                className="text-teal-500 hover:underline text-sm"
                onClick={() => setIsRecoveryMode(true)}
              >
                Forgot Password?
              </button>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-2 rounded-lg text-white ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-500"
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>
        )}

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-teal-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
