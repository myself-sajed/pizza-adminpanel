export interface Credentials {
    username: string;
    password: string;
    remember: boolean;
}

export const orderStatusColors = {
    "Received": 'yellow',
    "Confirmed": 'orange',
    "Prepared": 'blue',
    "Out for delivery": 'pink',
    "Delivered": 'green',
    "Failed": 'red',
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
    value?: string
}

export interface PriceConfiguration {
    [key: string]: {
        priceType: priceType;
        availableOptions: string[];
    };
}

export interface Category {
    _id?: string;
    name: string;
    price: PriceConfiguration;
    attributes: Attributes[];
}

type ImageFile = {
    file: File
}

export interface ProductData {
    id?: string;
    name: string;
    description: string;
    image: ImageFile;
    priceConfiguration: string;
    attributes: string;
    tenantId: string;
    categoryId: string;
    isPublish: string;
}

export const KafkaOrderEventTypes = {
    ORDER_CREATED: "ORDER_CREATED",
    ORDER_PAYMENT_FAILED: "ORDER_PAYMENT_FAILED",
    ORDER_PAYMENT_PENDING: "ORDER_PAYMENT_PENDING",
    PAYMENT_STATUS_UPDATED: "PAYMENT_STATUS_UPDATED",
    ORDER_STATUS_UPDATED: "ORDER_STATUS_UPDATED",
};