import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

export const PanelAuth: React.FunctionComponent = () => {
  return (
    <Panel>
      <Title>Bem-vindo ao AutoCar!</Title>
      <Subtitle>
        Encontre uma grande variedade de carros novos e usados, com detalhes e
        ofertas exclusivas para ajudar você a fazer a melhor escolha.
      </Subtitle>

      <div>
        <strong>Descubra:</strong>
        <ul>
          <li>- Ofertas exclusivas para você</li>
          <li>- Avaliações e detalhes completos dos veículos</li>
          <li>- Segurança e confiança nas transações</li>
        </ul>
      </div>
    </Panel>
  );
};

const Panel = styled.div`
  padding: ${theme.padding.p16};
  width: 40%;
  max-width: 620px;

  strong,
  li {
    color: ${theme.colors.gray};
    font-size: ${theme.fontSize.fs14};
    list-style-type: none;
    font-weight: 500;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

const Title = styled.h1`
  margin-bottom: ${theme.padding.p12};
  font-size: 1.6rem;
  color: ${theme.colors.golden};
`;

const Subtitle = styled.p`
  font-size: ${theme.fontSize.fs16};
  color: ${theme.colors.darkText};
  margin-bottom: ${theme.pixels.px40};
`;
