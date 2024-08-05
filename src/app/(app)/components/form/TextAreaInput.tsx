import React from "react";

interface Props {
  name: string;
  value: string;
  displayName?: string;
  onChange: (text: string) => void;
  id: string;
  className?: string;
  placeholder?: string;
  inputClassName?: string;
}

const TextAreaInput = ({
  id,
  name,
  value,
  displayName = "Text",
  onChange,
  className = "",
  placeholder = "Enter a Text",
  inputClassName = "",
}: Props) => {
  return (
    <label
      htmlFor={id}
      className={`flex flex-col max-w-[400px] rounded m-2 ${className}`}
    >
      <p>{displayName}</p>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border-b border-gray-400 outline-none p-2 text-[18px] my-2 hide-scrollbar ${inputClassName}`}
      />
    </label>
  );
};

export default TextAreaInput;
