import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo-autocar.png";

const HeaderAuth: React.FunctionComponent = () => {
  return (
    <Container>
      <Header>
        <Link to={"/"}>
          <Logo src={logo} alt="Logo do site" />
        </Link>
      </Header>
    </Container>
  );
};

export default HeaderAuth;

const Container = styled.div`
  background-color: #0f081e;
  padding: 6px 12px;
  height: 56px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  height: 100%;
`;

const Logo = styled.img`
  display: flex;
  width: 100px;
  aspect-ratio: 16 / 6;
  object-fit: contain;
`;
