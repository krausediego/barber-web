import { ApplicationLayout } from "@/pages/_layout/application";
import { AuthLayout } from "@/pages/_layout/auth";
import { DashboardPage } from "@/pages/pages/application";
import { AuthSignInPage, AuthSignUpPage } from "@/pages/pages/auth";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ApplicationLayout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <AuthSignInPage />,
      },
      {
        path: "/sign-up",
        element: <AuthSignUpPage />,
      },
    ],
  },
]);
