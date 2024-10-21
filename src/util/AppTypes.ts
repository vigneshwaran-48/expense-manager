export type Stats = {
  id: string,
  ownerId: string,
  type: "PERSONAL" | "FAMILY",
  currentWeekTotal: number,
  currentMonthTotal: number,
  recentExpenses: Expense[],
  categoryAmount: Record<string, number>,
  userAmount: Record<string, number>,
  weekAmount: Record<WeekDay, number>
}

export type WeekDay = "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";

export type CategoryAmount = {
  category: Category,
  amount: number
}

export type UserAmount = {
  user: User,
  amount: number
}

export type FamilySettings = {
  id: string,
  family: Family,
  inviteAcceptRequestRoles: Role[],
  familyExpenseRoles: Role[],
  removeMemberRoles: Role[],
  updateFamilyRoles: Role[],
  categoryRoles: Role[]
}

export type ExpenseFilter = {
  isFamily?: boolean,
  start?: string,
  end?: string,
  query?: string,
  searchBy?: SearchBy
}

export type SearchBy = "NAME" | "DESCRIPTION" | "CATEGORY" | "OWNER" | "ALL";

export type ExpenseCreationPayload = {
  name: string,
  description: string,
  familyId?: string,
  amount: number,
  currency: string,
  type: ExpenseType,
  categoryId: string,
  time: string
}

export type Expense = {
  id?: string,
  name: string,
  description: string,
  category: Category,
  family?: Family,
  createdBy?: User,
  amount: number,
  currency: string,
  ownerId: string,
  type: ExpenseType,
  invoices: string[],
  time: string,
  ownerName?: string
}

export type ExpenseType = "PERSONAL" | "FAMILY";

export type Category = {
  id?: string;
  name: string;
  description: string;
  image: string;
  createdBy?: User;
  ownerId?: string;
  type: CategoryType;
};

export type CategoryType = "PERSONAL" | "FAMILY";

export type Invitation = {
  id: string;
  title: string;
  content: string;
  properties: any;
  recipient: User;
  from: User;
  type: InvitationType;
  sentTime: string;
};

export type InvitationType = "FAMILY_INVITE";

export type FamilySearch = {
  id?: string;
  name: string;
  description?: string;
  visibility: "PUBLIC" | "PRIVATE";
  createdBy?: User;
  createdTime?: string;
  image: string;
  joinType: "ANYONE" | "INVITE_ONLY";
  joinRequestExists: boolean;
};

export type JoinRequest = {
  id: string;
  requestUser: User;
  family: Family;
  requestedTime: string;
};

export type FamilyMember = {
  id?: string;
  member: User;
  family: Family;
  role: Role;
};

export type Role = "LEADER" | "MAINTAINER" | "MEMBER";

export type Family = {
  id?: string;
  name: string;
  description?: string;
  visibility: "PUBLIC" | "PRIVATE";
  createdBy?: User;
  createdTime?: string;
  image: string;
  joinType: "ANYONE" | "INVITE_ONLY";
};

export type User = {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  email: string;
  image?: string;
  showLoginPopup?: boolean;
  isLoggedIn?: boolean;
};

export type AppState = {
  isSideNavOpen: boolean;
  title: string;
};

export type APIRoutes = {
  get: string;
  create: string;
  getOne: (id: string | number) => string;
  delete: (id: string | number) => string;
  update: (id: string) => void;
};
