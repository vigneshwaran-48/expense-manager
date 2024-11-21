"use client"

import React from 'react'

interface Props {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
  className?: string;
  inputClassName?: string;
}

const ToggleInput = ({
  id,
  name,
  checked,
  onChange,
  className = "",
  inputClassName = "",
}: Props) => {
  return (
    <label
      htmlFor={id}
      className={`rounded-[14px] ${className} bg-dark-bg w-[50px] flex items-center cursor-pointer border-[3px] border-dark-bg`}
    >
      <span className={`w-[20px] h-[20px] rounded-full  inline-block transition ${checked ? "translate-x-[30px] bg-other-bg" : "translate-x-[0px] bg-white"} duration-500`}></span>
      <input
        id={id}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={`w-full border-b border-gray-400 hidden outline-none p-2 text-[18px] my-2 ${inputClassName}`}
      />
    </label>
  );
};

export default ToggleInput
