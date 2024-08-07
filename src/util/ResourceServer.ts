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
