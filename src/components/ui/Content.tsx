"use client";
import React from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

interface ContentProps {
  value: string;
  onChange: (value: string) => void;
}

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const Content: React.FC<ContentProps> = ({ value, onChange }) => {
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
  };
  return (
    <SunEditor
      setOptions={editorOptions}
      setContents={value}
      defaultValue={value}
      onChange={onChange}
    />
  );
};

export default Content;
