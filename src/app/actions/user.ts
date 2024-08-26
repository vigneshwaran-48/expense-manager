"use server";

import { User } from "@/util/AppTypes";
import { sendRequest } from "@/util/RequestUtil";
import { getUserRoutes } from "@/util/ResourceServer";
import { redirect } from "next/navigation";

export const getProfile = async () => {
  const routes = getUserRoutes();

  const response = await sendRequest({
    url: `${routes.get}/profile`,
    method: "GET",
    includeBody: false,
    checkAuthentication: false,
  });

  if (response.ok) {
    const data = await response.json();

    if (data.status === 200 || data.status === 401) {
      const user = data.user;
      user.isLoggedIn = data.status !== 401;
      return user as User;
    }
    throw new Error(data.error);
  }
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  throw new Error("Error while fetching users details");
};

export const getAllUsers = async () => {
  const routes = getUserRoutes();

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
  console.log(data);
  return data.users as User[];
};
