import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-autocar.png";

export const HeaderAuth: React.FunctionComponent = () => {
  return (
    <ContainerHeader>
      <Header>
        <Link to={"/"}>
          <Logo src={logo} alt="Logo" />
        </Link>
      </Header>
    </ContainerHeader>
  );
};

const ContainerHeader = styled.div`
  background-color: #0f081e;
  padding: 6px 12px;
  box-shadow: 0 0 4px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Logo = styled.img`
  display: flex;
  width: 100px;
  aspect-ratio: 16 / 6;
  object-fit: contain;
`;
