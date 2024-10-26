"use server";

import { Stats } from "@/util/AppTypes";
import { sendRequest } from "@/util/RequestUtil";
import { getStatsRoutes } from "@/util/ResourceServer";
import { redirect } from "next/navigation";

export const getFamilyStats = async () => {

  const routes = getStatsRoutes();

  const response = await sendRequest({
    url: `${routes.get}/family`,
    method: "GET",
    includeBody: false,
    checkAuthentication: false,
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  return data.stats as Stats;

}

export const getPersonalStats = async () => {

  const routes = getStatsRoutes();

  const response = await sendRequest({
    url: `${routes.get}/personal`,
    method: "GET",
    includeBody: false,
    checkAuthentication: false,
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  return data.stats as Stats;

}
