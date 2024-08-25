"use server";

import { sendRequest } from "@/util/RequestUtil";
import { getInvitationResourceRoutes } from "@/util/ResourceServer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const resendInvitation = async (id: string, familyId: string) => {
  const routes = getInvitationResourceRoutes();

  const response = await sendRequest({
    url: `${routes.getOne(id)}/resend`,
    method: "POST",
    includeBody: false,
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  revalidatePath(`/family/${familyId}/invites`);
  return data;
};

export const revokeInvitation = async (id: string, familyId: string) => {
  const routes = getInvitationResourceRoutes();

  const response = await sendRequest({
    url: `${routes.getOne(id)}/revoke`,
    method: "POST",
    includeBody: false,
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  revalidatePath(`/family/${familyId}/invites`);
  return data;
};
