import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string({ required_error: "Campo obrigatório." })
    .email("Digite um email válido"),
  password: z
    .string({ required_error: "Campo obrigatório." })
    .min(8, "A senha deve conter ao menos 8 caracteres."),
});

export type SignInTypeSchema = z.infer<typeof SignInSchema>;
