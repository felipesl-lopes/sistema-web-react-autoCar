import { createBrowserRouter } from "react-router-dom";
import LayoutComponent from "../components/layout";
import Login from "../pages/authentication/login";
import RecoverPassword from "../pages/authentication/recoverPassword";
import Register from "../pages/authentication/register";
import CheckEmail from "../pages/authentication/verificarEmail";
import CarDetails from "../pages/carDetails";
import Dashboard from "../pages/dashboard";
import { MyVehicles } from "../pages/dashboard/myVehicles";
import New from "../pages/dashboard/new";
import Home from "../pages/home";
import { Private } from "./Private";

const router = createBrowserRouter([
  {
    element: <LayoutComponent />,
    // Rotas do header superior
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/car/:id",
        element: <CarDetails />,
      },

      // Rotas do header inferior
      {
        path: "/dashboard",
        element: (
          <Private>
            <Dashboard />
          </Private>
        ),
      },
      {
        path: "/dashboard/new",
        element: (
          <Private>
            <New />
          </Private>
        ),
      },
      {
        path: "/dashboard/meus-veiculos",
        element: (
          <Private>
            <MyVehicles />
          </Private>
        ),
      },
    ],
  },

  // Rotas sem header
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/recoverPassword",
    element: <RecoverPassword />,
  },
  {
    path: "/verificar-email",
    element: <CheckEmail />,
  },
]);

export { router };
