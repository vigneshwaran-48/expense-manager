import TrashIcon from "@/app/components/icon/TrashIcon";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="p-2 w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 extra-lg:grid-cols-4 justify-items-center overflow-y-scroll hide-scrollbar">
      <Category />
      <Category />
      <Category />
      <Category />
      <Category />
    </div>
  );
};

const Category = () => {
  return (
    <div className="w-[250px] h-[250px]  bg-dark-bg flex flex-col items-center justify-around rounded relative m-2">
        <span className="absolute top-[5px] right-[5px] cursor-pointer">
          <TrashIcon className="text-red-500" />
        </span>
        <Image
          src={"/images/person.jpg"}
          alt="Category"
          width={100}
          height={100}
          className="w-[100px] h-[100px] rounded"
        />
        <h2 className="text-xl">Taxi</h2>
        <p className="text-[14px] text-center text-light-color-text">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta
          deserunt enim, aliquid maxime autem.
        </p>
      </div>
  )
}

export default page;
