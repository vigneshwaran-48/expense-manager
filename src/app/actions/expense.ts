"use server";

import { Expense, ExpenseFilter } from "@/util/AppTypes";
import { sendRequest } from "@/util/RequestUtil";
import { getExpenseRoutes } from "@/util/ResourceServer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getFamilyById } from "./family";
import { getUserById } from "./user";


export const createExpense = async (formData: FormData, familyId: string | null) => {

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
  revalidatePath("/expense");
  if (familyId) {
    revalidatePath(`/family/${familyId}/expense`);
  }
  return data;
}

export const getAllExpenses = async (filter?: ExpenseFilter) => {
  const routes = getExpenseRoutes();

  let url = routes.get;
  const searchParams = new URLSearchParams();
  if (filter) {
    if (filter.isFamily !== undefined) {
      searchParams.set("isFamily", filter.isFamily + "");
    }
    if (filter.start) {
      searchParams.set("start", filter.start);
    }
    if (filter.end) {
      searchParams.set("end", filter.end);
    }
    if (filter.query) {
      searchParams.set("query", filter.query);
    }
    if (filter.searchBy) {
      searchParams.set("searchBy", filter.searchBy);
    }
    url = `${url}?${searchParams.toString()}`
  }


  const response = await sendRequest({
    url,
    method: "GET",
    includeBody: false,
  });

  const data = await response.json();
  if (data.status === 401) {
    redirect("/auth/signin");
  }
  const expenses = data.expenses as Expense[];
  if (expenses) {
    for (const expense of expenses) {
      if (expense.type === "FAMILY") {
        expense.ownerName = (await getFamilyById(expense.ownerId)).name;
        continue;
      }
      expense.ownerName = (await getUserById(expense.ownerId)).name;
    }
  }
  return data.expenses as Expense[];
}

export const deleteExpense = async (id: string, familyId: string | null) => {

  const routes = getExpenseRoutes();

  const response = await sendRequest({
    url: routes.delete(id),
    method: "DELETE",
    includeBody: false,
  });

  if (response.status == 401) {
    redirect("/auth/signin");
  }
  revalidatePath("/expense");
  if (familyId) {
    revalidatePath(`/family/${familyId}/expenses`);
  }
  return await response.json();
}
