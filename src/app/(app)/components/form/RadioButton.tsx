import React, { ChangeEvent } from "react";

export interface RadioButtonModel {
  displayName?: string;
  name: string;
  value?: string;
  checked?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const RadioButton = ({
  name,
  checked,
  onChange,
  value,
  displayName = name,
}: RadioButtonModel) => {
  return (
    <label className={`flex m-2 items-center cursor-pointer flex-shrink-0`}>
      <input
        type="radio"
        name={name}
        checked={checked}
        value={value}
        onChange={onChange}
        className="hidden peer"
      />
      <span
        className={`peer-checked:opacity-100 peer-checked:bg-other-bg peer-checked:text-other-text peer-checked:border-transparent [&_i]:bg-white flex rounded-full justify-center shadow-custom-dark items-center mr-1 text-transparent transition ease-in-out duration-300 border border-light-bg] w-[20px] h-[20px] hover:shadow-custom-light`}
      >
        <i className="block w-[10px] h-[10px] rounded-full text-transparent"></i>
      </span>
      <p>{displayName}</p>
    </label>
  );
};

export default RadioButton;
