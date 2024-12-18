"use client";

import AngleDown from "@/app/components/icon/AngleDown";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  options: Option[];
  selectedOption: string;
  onChange: (option: Option) => void;
  pending?: boolean;
  className?: string;
  ulClass?: string,
  listHoverBg?: string
}

export interface Option {
  id: string;
  displayName: string;
  value: string;
}

const Dropdown = ({
  options,
  selectedOption,
  onChange,
  pending = false,
  className = "",
  ulClass = "bg-light-bg",
  listHoverBg = "hover:bg-dark-bg"
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchend", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchend", handleOutsideClick);
    };
  }, []);

  const optionElems = options.filter(option => option.id !== selectedOption).map((option) => (
    <li
      id={option.id}
      key={option.id}
      onClick={() => onChange(option)}
      className={`p-2 hover:bg-dark-bg cursor-pointer ${listHoverBg}`}
    >
      {option.displayName}
    </li>
  ));

  const selectedDisplayName = options.find(
    (option) => option.id === selectedOption
  )?.displayName;

  return (
    <div
      className={`relative flex items-center py-2 pr-2 ${className} ${pending ? "cursor-wait" : "cursor-pointer"
        }`}
      onClick={() => !pending && setOpen(!open)}
      ref={dropDownRef}
    >
      <div
        className={`pr-2 text-color-text ${pending ? "text-light-color-text" : ""
          }`}
      >
        {selectedDisplayName}
      </div>
      {!pending && <AngleDown />}
      <ul
        className={`flex flex-col h-fit max-h-[200px] w-full overflow-y-scroll hide-scrollbar absolute top-[105%] z-30 transition duration-500 border border-light-bg overflow-hidden origin-top left-0 ${open ? "" : "scale-y-0"
          } ${ulClass}`}
      >
        {optionElems}
      </ul>
    </div>
  );
};

export default Dropdown;
