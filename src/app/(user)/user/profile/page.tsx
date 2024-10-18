"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheckCircle, FaUserMinus } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { BiCalendar, BiComment, BiLike } from "react-icons/bi";
import moment from "moment";
import { useUser } from "@/context/user.provider";
import { useUserPosts } from "@/hooks/post.hook";
import { IPost } from "@/types";
import { useSingleUser, useUserUpdate } from "@/hooks/user.hook";
import Image from "next/image";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const { user } = useUser();
  const { data: posts } = useUserPosts(user?._id as string);
  const { data: userData, refetch } = useSingleUser(user?.email as string);
  const { mutate: handleUpdate } = useUserUpdate(refetch);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: userData?.email,
      fname: userData?.fname,
      lname: userData?.lname,
    },
  });
  useEffect(() => {
    if (userData) {
      reset({
        email: userData?.email,
        fname: userData?.fname,
        lname: userData?.lname,
      });
    }
  }, [userData, reset]);
  console.log(userData);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    reset();
  };

  const onSubmit = (data: any) => {
    console.log(data);
    handleUpdate({ id: user?._id as string, userData: data });
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-50 p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                <span>
                  {userData?.fname} {userData?.lname}
                </span>
                {userData?.verified === "yes" && (
                  <FaCheckCircle
                    className="text-blue-500"
                    title="Verified User"
                  />
                )}
              </h2>
              <p className="text-gray-600">{userData?.email}</p>
            </div>
            <div className="mt-6">
              <button
                onClick={handleEditToggle}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>
          <div className="md:w-2/3 p-8">
            {userData?.verified === "no" && (
              <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg mb-6">
                <p>
                  Your account is not verified.
                  <button
                    onClick={() =>
                      handleUpdate({
                        id: userData?._id,
                        userData: { verified: "pending" },
                      })
                    }
                    className="text-blue-500 underline"
                  >
                    Verify Now
                  </button>
                </p>
              </div>
            )}
            {userData?.verified === "pending" && (
              <div className="bg-yellow-100 text-green-700 p-4 rounded-lg mb-6">
                <p>Your verification requested pending!</p>
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label
                    htmlFor="fname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="fname"
                    {...register("fname", { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  {errors.fname && (
                    <span className="text-red-500 text-sm">
                      First Name is required
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="lname"
                    {...register("lname", { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  {errors.lname && (
                    <span className="text-red-500 text-sm">
                      Last Name is required
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                  Save
                </button>
              </form>
            ) : (
              <div>
                <div className="flex space-x-4 border-b">
                  {["posts", "following", "followers"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-2 px-4 focus:outline-none ${
                        activeTab === tab
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {activeTab === "posts" && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">My Posts</h3>
                    {posts?.length > 0 ? (
                      <div className="space-y-4">
                        {posts?.map((post: IPost, index: number) => (
                          <div
                            key={index}
                            className="bg-white p-4 rounded-lg shadow"
                          >
                            <h4 className="text-lg font-bold">{post.title}</h4>
                            <p className="text-gray-500 text-sm flex items-center mt-1">
                              <BiCalendar className="mr-1" />
                              {moment(post?.createdAt).format("MMMM Do YYYY")}
                            </p>
                            <div className="flex space-x-4 mt-2 text-gray-500 text-sm">
                              <span className="flex items-center">
                                <BiLike className="mr-1" />
                                {post?.likes}
                              </span>
                              <span className="flex items-center">
                                <BiComment className="mr-1" />
                                10
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        <MdOutlinePostAdd className="text-5xl mx-auto mb-3" />
                        <p>No posts yet.</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "following" && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Following</h3>
                    <div className="space-y-4">
                      {user?.following?.map((follow, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                        >
                          <div className="flex items-center space-x-4">
                            <Image
                              className="w-12 h-12 rounded-full"
                              src="https://via.placeholder.com/48"
                              alt="Following"
                              width={12}
                              height={12}
                            />
                            <div>
                              <h4 className="font-semibold">John Doe</h4>
                              <p className="text-sm text-gray-500">@johndoe</p>
                            </div>
                          </div>
                          <button className="text-red-500 hover:text-red-600">
                            <FaUserMinus />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "followers" && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Followers</h3>
                    <div className="space-y-4">
                      {user?.followers?.map((follower, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow"
                        >
                          <Image
                            className="w-12 h-12 rounded-full"
                            src="https://via.placeholder.com/48"
                            alt="Follower"
                            width={12}
                            height={12}
                          />
                          <div>
                            <h4 className="font-semibold">Jane Smith</h4>
                            <p className="text-sm text-gray-500">@janesmith</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
