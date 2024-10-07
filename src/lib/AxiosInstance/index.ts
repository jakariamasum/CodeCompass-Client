"use client";

import axios from "axios";
import envConfig from "@/config/envConfig";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: envConfig.baseApi,
  });

  instance.interceptors.request.use(
    function (config) {
      const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return instance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
