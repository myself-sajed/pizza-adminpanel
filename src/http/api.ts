import { api } from "./client";
import { Credentials } from "../types/login/login.types";

// auth service api calls

export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);

export const self = () => api.post("/auth/self");
export const logout = () => api.post("/auth/logout");
export const getUsers = (tenantId: number) =>
  api.post("/user/list", { tenantId });
