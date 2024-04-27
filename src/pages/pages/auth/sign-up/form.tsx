import { useFormContext } from "react-hook-form";
import { SignUpTypeSchema } from "./schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function SignUpForm() {
  const form = useFormContext<SignUpTypeSchema>();

  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormControl>
              <Input
                id="email"
                {...field}
                placeholder="fulano@gmail.com"
                type="email"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <FormControl>
              <Input
                id="password"
                {...field}
                placeholder="********"
                type="password"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="repeatPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="repeatPassword">Repita a senha</FormLabel>
            <FormControl>
              <Input
                id="repeatPassword"
                {...field}
                placeholder="********"
                type="password"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
