"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import axiosInstance from "@/lib/AxiosInstance";
import { toast } from "sonner";

type FormData = {
  password: string;
  confirmPassword: string;
};
const VerifyPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPasswordContent />
    </Suspense>
  );
};

const VerifyPasswordContent = () => {
  const router = useRouter();
  const searchQuery = useSearchParams();
  const code = searchQuery.get("code");
  const email = searchQuery.get("email");

  const [isVerifying, setIsVerifying] = useState(true);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  useEffect(() => {
    if (code && email) {
      verifyCode();
    }
  }, [code, email]);

  const verifyCode = async () => {
    try {
      const response = await axiosInstance.post("/recovery/verify-code", {
        code,
        email,
      });
      setIsVerifying(false);
      if (response.status === 200) {
        setIsCodeValid(true);
      } else {
        setMessage({
          type: "error",
          content: "Invalid or expired recovery code.",
        });
      }
    } catch (error) {
      setIsVerifying(false);
      setMessage({ type: "error", content: "Error verifying recovery code." });
      console.error(error);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axiosInstance.post("/users/password-update", {
        code,
        email,
        password: data.password,
      });
      if (response.status === 200) {
        setMessage({
          type: "success",
          content: "Your password has been updated successfully.",
        });
        setTimeout(() => {
          toast.success("Password changed successfully");
          router.push("/login");
        }, 2000);
      } else {
        setMessage({ type: "error", content: "Error updating the password." });
        toast.error("Something wrong!!");
      }
    } catch (error) {
      setMessage({ type: "error", content: "Error updating the password." });
      console.error(error);
    }
  };

  if (isVerifying) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen text-black bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {isCodeValid ? (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Update Your Password
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {message.content && (
                <p
                  className={`text-sm ${
                    message.type === "error" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {message.content}
                </p>
              )}

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Password
              </button>
            </form>
          </>
        ) : (
          <p className="text-red-600 text-center">
            {message.content || "Invalid recovery code."}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyPassword;
