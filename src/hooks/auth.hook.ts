"use server";

import { cookies } from "next/headers";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { FieldValues } from "react-hook-form";

export interface CustomJwtPayload extends JwtPayload {
  _id: string;
  fname: string;
  lname: string;
  userId: string;
  role: string;
}
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://code-compass-server.vercel.app/api/v1";

export const registerUser = async (userData: FieldValues) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
    }
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = () => {
  cookies().delete("accessToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = jwtDecode<CustomJwtPayload>(accessToken);
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

export const logOut = async () => {
  cookies().delete("accessToken");
};
