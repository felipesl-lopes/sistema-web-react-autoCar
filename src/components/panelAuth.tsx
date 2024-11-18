import React from "react";
import styled from "styled-components";

export const PanelAuth: React.FunctionComponent = () => {
  return (
    <Panel>
      <Title>Bem-vindo ao AutoCar!</Title>
      <Subtitle>
        Encontre uma grande variedade de carros novos e usados, com detalhes e
        ofertas exclusivas para ajudar você a fazer a melhor escolha.
      </Subtitle>

      <strong>Descubra:</strong>
      <ul>
        <li>- Ofertas exclusivas para você</li>
        <li>- Avaliações e detalhes completos dos veículos</li>
        <li>- Segurança e confiança nas transações</li>
      </ul>
    </Panel>
  );
};

const Panel = styled.div`
  padding: 16px;
  width: 40%;
  max-width: 620px;

  strong,
  li {
    color: #888;
    font-size: 15px;
    list-style-type: none;
    font-weight: 500;
  }

  h1 {
    @media (max-width: 450px) {
      font-size: 20px;
    }
  }

  @media (max-width: 800px) {
    width: 100%;
    margin: 0 auto;
    padding: 0 0 20px;
  }
`;

const Title = styled.h1`
  margin-bottom: 12px;
  font-size: 1.6rem;

  @media (max-width: 450px) {
    font-size: 24px;
  }
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #555;
  margin-bottom: 40px;

  @media (max-width: 800px) {
    margin-bottom: 12px;
  }
`;
