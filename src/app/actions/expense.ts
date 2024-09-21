"use server";

import { sendRequest } from "@/util/RequestUtil";
import { getExpenseRoutes } from "@/util/ResourceServer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export const createExpense = async (formData: FormData, familyId: string | undefined) => {

  const routes = getExpenseRoutes();

  const response = await sendRequest({
    url: routes.create,
    method: "POST",
    includeBody: true,
    body: formData,
    includeContentType: false,
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  revalidatePath("/api/expense");
  if (familyId) {
    revalidatePath(`/family/${familyId}/expense`);
  }
  return data;
}
