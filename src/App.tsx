import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./ui/AppLayout/AppLayout";
import Error from "./ui/Error/Error";

import { ProtectedRoute } from "./pages/ProtectedRoute";
import { Login } from "./pages/Login/Login";
import { Profile } from "./features/user/Profile/Profile";
import { Home } from "./pages/Home/Home";
import { CreateExpanse } from "./pages/CreateExpanse";
import { Register } from "./pages/Register/Register";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/expense/new",
        element: (
          <ProtectedRoute>
            <CreateExpanse />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
