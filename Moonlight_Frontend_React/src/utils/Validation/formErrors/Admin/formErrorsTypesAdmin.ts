
export type UserFormData = {
    name: string,
    email: string,
    cpf: string,
    password: string,
    confirmPassword: string
    id_roles: number[]
}

export type UserTouched = {
    name: boolean,
    email: boolean,
    cpf: boolean,
    password: boolean,
    confirmPassword: boolean,
    id_roles: boolean
}

export type GameFormData = {
    title: string,
    description: string,
    price: string,
    image: string,
    link: string,
    launch_date: string,
    active: string,
    categories: number[],
}

export type GameTouched = {
    title: boolean,
    price: boolean,
    launch_date: boolean,
    active: boolean,
}

export type CategoryFormData = {
    name: string,
    description: string
}

export type CategoryTouched = {
    name: boolean,
    description: boolean
}
