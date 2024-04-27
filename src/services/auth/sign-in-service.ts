import { SignInTypeSchema } from "@/pages/pages/auth";
import { server } from "../axios-request";

export const signInService = async (props: SignInTypeSchema) => {
  await server.post<{ data: void }>("/auth/sign-in", { ...props });
};
