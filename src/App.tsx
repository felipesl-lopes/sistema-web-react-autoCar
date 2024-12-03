import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import { router } from "./routes";

const App: React.FunctionComponent = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer autoClose={3000} />
    </AuthProvider>
  );
};

export default App;
