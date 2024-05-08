import { DialogClose } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { Input } from "./ui/input";
import { updateCompanyService } from "@/services/company/update-company-service";
import { toast } from "sonner";
import { MultiSelect, OptionType } from "./company-types";

const typesEnum = z.enum([
  "HAIRCUTS",
  "MAKE_UP",
  "MANICURE",
  "MASSAGE",
  "BARBER",
]);

const schema = z.object({
  name: z.string(),
  description: z.string(),
  types: z.array(typesEnum),
});

export type CompanyProfileTypeSchema = z.infer<typeof schema>;

const options: OptionType[] = [
  { label: "Cabeleireiro", value: "HAIRCUTS" },
  { label: "Maquiagem", value: "MAKE_UP" },
  { label: "Manicure", value: "MANICURE" },
  { label: "Massagem", value: "MASSAGE" },
  { label: "Barbeiro", value: "BARBER" },
];

export function CompanyProfileDialog() {
  const queryClient = useQueryClient();

  const { data: company, isLoading: isCompanyLoading } = useQuery({
    queryKey: ["company"],
    queryFn: findCompanyService,
    staleTime: Infinity,
  });

  const form = useForm<CompanyProfileTypeSchema>({
    resolver: zodResolver(schema),
    values: {
      name: company?.name ?? "",
      description: company?.description ?? "",
      types: company?.types ?? ["BARBER"],
    },
  });

  const { mutateAsync: updateCompanyFn } = useMutation({
    mutationFn: updateCompanyService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company"] });
    },
  });

  const handleSubmit: SubmitHandler<
    CompanyProfileTypeSchema
  > = async values => {
    try {
      await updateCompanyFn({ id: company?.id as string, ...values });

      toast.success("Estabelecimento atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error(
        "Ocorreu um erro ao tentar atualizar o seu estabelecimento, se o problema persistir entre em contato com o suporte.",
      );
    }
  };

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
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <FormControl>
                  <Input id="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            name="types"
            control={form.control}
            render={({ field: { value, ...rest } }) => (
              <FormItem>
                <FormControl>
                  <MultiSelect options={options} selected={value} {...rest} />
                </FormControl>
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
