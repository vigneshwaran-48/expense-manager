"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import TextInput from "../../components/form/TextInput";
import {
  hideCreatePage,
  resetCreationPage,
  setCreating,
  setDescription,
  setImage,
  setName,
  setType,
  setUploadinImage,
} from "@/lib/features/category/categorySlice";
import TextAreaInput from "../../components/form/TextAreaInput";
import ImageInput from "../../components/form/ImageInput";
import { getStaticResourceRoutes } from "@/util/ResourceServer";
import { addToast, ToastType } from "@/lib/features/toast/toastSlice";
import { uploadImage } from "@/app/actions/static";
import { getUniqueId } from "@/util/getUniqueId";
import XIcon from "@/app/components/icon/XIcon";
import Dropdown from "../../components/form/Dropdown";
import { Category, CategoryType } from "@/util/AppTypes";
import { createCategory } from "@/app/actions/category";

const typeOptions = [
  {
    id: "PERSONAL",
    displayName: "Personal",
    value: "PERSONAL",
  },
  {
    id: "FAMILY",
    displayName: "Family",
    value: "FAMILY",
  },
];

const CategoryCreationPage = () => {
  const creationPage = useAppSelector(
    (state) => state.categorySlice.creationPage
  );
  const familySlice = useAppSelector((state) => state.familySlice);
  const dispatch = useAppDispatch();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const form = new FormData();
    form.append("resource", e.target.files[0]);
    dispatch(setUploadinImage(true));
    const resourceResponse = await uploadImage(form);
    if (resourceResponse.status !== 200 && resourceResponse.status !== 201) {
      dispatch(
        addToast({
          id: getUniqueId(),
          type: ToastType.ERROR,
          message: resourceResponse.error,
        })
      );
      return;
    }
    const image = getStaticResourceRoutes().getOne(resourceResponse.resourceId);
    dispatch(setImage(image));
    dispatch(setUploadinImage(false));
  };

  const handleSubmit = async () => {
    dispatch(setCreating(true));
    const category: Category = {
      name: creationPage.name,
      description: creationPage.description,
      type: creationPage.type,
      image: creationPage.image,
    };
    if (creationPage.type === "FAMILY") {
      category.ownerId = familySlice.family.id;
    }
    const response = await createCategory(category);
    if (response.status === 200) {
      dispatch(
        addToast({
          id: getUniqueId(),
          type: ToastType.SUCCESS,
          message: response.message,
        })
      );
    } else {
      dispatch(
        addToast({
          id: getUniqueId(),
          type: ToastType.ERROR,
          message: response.error,
        })
      );
      return;
    }
    dispatch(resetCreationPage());
  };

  return creationPage.show ? (
    <div className="fixed w-full h-full z-40 flex items-center justify-center overflow-y-scroll hide-scrollbar">
      <div className="absolute w-full h-full bg-light-bg opacity-70"></div>
      <div className="absolute max-w-[600px] w-[95%] bg-dark-bg rounded flex flex-col p-2">
        <div className="flex w-full items-center justify-between p-2">
          <h2 className="text-2xl font-bold">Create Category</h2>
          <span
            className="cursor-pointer"
            onClick={() => dispatch(hideCreatePage())}
          >
            <XIcon />
          </span>
        </div>
        <ImageInput
          id="category-image-id"
          name="image"
          value={creationPage.image}
          displayName="Category Image"
          onChange={handleImageChange}
          loading={creationPage.uploadingImage}
          className="my-2"
          disabled={creationPage.creating}
        />
        <TextInput
          displayName="Name"
          id="category-name-id"
          name="name"
          value={creationPage.name}
          onChange={(text) => dispatch(setName(text))}
          inputClassName="bg-light-bg border-none"
          placeholder="Taxi"
          disabled={creationPage.creating}
        />
        {familySlice.loaded &&
        (familySlice.role === "LEADER" || familySlice.role === "MAINTAINER") ? (
          <div className="flex w-full max-w-[400px] justify-between items-center px-2 mb-2">
            <p>Type</p>
            <Dropdown
              options={typeOptions}
              selectedOption={creationPage.type}
              onChange={(option) =>
                dispatch(setType(option.value as CategoryType))
              }
              className="bg-light-bg px-2 rounded"
              pending={creationPage.creating}
            />
          </div>
        ) : (
          ""
        )}

        <TextAreaInput
          displayName="Description"
          id="category-description-id"
          name="description"
          value={creationPage.description}
          onChange={(text) => dispatch(setDescription(text))}
          inputClassName="bg-light-bg resize-none border-none sm:h-[200px]"
          className="max-w-none"
          placeholder="Taxi for going to office"
          disabled={creationPage.creating}
        />
        <div className="w-full text-right px-2">
          <button
            className="button bg-other-bg text-other-text"
            type="button"
            onClick={handleSubmit}
            disabled={creationPage.creating}
          >
            {creationPage.creating ? "Creating ..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default CategoryCreationPage;
