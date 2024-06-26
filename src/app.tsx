import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function App() {
  return (
    <ThemeProvider>
      <Toaster richColors />

      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen />

        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
