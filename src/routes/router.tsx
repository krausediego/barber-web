import { AuthLayout } from "@/pages/_layout/auth";
import { AuthSignInPage, AuthSignUpPage } from "@/pages/pages/auth";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
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
