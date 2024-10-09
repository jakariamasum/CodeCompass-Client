/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/lib/AxiosInstance";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/users/create-user", userData);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/users/login", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
    }
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    console.log(decodedToken);

    return {
      _id: decodedToken._id,
      fname: decodedToken.fname,
      lname: decodedToken.lname,
      email: decodedToken.userId,
      role: decodedToken.role,
    };
  }

  return decodedToken;
};
