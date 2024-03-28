import { api } from "./client";
import {
  CreateTenantData,
  CreateUserData,
  Credentials,
} from "../types/login.types";

export const AUTH_SERVICE = "/api/auth";
export const CATALOG_SERVICE = "/api/catalog";

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
