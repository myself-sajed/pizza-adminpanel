import { api } from "./client";
import {
  CreateTenantData,
  CreateUserData,
  Credentials,
} from "../types/login.types";
import { Promo } from "../components/sections/Promos";

export const AUTH_SERVICE = "/api/auth";
export const CATALOG_SERVICE = "/api/catalog";
export const ORDER_SERVICE = "/api/order";

// AUTH SERVICE APIs

export const login = (credentials: Credentials) =>
  api.post(`${AUTH_SERVICE}/auth/login`, credentials);

export const self = () => api.post(`${AUTH_SERVICE}/auth/self`);

export const logout = () => api.post(`${AUTH_SERVICE}/auth/logout`);

export const getUsers = (tenantId: number, params: string) =>
  api.post(`${AUTH_SERVICE}/user/list?${params}`, { tenantId });

export const createUser = (userData: CreateUserData) => {
  return api.post(`${AUTH_SERVICE}/user/create`, userData);
};

export const updateUser = (userData: CreateUserData) => {
  return api.post(`${AUTH_SERVICE}/user/update`, {
    userToUpdate: userData?.id,
    detailsToUpdate: userData,
  });
};

export const getTenants = (query: string) =>
  api.get(`${AUTH_SERVICE}/tenant/getTenants?${query}`);

export const getAllTenantList = () =>
  api.get(`${AUTH_SERVICE}/tenant/getAllTenantList`);

export const createTenant = (tenantData: CreateTenantData) =>
  api.post(`${AUTH_SERVICE}/tenant/create`, tenantData);

export const updateTenant = (tenantDetails: CreateTenantData) =>
  api.post(`${AUTH_SERVICE}/tenant/updateTenant`, {
    tenantToUpdate: tenantDetails.id,
    detailsToUpdate: tenantDetails,
  });

// CATALOG SERVICE APIs
export const getAllCategoryList = () =>
  api.get(`${CATALOG_SERVICE}/categories/getList`);

export const getProductList = (params: string) => {
  return api.get(`${CATALOG_SERVICE}/products/getProducts?${params}`);
};

export const getPromosList = (params: string) => {
  return api.get(`${ORDER_SERVICE}/coupon/getAllCoupons?${params}`);
};

export const updatePromo = (data: Promo) => {
  return api.patch(`${ORDER_SERVICE}/coupon/update`, data);
};

export const createPromo = (data: Promo) => {
  return api.post(`${ORDER_SERVICE}/coupon/create`, data);
};

export const getOrderList = (params: string) => {
  return api.get(`${ORDER_SERVICE}/order/getAllOrders?${params}`);
};

export const getSingleAdminOrder = (orderId: string) => {
  return api.post(`${ORDER_SERVICE}/order/getSingleAdminOrder`, { orderId });
};

export const changeOrderStatus = (orderId: string, orderStatus: string) => {
  return api.post(`${ORDER_SERVICE}/order/changeOrderStatus`, {
    orderId,
    orderStatus,
  });
};

export const createProduct = (productData: FormData) => {
  return api.post(`${CATALOG_SERVICE}/products/create`, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateProduct = (
  productData: FormData,
  productId: string | undefined
) => {
  return api.put(
    `${CATALOG_SERVICE}/products/update/${productId}`,
    productData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
