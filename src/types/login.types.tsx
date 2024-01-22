export interface Credentials {
    username: string;
    password: string;
    remember: boolean;
}

export interface CreateUserData {
    name: string;
    email: string;
    role: string;
    tenantId: number;
    password: string;
}