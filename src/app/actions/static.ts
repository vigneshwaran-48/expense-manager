"use server";

import { sendRequest } from "@/util/RequestUtil";
import { getStaticResourceRoutes } from "@/util/ResourceServer";

export const uploadImage = async (formData: FormData) => {
  const routes = getStaticResourceRoutes();

  const response = await sendRequest({
    url: routes.create,
    method: "POST",
    includeBody: true,
    body: formData,
    includeContentType: false,
    checkAuthentication: false,
  });

  return await response.json();
};

export const getResource = async (id: string) => {
  const routes = getStaticResourceRoutes();

  const response = await sendRequest({
    url: routes.getOne(id),
    method: "GET",
    includeBody: false,
    includeContentType: false,
    checkAuthentication: false,
  });

  return await response.blob();
};

export const getImageResource = async (id: string) => {
  const routes = getStaticResourceRoutes();

  const response: Response = await sendRequest({
    url: routes.getOne(id),
    method: "GET",
    includeBody: false,
    includeContentType: false,
    checkAuthentication: false,
  });

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const base64 = buffer.toString("base64");

  const mimeType =
    response.headers.get("content-type") || "application/octet-stream";
  return `data:${mimeType};base64,${base64}`;
};
