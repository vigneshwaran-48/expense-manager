
export type FamilySearch = {
  id?: string;
  name: string;
  description?: string;
  visibility: "PUBLIC" | "PRIVATE";
  createdBy?: User;
  createdTime?: string;
  image: string;
  joinType: "ANYONE" | "INVITE_ONLY";
  joinRequestExists: boolean
};

export type JoinRequest = {
  id: string,
  requestUser: User,
  family: Family,
  requestedTime: string
}

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
