import { SignUpTypeSchema } from "@/pages/pages/auth";
import { server } from "../axios-request";

export const signUpService = async (
  props: Omit<SignUpTypeSchema, "repeatPassword">,
) => {
  await server.post<{ data: void }>("/auth/sign-up", { ...props });
};
