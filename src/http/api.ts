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
export const getUsers = (tenantId: number) =>
  api.post("/user/list", { tenantId });
export const createUser = (userData: CreateUserData) =>
  api.post("/user/create", userData);

export const getTenants = () => api.get("/tenant/getTenants");
export const createTenant = (tenantData: CreateTenantData) =>
  api.post("/tenant/create", tenantData);
