"use server";

import { ExpenseCreationPayload } from "@/util/AppTypes";
import { sendRequest } from "@/util/RequestUtil";
import { getExpenseRoutes } from "@/util/ResourceServer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export const createExpense = async (payload: ExpenseCreationPayload) => {

  const routes = getExpenseRoutes();

  const response = await sendRequest({
    url: routes.create,
    method: "POST",
    includeBody: true,
    body: JSON.stringify(payload),
    contentType: "application/json",
  });

  const data = await response.json();
  if (response.status === 401) {
    redirect("/auth/signin");
  }
  revalidatePath("/api/expense");
  if (payload.familyId) {
    revalidatePath(`/family/${payload.familyId}/expense`);
  }
  return data;
}
