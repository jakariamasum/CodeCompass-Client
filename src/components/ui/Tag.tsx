"use client";
import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";

type TagProps = {
  value: string[];
  onChange: (tags: string[]) => void;
};

const Tag: React.FC<TagProps> = ({ value, onChange }) => {
  const [tags, setTags] = useState<string[]>(value);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setTags(value);
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const trimmedValue = inputValue.trim();
      if (!tags.includes(trimmedValue)) {
        const updatedTags = [...tags, trimmedValue];
        setTags(updatedTags);
        onChange(updatedTags);
      }
      setInputValue("");
      e.preventDefault();
    } else if (e.key === "Backspace" && inputValue === "" && tags.length) {
      const updatedTags = tags.slice(0, -1);
      setTags(updatedTags);
      onChange(updatedTags);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const removeTag = (indexToRemove: number) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
    onChange(updatedTags);
  };

  return (
    <div className="flex items-center flex-wrap border p-2 gap-2 bg-white rounded mt-2">
      {tags?.map((tag, index) => (
        <div
          key={index}
          className="flex items-center text-gray-700 border rounded-full px-3 py-1"
        >
          <span>{tag}</span>
          <button
            className="ml-2 text-gray-500 hover:text-gray-700"
            onClick={() => removeTag(index)}
          >
            &times;
          </button>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Add a keyword"
        className="flex-grow border py-1 px-2 rounded-full outline-none"
      />
    </div>
  );
};

export default Tag;
