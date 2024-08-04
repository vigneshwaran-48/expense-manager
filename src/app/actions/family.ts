"use server";

import { sendRequest } from "@/util/RequestUtil";
import { getFamilyRoutes } from "@/util/ResourceServer";
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
