import React from "react";
import HeaderComponent from "../header";
import { Outlet, useLocation } from "react-router-dom";
import HeaderProfileComponent from "../headerProfile";

const LayoutComponent: React.FunctionComponent = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      <HeaderComponent />

      {isDashboardRoute && <HeaderProfileComponent />}

      <Outlet />
    </>
  );
};

export default LayoutComponent;
