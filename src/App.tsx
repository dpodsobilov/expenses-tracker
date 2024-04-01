import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ru } from "date-fns/locale";
import { ruRU } from "@mui/x-date-pickers/locales";
import { createTheme, ThemeProvider } from "@mui/material";

import AppLayout from "./ui/AppLayout/AppLayout";
import Error from "./ui/Error/Error";

import { ProtectedRoute } from "./pages/ProtectedRoute";
import { Login } from "./pages/Login";
import { Profile } from "./features/user/Profile";
import { Home } from "./pages/Home";
import { CreateExpanse } from "./pages/CreateExpanse";
import { Register } from "./pages/Register";

const theme = createTheme({}, ruRU);

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
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ru}
            >
              <Profile />
            </LocalizationProvider>
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
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
