import { Form } from "@/components/ui/form";
import { SignInForm } from "./form";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, SignInTypeSchema } from "./schema";
import { signInService } from "@/services";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

export function AuthSignInPage() {
  const navigate = useNavigate();

  const form = useForm<SignInTypeSchema>({
    resolver: zodResolver(SignInSchema),
  });

  const { mutateAsync: signInFn, isPending: isLoading } = useMutation({
    mutationFn: signInService,
    onSuccess: () => {
      // navigate("/");
    },
  });

  const handleSubmit: SubmitHandler<SignInTypeSchema> = async values => {
    try {
      await signInFn(values);

      toast.success("Login realizado com sucesso.");
    } catch (error) {
      toast.error("Erro ao realizar o login.");
    }
  };

  return (
    <FormProvider {...form}>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Entrar</h1>
        <p className="text-balance text-muted-foreground">
          Insira seu email e senha para continuar
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <SignInForm />
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Entrar
          </Button>
        </form>
      </Form>
      <div className="text-center mt-6">
        Ainda não é cadastrado ?{" "}
        <Link className="underline" to="/sign-up">
          Crie agora
        </Link>
      </div>
    </FormProvider>
  );
}
