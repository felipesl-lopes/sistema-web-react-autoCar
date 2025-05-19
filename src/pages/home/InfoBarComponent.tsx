import styled from "styled-components";
import React from "react";
import { ContainerComponent } from "../../components/Container";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import theme from "../../styles/theme";

const InfoBarComponent: React.FunctionComponent = () => {
  return (
    <ContainerComponent>
      <Container>
        <Divider />
        <LinksContainer>
          <Section>
            <SectionTitle>Contato</SectionTitle>
            <Item style={{ cursor: "default", textDecoration: "none" }}>
              Email: contato@felipelopesdev.com.br
            </Item>
            <Item style={{ cursor: "default", textDecoration: "none" }}>
              Telefone: (21) 97073-3224
            </Item>
          </Section>

          <Section>
            <SectionTitle>Links úteis</SectionTitle>
            <Item>Política de Privacidade</Item>
            <Item>Política de Cookies</Item>
            <Item>Fale Conosco</Item>
            <Item>Termos de Uso</Item>
            <Item>Sobre Nós</Item>
            <Item>Trabalhe Conosco</Item>
            <Item>Ajuda / Suporte</Item>
            <Item>Blog / Novidades</Item>
          </Section>

          <Section>
            <SectionTitle>Redes Sociais</SectionTitle>
            <SocialIcons>
              <a href="#" target="_blank">
                <FaInstagram />
              </a>
              <a href="#" target="_blank">
                <FaWhatsapp />
              </a>
              <a href="#" target="_blank">
                <FaLinkedin />
              </a>
              <a href="#" target="_blank">
                <FaGithub />
              </a>
              <a href="#" target="_blank">
                <FaTelegram />
              </a>
            </SocialIcons>
          </Section>
        </LinksContainer>
      </Container>
    </ContainerComponent>
  );
};

export default InfoBarComponent;

const Container = styled.div`
  padding: 20px;
`;

const Divider = styled.div`
  width: 100%;
  height: 0.8px;
  display: flex;
  background-color: ${theme.colors.clearText};
  margin-bottom: 20px;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-between;
  margin: auto;
`;

const Section = styled.div`
  min-width: 200px;
`;

const SectionTitle = styled.h4`
  font-size: 18px;
  margin-bottom: 12px;
`;

const Item = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 12px;

  a {
    font-size: 20px;
    color: #333;

    &:hover {
      color: #000;
    }
  }
`;
