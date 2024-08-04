
export type Family = {
    id: string,
    name: string,
    description: string,
    visibility: "PUBLIC" | "PRIVATE",
    createdBy: User,
    createdTime: string,
    image: string
}

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

export type AppState = {
    isSideNavOpen: boolean,
    title: string
}

export type APIRoutes = {
    get: string,
    create: string,
    getOne: (id: string | number) => string,
    delete: (id: string | number) => string,
    update: (id: string) => void
}
