import { api } from "./client";
import {
  CreateTenantData,
  CreateUserData,
  Credentials,
} from "../types/login.types";

// auth service api calls

export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);

export const self = () => api.post("/auth/self");

export const logout = () => api.post("/auth/logout");

export const getUsers = (tenantId: number, params: string) =>
  api.post(`/user/list?${params}`, { tenantId });

export const createUser = (userData: CreateUserData) =>
  api.post("/user/create", userData);

export const updateUser = (userData: CreateUserData) => {
  console.log("called update user");
  console.log({ userToUpdate: userData?.id, detailsToUpdate: userData });
  return api.post("/user/update", {
    userToUpdate: userData?.id,
    detailsToUpdate: userData,
  });
};

export const getTenants = (query: string) =>
  api.get(`/tenant/getTenants?${query}`);

export const getAllTenantList = () => api.get(`/tenant/getAllTenantList`);

export const createTenant = (tenantData: CreateTenantData) =>
  api.post("/tenant/create", tenantData);

export const updateTenant = (tenantDetails: CreateTenantData) =>
  api.post("/tenant/updateTenant", {
    tenantToUpdate: tenantDetails.id,
    detailsToUpdate: tenantDetails,
  });
