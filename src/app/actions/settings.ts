"use server"

import { Settings } from "@/util/AppTypes";
import { sendRequest } from "@/util/RequestUtil";
import { getSettingRoutes } from "@/util/ResourceServer"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getSettings = async () => {

  const routes = getSettingRoutes();

  const response = await sendRequest({
    url: `${routes.get}`,
    method: "GET",
    includeBody: false,
  });

  if (response.status == 401) {
    redirect("/auth/signin");
  }
  const data = await response.json();
  return await data.settings as Settings;
}

export const updateSettings = async (settings: Settings) => {

  const routes = getSettingRoutes();

  const response = await sendRequest({
    url: routes.create,
    method: "PATCH",
    includeBody: true,
    body: JSON.stringify(settings),
    contentType: "application/json",
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  revalidatePath("/settings")
  revalidatePath("/")
  return data;
}
