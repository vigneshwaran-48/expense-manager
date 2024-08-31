import TrashIcon from "@/app/components/icon/TrashIcon";
import { Category as CategoryType } from "@/util/AppTypes";
import Image from "next/image";
import CategoryDeleteButton from "./CategoryDeleteButton";
import SecureImage from "@/app/components/SecureImage";

const Category = ({ category }: { category: CategoryType }) => {
  return (
    <div className="w-[250px] h-[250px]  bg-dark-bg flex flex-col items-center justify-around rounded relative m-2">
      <CategoryDeleteButton id={category?.id as string} />
      <SecureImage
        url={category.image || "/images/person.jpg"}
        alt="Category"
        className="w-[100px] h-[100px] rounded"
      />
      <h2 className="text-xl">{category?.name}</h2>
      <p className="text-[14px] text-center text-light-color-text">
        {category?.description}
      </p>
    </div>
  );
};

export default Category;
