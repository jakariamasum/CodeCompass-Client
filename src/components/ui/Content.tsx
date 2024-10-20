"use client";
import React from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import envConfig from "@/config/envConfig";

interface ContentProps {
  value: string;
  onChange: (value: string) => void;
}

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const Content: React.FC<ContentProps> = ({ value, onChange }) => {
  const cloudinaryUpload = async (file: File, type: "image" | "video") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", envConfig.upload_pretest as string);
    const response = await fetch(`${envConfig.cloudinary_api}/${type}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log(data.secure_url);
    return data.secure_url;
  };

  const imageUploadHandler = async (
    files: File[],
    info: any,
    uploadHandler: (arg0: {
      result?: { url: any }[];
      errorMessage?: string;
    }) => void
  ) => {
    try {
      const uploadedUrl = await cloudinaryUpload(files[0], "image");
      uploadHandler({
        result: [
          {
            url: uploadedUrl,
          },
        ],
      });
    } catch (error) {
      console.error("Image upload failed:", error);
      uploadHandler({
        errorMessage: "Image upload failed. Please try again.",
      });
    }
  };

  const videoUploadHandler = async (
    files: File[],
    info: any,
    uploadHandler: (arg0: {
      result?: { url: any }[];
      errorMessage?: string;
    }) => void
  ) => {
    try {
      const uploadedUrl = await cloudinaryUpload(files[0], "video");
      uploadHandler({
        result: [
          {
            url: uploadedUrl,
          },
        ],
      });
    } catch (error) {
      console.error("Video upload failed:", error);
      uploadHandler({
        errorMessage: "Video upload failed. Please try again.",
      });
    }
  };

  const editorOptions = {
    buttonList: [
      [
        "formatBlock",
        "bold",
        "underline",
        "italic",
        "blockquote",
        "fontColor",
        "hiliteColor",
        "textStyle",
        "removeFormat",
        "align",
        "horizontalRule",
        "list",
        "lineHeight",
        "table",
        "link",
        "image",
        "video",
        "audio",
        "codeView",
      ],
    ],
    imageUploadHandler,
    videoUploadHandler,
  };

  return (
    <div className="custom-sun-editor">
      <SunEditor
        setOptions={editorOptions}
        setContents={value}
        defaultValue={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Content;
