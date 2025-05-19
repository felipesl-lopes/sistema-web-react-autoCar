import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import FooterComponent from "../footer";
import HeaderComponent from "../header";
import HeaderProfileComponent from "../headerProfile";

const LayoutComponent: React.FunctionComponent = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <LayoutContainer>
      <HeaderComponent />

      {isDashboardRoute && <HeaderProfileComponent />}

      <MainContent>
        <Outlet />
      </MainContent>

      <FooterComponent />
    </LayoutContainer>
  );
};

export default LayoutComponent;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;
