import { z } from "zod";

export const SignUpSchema = z.object({
  email: z
    .string({ required_error: "Campo obrigatório." })
    .email("Digite um email válido"),
  password: z
    .string({ required_error: "Campo obrigatório." })
    .min(8, "A senha deve conter ao menos 8 caracteres."),
  repeatPassword: z
    .string({ required_error: "Campo obrigatório." })
    .min(8, "A senha deve conter ao menos 8 caracteres."),
});
// .refine(data => data.password === data.repeatPassword, {
//   message: "As senhas não são iguais.",
//   path: ["repeatPassword"],
// });

export type SignUpTypeSchema = z.infer<typeof SignUpSchema>;
