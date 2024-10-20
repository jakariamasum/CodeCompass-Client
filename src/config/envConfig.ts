const envConfig = {
  baseApi: process.env.NEXT_PUBLIC_BASE_API,
  stripe_key: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  upload_pretest: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_TEST,
  cloudinary_api: process.env.NEXT_PUBLIC_CLOUDINARY_API,
};

export default envConfig;
