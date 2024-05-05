import { server } from "../axios-request";

export const signOutService = async (): Promise<void> => {
  await server.post("/auth/sign-out");
};
