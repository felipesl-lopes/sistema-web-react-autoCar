import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import { router } from "./routes";
import { register } from "swiper/element/bundle";

register();
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import GlobalStyle from "./globalStyles/createGlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

const App: React.FunctionComponent = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
        <ToastContainer autoClose={3000} />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
