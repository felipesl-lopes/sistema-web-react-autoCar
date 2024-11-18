import React from "react";
import HeaderComponent from "../header";
import { Outlet } from "react-router-dom";

const LayoutComponent: React.FunctionComponent = () => {
  return (
    <>
      <HeaderComponent />
      <Outlet />
    </>
  );
};

export default LayoutComponent;
