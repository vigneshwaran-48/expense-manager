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
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
}

const TextInput = ({
  id,
  name,
  value,
  displayName = "Text",
  onChange,
  className = "",
  placeholder = "Enter a Text",
  inputClassName = "",
  error = false,
  errorMessage = "Invalid Input",
  disabled = false,
}: Props) => {
  return (
    <label
      htmlFor={id}
      className={`flex flex-col w-fit rounded m-2 ${className}`}
    >
      <p>{displayName}</p>
      <input
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border-b border-gray-400 outline-none p-2 text-[18px] my-2 ${inputClassName}`}
        disabled={disabled}
      />
      {error ? (
        <span className="text-right text-red-500 text-[14px]">
          {errorMessage}
        </span>
      ) : (
        <span className="text-[14px] text-transparent">placeholder</span>
      )}
    </label>
  );
};

export default TextInput;
