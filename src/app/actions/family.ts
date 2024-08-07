"use server";

import { Family } from "@/util/AppTypes";
import { sendRequest } from "@/util/RequestUtil";
import { getFamilyRoutes } from "@/util/ResourceServer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getUserFamily = async () => {
  const routes = getFamilyRoutes();

  const response = await sendRequest({
    url: `${routes.get}/user`,
    method: "GET",
    includeBody: false,
    checkAuthentication: false,
  });

  if (response.status == 401) {
    redirect("/auth/signin");
  }
  return await response.json();
};

export const searchFamily = async (query: string, page: number) => {
  const routes = getFamilyRoutes();

  const params = new URLSearchParams();
  params.set("query", query);
  params.set("page", page + "");

  const response = await sendRequest({
    url: `${routes.get}/search?${params.toString()}`,
    method: "GET",
    includeBody: false,
    checkAuthentication: false,
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  return data.result;
};

export const createFamily = async (family: Family) => {
  const routes = getFamilyRoutes();

  const response = await sendRequest({
    url: routes.create,
    method: "POST",
    includeBody: true,
    body: JSON.stringify(family),
    contentType: "application/json",
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  revalidatePath("/families/search");
  return data;
};
