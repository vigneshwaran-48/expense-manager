"use server";

import {
  Family,
  FamilyMember,
  FamilySettings,
  Invitation,
  JoinRequest,
  Role,
} from "@/util/AppTypes";
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
  revalidatePath("/family");
  revalidatePath("/");
  return data;
};

export const getFamilyMembers = async (id: string) => {
  const routes = getFamilyRoutes();

  const response = await sendRequest({
    url: `${routes.getOne(id)}/member`,
    method: "GET",
    includeBody: false,
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  return data.members as FamilyMember[];
};

export const getFamilyById = async (id: string) => {
  const routes = getFamilyRoutes();

  const response = await sendRequest({
    url: `${routes.getOne(id)}`,
    method: "GET",
    includeBody: false,
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  return data.family as Family;
};

export const changeMemberRole = async (
  familyId: string,
  memberId: string,
  role: string
) => {
  const routes = getFamilyRoutes();

  const response = await sendRequest({
    url: `${routes.getOne(familyId)}/member/${memberId}?role=${role}`,
    method: "POST",
    includeBody: false,
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  revalidatePath(`/family/${familyId}`);
  revalidatePath(`/family/${familyId}/members`);
  return data;
};

export const getMemberOfFamily = async (familyId: string, memberId: string) => {
  const routes = getFamilyRoutes();

  const response = await sendRequest({
    url: `${routes.getOne(familyId)}/member/${memberId}`,
    method: "GET",
    includeBody: false,
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  return data.member as FamilyMember;
};

export const getFamilyJoinRequests = async (familyId: string) => {
  const routes = getFamilyRoutes();

  const response = await sendRequest({
    url: `${routes.getOne(familyId)}/request`,
    method: "GET",
    includeBody: false,
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  return data.requests as JoinRequest[];
};

export const requestForJoining = async (familyId: string) => {
  const routes = getFamilyRoutes();

  const response = await sendRequest({
    url: `${routes.getOne(familyId)}/request`,
    method: "POST",
    includeBody: false,
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  revalidatePath("/family/search");
  return data;
};

export const acceptJoinRequest = async (
  familyId: string,
  requestId: string
) => {
  const routes = getFamilyRoutes();

  const response = await sendRequest({
    url: `${routes.getOne(familyId)}/request/${requestId}/accept`,
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

export const rejectJoinRequest = async (
  familyId: string,
  requestId: string
) => {
  const routes = getFamilyRoutes();

  const response = await sendRequest({
    url: `${routes.getOne(familyId)}/request/${requestId}/reject`,
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

export const getUserRoleInFamily = async (familyId: string) => {
  const routes = getFamilyRoutes();

  const response = await sendRequest({
    url: `${routes.getOne(familyId)}/role`,
    method: "GET",
    includeBody: false,
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  return data.role as Role;
};

export const getAllInvitationsOfFamily = async (familyId: string) => {
  const routes = getFamilyRoutes();

  const response = await sendRequest({
    url: `${routes.getOne(familyId)}/invite`,
    method: "GET",
    includeBody: false,
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  return data.invitations as Invitation[];
};

export const removeMember = async (familyId: string, memberId: string) => {
  const routes = getFamilyRoutes();

  const response = await sendRequest({
    url: `${routes.getOne(familyId)}/member/${memberId}`,
    method: "DELETE",
    includeBody: false,
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  revalidatePath(`/family/${familyId}/members`);
  return data;
};

export const inviteMember = async (
  familyId: string,
  memberId: string,
  role: Role
) => {
  const routes = getFamilyRoutes();

  const response = await sendRequest({
    url: `${routes.getOne(familyId)}/member/${memberId}/invite?role=${role}`,
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

export const getFamilySettings = async (id: string) => {

  const routes = getFamilyRoutes();

  const response = await sendRequest({
    url: `${routes.getOne(id)}/settings`,
    method: "GET",
    includeBody: false,
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  return data.settings as FamilySettings;
}
