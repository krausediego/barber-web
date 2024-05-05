import { DialogClose } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { findCompanyService } from "@/services/company";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";

const schema = z.object({
  description: z.string(),
});

type CompanyProfileTypeSchema = z.infer<typeof schema>;

export function CompanyProfileDialog() {
  const { data: company, isLoading: isCompanyLoading } = useQuery({
    queryKey: ["company"],
    queryFn: findCompanyService,
    staleTime: Infinity,
  });

  const form = useForm<CompanyProfileTypeSchema>({
    resolver: zodResolver(schema),
    values: {
      description: company?.description ?? "",
    },
  });

  const handleSubmit: SubmitHandler<
    CompanyProfileTypeSchema
  > = async values => {};

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao cliente.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    className="col-span-3"
                    id="description"
                    spellCheck="false"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Essa descrição fornece informações para o cliente sobre o seu
                  estabelecimento.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" type="button">
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" variant="success">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
