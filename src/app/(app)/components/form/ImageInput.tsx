import CameraIcon from "@/app/components/icon/CameraIcon";
import Spinner from "@/app/components/loader/Spinner";
import SecureImage from "@/app/components/SecureImage";
import React, { ChangeEvent } from "react";

interface Props {
  id: string;
  name: string;
  displayName?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

const ImageInput = ({
  id,
  name,
  displayName = "Image",
  value,
  onChange,
  className = "",
  loading = false,
  disabled = false,
}: Props) => {
  return (
    <div className={`w-full m-2 ${className}`}>
      <p className="mb-2">{displayName}</p>
      {!loading && (
        <label
          htmlFor={id}
          className={`block w-[100px] h-[100px] relative cursor-pointer hover:[&>div]:opacity-100`}
        >
          <SecureImage
            url={value}
            alt="Image"
            className="w-full h-full rounded-full border border-gray-400 absolute"
          />
          <div
            className={`rounded-full opacity-0 transition duration-500 w-full h-full items-center justify-center flex absolute`}
          >
            <CameraIcon className="w-[40px] h-[40px]" />
          </div>
        </label>
      )}

      {!loading && (
        <input
          id={id}
          type="file"
          name={name}
          onChange={onChange}
          className="hidden"
          disabled={disabled}
        />
      )}

      {loading && <Spinner className="w-[100px] h-[100px]" />}
    </div>
  );
};

export default ImageInput;
