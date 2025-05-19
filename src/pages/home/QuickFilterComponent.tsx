import React from "react";
import styled from "styled-components";
import { ContainerComponent } from "../../components/Container";
import { Spacer } from "../../components/spacer";
import theme from "../../styles/theme";

const QuickFilterComponent: React.FunctionComponent = () => {
  const categories = [
    "Carros novos",
    "Seminovos",
    "Até 50 mil",
    "SUVs",
    "Sedans",
    "Toyota",
  ];

  return (
    <ContainerComponent>
      <Container>
        <Title>Pesquise veículos por categoria</Title>
        <Spacer spacing={6} />
        <CardContainer>
          {categories.map((item, index) => (
            <Card key={index}>{item}</Card>
          ))}
        </CardContainer>
      </Container>
    </ContainerComponent>
  );
};

export default QuickFilterComponent;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-bottom: ${theme.pixels.px12};
  text-align: center;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${theme.pixels.px8};
  max-width: 100%;
`;

// const Card = styled.div`
//   background-color: ${theme.colors.golden};
//   padding: ${theme.pixels.px8} ${theme.pixels.px16};
//   border-radius: 16px;
//   margin: ${theme.pixels.px4};
//   cursor: pointer;
//   color: ${theme.colors.white};
//   font-size: ${theme.fontSize.fs16};
//   text-align: center;
//   flex-shrink: 0;
// `;

const Card = styled.div`
  background-color: ${theme.colors.golden};
  padding: ${theme.pixels.px12} ${theme.pixels.px20};
  border-radius: ${theme.borderRadius.radius16};
  margin: ${theme.pixels.px4};
  cursor: pointer;
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.fs18};
  text-align: center;
  flex-shrink: 0;

  width: 150px; /* largura fixa */
  height: 52px; /* altura opcional para uniformizar verticalmente */
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${theme.colors.buttonHover};
  }
`;
