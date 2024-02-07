export interface Credentials {
    username: string;
    password: string;
    remember: boolean;
}

export interface CreateUserData {
    id: number,
    name: string;
    email: string;
    role: string;
    tenant: number;
    password: string;
}
export interface CreateTenantData {
    id: number;
    name: string;
    address: string;
}