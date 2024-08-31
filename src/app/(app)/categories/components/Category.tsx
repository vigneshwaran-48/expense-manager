import TrashIcon from "@/app/components/icon/TrashIcon";
import { Category as CategoryType } from "@/util/AppTypes";
import Image from "next/image";

const Category = ({ category }: { category?: CategoryType }) => {
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
  );
};

export default Category;
