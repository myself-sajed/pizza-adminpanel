import { api } from "./client";
import { CreateUserData, Credentials } from "../types/login.types";

// auth service api calls

export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);

export const self = () => api.post("/auth/self");
export const logout = () => api.post("/auth/logout");
export const getUsers = (tenantId: number) =>
  api.post("/user/list", { tenantId });
export const getTenants = () => api.get("/tenant/getTenants");
export const createUser = (userData: CreateUserData) =>
  api.post("/user/create", userData);
