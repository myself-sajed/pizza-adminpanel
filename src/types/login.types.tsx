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

export interface ChooseCategory {
    _id: string;
    name: string;
}

export type priceType = "base" | "additional";
export type widgetType = "switch" | "radio";

export interface Attributes {
    name: string;
    widgetType: widgetType;
    defaultValue: string;
    availableOptions: string[];
}
export interface GetProductFilter {
    isPublish?: boolean;
    tenantId?: string;
    categoryId?: string;
    limit: string;
    page?: string;
}

export interface Attributes {
    name: string;
    widgetType: widgetType;
    defaultValue: string;
    availableOptions: string[];
}

export interface PriceConfiguration {
    [key: string]: {
        priceType: priceType;
        availableOptions: string[];
    };
}

export interface Category {
    name: string;
    price: PriceConfiguration;
    attributes: Attributes[];
}