import { APIRoutes } from "./AppTypes";
import { getServerBase } from "./ResourceServer";

export const getUserRoutes = () => {

    const serverBase = getServerBase();

    const routes : APIRoutes = {
        get: `${serverBase}/api/user`,
        getOne: (id: string | number) => `${serverBase}/api/user/${id}`,
        create: `${serverBase}/api/user`,
        put: `${serverBase}/api/user`,
        delete: (id: string | number) => `${serverBase}/api/user/${id}`
    }
    return routes;
}