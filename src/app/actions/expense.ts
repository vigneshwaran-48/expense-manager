"use server";

import { Expense, ExpenseFilter } from "@/util/AppTypes";
import { sendRequest } from "@/util/RequestUtil";
import { getExpenseRoutes } from "@/util/ResourceServer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getFamilyById } from "./family";
import { getUserById } from "./user";


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

export const getAllExpenses = async (filter?: ExpenseFilter) => {
  const routes = getExpenseRoutes();

  let url = routes.get;
  const searchParams = new URLSearchParams();
  if (filter) {
    if (filter.isPersonal !== undefined) {
      searchParams.append("isPersonal", filter.isPersonal + "");
    }
    if (filter.start) {
      searchParams.append("start", filter.start);
    }
    if (filter.end) {
      searchParams.append("end", filter.end);
    }
    if (filter.query) {
      searchParams.append("query", filter.query);
    }
    if (filter.searchBy) {
      searchParams.append("searchBy", filter.searchBy);
    }
    url = `${url}?${searchParams.toString()}`
  }

  console.log(url);

  const response = await sendRequest({
    url: routes.get,
    method: "GET",
    includeBody: false,
    includeContentType: false
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
