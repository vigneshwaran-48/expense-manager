import CameraIcon from "@/app/components/icon/CameraIcon";
import React, { ChangeEvent } from "react";

interface Props {
  id: string;
  name: string;
  displayName?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const ImageInput = ({
  id,
  name,
  displayName = "Image",
  value,
  onChange,
  className = "",
}: Props) => {
  return (
    <div className={`w-full m-2 ${className}`}>
      <p className="mb-2">{displayName}</p>
      <label
        htmlFor={id}
        className={`block w-[100px] h-[100px] relative cursor-pointer hover:[&>div]:opacity-100`}
      >
        <img
          src={value}
          alt="Organization"
          className="w-full h-full rounded-full border border-gray-400 absolute"
        />
        <div
          className={`rounded-full opacity-0 transition duration-500 w-full h-full items-center justify-center flex absolute`}
        >
          <CameraIcon className="w-[40px] h-[40px]" />
        </div>
      </label>

      <input
        id={id}
        type="file"
        name={name}
        onChange={onChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageInput;
