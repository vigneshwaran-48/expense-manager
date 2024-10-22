"use server";

import { Category } from "@/util/AppTypes";
import { sendRequest } from "@/util/RequestUtil";
import { getCategoryRoutes } from "@/util/ResourceServer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getAllCategories = async () => {
  const routes = getCategoryRoutes();

  const response = await sendRequest({
    url: `${routes.get}`,
    method: "GET",
    includeBody: false,
    checkAuthentication: false,
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  return data.categories as Category[];
};

export const createCategory = async (category: Category) => {
  const routes = getCategoryRoutes();

  const response = await sendRequest({
    url: routes.create,
    method: "POST",
    includeBody: true,
    body: JSON.stringify(category),
    contentType: "application/json",
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  revalidatePath(`/categories`);
  revalidatePath(`/family/[id]/categories`, "page");
  return data;
};

export const deleteCategory = async (id: string) => {
  const routes = getCategoryRoutes();

  const response = await sendRequest({
    url: `${routes.getOne(id)}`,
    method: "DELETE",
    includeBody: false,
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  revalidatePath(`/categories`);
  revalidatePath(`/family/[id]/categories`, "page");
  return data;
};

