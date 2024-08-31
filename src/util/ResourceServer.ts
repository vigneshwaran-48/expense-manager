import { APIRoutes } from "./AppTypes";

export const getServerBase = () => {
  return process.env.NEXT_PUBLIC_RESOURCE_SERVER_URL;
};

export const getUserRoutes = () => {
  const serverBase = getServerBase();

  const routes: APIRoutes = {
    get: `${serverBase}/api/user`,
    getOne: (id: string | number) => `${serverBase}/api/user/${id}`,
    create: `${serverBase}/api/user`,
    update: (id: string) => `${serverBase}/api/user/${id}`,
    delete: (id: string | number) => `${serverBase}/api/user/${id}`,
  };
  return routes;
};

export const getFamilyRoutes = () => {
  const serverBase = getServerBase();

  const routes: APIRoutes = {
    get: `${serverBase}/api/family`,
    getOne: (id: string | number) => `${serverBase}/api/family/${id}`,
    create: `${serverBase}/api/family`,
    update: (id: string) => `${serverBase}/api/family/${id}`,
    delete: (id: string | number) => `${serverBase}/api/family/${id}`,
  };

  return routes;
};

export const getStaticResourceRoutes = () => {
  const serverBase = getServerBase();

  const routes: APIRoutes = {
    get: `${serverBase}/api/static`,
    getOne: (id: string | number) => `${serverBase}/api/static/${id}`,
    create: `${serverBase}/api/static`,
    update: (id: string) => `${serverBase}/api/static/${id}`,
    delete: (id: string | number) => `${serverBase}/api/static/${id}`,
  };

  return routes;
};

export const getInvitationResourceRoutes = () => {
  const serverBase = getServerBase();

  const routes: APIRoutes = {
    get: `${serverBase}/api/invitation`,
    getOne: (id: string | number) => `${serverBase}/api/invitation/${id}`,
    create: `${serverBase}/api/invitation`,
    update: (id: string) => `${serverBase}/api/invitation/${id}`,
    delete: (id: string | number) => `${serverBase}/api/invitation/${id}`,
  };

  return routes;
};

export const getCategoryRoutes = () => {
  const serverBase = getServerBase();

  const routes: APIRoutes = {
    get: `${serverBase}/api/category`,
    getOne: (id: string | number) => `${serverBase}/api/category/${id}`,
    create: `${serverBase}/api/category`,
    update: (id: string) => `${serverBase}/api/category/${id}`,
    delete: (id: string | number) => `${serverBase}/api/category/${id}`,
  };

  return routes;
};
