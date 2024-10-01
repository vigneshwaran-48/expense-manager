"use client";

import SearchIcon from "@/app/components/icon/SearchIcon";
import React from "react";

interface Props {
  id: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  onChange: (query: string) => void;
  className?: string;
  onEnter?: () => void
}

const Searchbar = ({
  id,
  name,
  placeholder = "Search",
  defaultValue = "",
  onChange = () => { },
  className = "",
  onEnter = () => { }
}: Props) => {

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnter();
    }
  }
  return (
    <label
      htmlFor={id}
      className={`w-fit flex p-2 text-[20px] items-center justify-between rounded border border-gray-50 ${className}`}
    >
      <SearchIcon className="m-2 cursor-pointer" />
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        value={defaultValue}
        className="bg-transparent border-none outline-none w-[calc(100%-20px)] h-full"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </label>
  );
};

export default Searchbar;
