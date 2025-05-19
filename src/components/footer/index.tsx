import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { ContainerComponent } from "../Container";

const FooterComponent: React.FunctionComponent = () => {
  return (
    <ContainerComponent>
      <Header>
        <Divider />
        <Copyright>
          © 2025 AutoCar. Todos os direitos reservados. Desenvolvido por{" "}
          <a href="https://felipelopesdev.com.br" target="_blank">
            Felipe Lopes
          </a>
        </Copyright>
      </Header>
    </ContainerComponent>
  );
};

export default FooterComponent;

const Header = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  height: 100%;
  padding: ${theme.padding.p20} 0;
`;

const Divider = styled.div`
  width: 100%;
  height: 0.8px;
  display: flex;
  background-color: ${theme.colors.clearText};
  margin-bottom: 20px;
`;

const Copyright = styled.p`
  text-align: center;
  font-size: ${theme.fontSize.fs14};
`;
