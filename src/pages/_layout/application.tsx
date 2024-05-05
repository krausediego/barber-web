import { Header } from "@/components/header";
import { server } from "@/services/axios-request";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function ApplicationLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const interceptorId = server.interceptors.response.use(
      response => response,
      error => {
        if (isAxiosError(error)) {
          const status = error.response?.status;

          if (status === 401) {
            queryClient.clear();
            navigate("/sign-in", { replace: true });
          } else {
            throw error;
          }
        }
      },
    );

    return () => {
      server.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
