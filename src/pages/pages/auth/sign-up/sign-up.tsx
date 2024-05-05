import { Button } from "@/components/ui/button";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { SignUpForm } from "./form";
import { useMutation } from "@tanstack/react-query";
import { signUpService } from "@/services";
import { SignUpSchema, SignUpTypeSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { Form } from "@/components/ui/form";

export function AuthSignUpPage() {
  const navigate = useNavigate();

  const form = useForm<SignUpTypeSchema>({
    resolver: zodResolver(SignUpSchema),
  });

  const { mutateAsync: signUpFn, isPending: isLoading } = useMutation({
    mutationFn: signUpService,
    onSuccess: () => {
      navigate("/sign-in");
    },
  });

  const handleSubmit: SubmitHandler<SignUpTypeSchema> = async values => {
    try {
      await signUpFn(values);

      toast.success("Usuário criado com sucesso!");
    } catch (error: any) {
      if (error.response.status === 409) {
        return toast.error("Este email já está em uso, utilize outro ou tente fazer o login.");
      }
      toast.error("Ocorreu um erro ao tentar realizar seu cadastro.");
    }
  };

  return (
    <FormProvider {...form}>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Criar conta</h1>
        <p className="text-balance text-muted-foreground">
          Insira suas informações para criar sua conta
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <SignUpForm />
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Criar conta
          </Button>
        </form>
      </Form>
      <div className="text-center mt-6">
        Já possui uma conta ?{" "}
        <Link className="underline" to="/sign-in">
          Entre agora
        </Link>
      </div>
    </FormProvider>
  );
}
