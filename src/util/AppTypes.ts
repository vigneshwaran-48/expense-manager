
export type User = {
    id: string,
    name: string,
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    image: string,
    showLoginPopup?: boolean,
    isLoggedIn?: boolean
}

export type APIRoutes = {
    get: string,
    create: string,
    getOne: (id: string | number) => string,
    delete: (id: string | number) => string,
    put: string
}
