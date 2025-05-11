import React from "react";
import styled from "styled-components";

const QuickFilterComponent: React.FunctionComponent = () => {
  const categories = [
    "Carros novos",
    "Seminovos",
    "Até 50 mil",
    "SUVs",
    "Sedans",
    "Hatch",
    "Toyota",
    "Fiat",
  ];

  return (
    <Container>
      <Title>Ou pesquise veículos por categoria</Title>
      <CardContainer>
        {categories.map((item, index) => (
          <Card key={index}>{item}</Card>
        ))}
      </CardContainer>
    </Container>
  );
};

export default QuickFilterComponent;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h4`
  margin-bottom: 12px;
  text-align: center;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  max-width: 100%;
`;

const Card = styled.div`
  background-color: #ffebcdc2;
  padding: 8px 10px;
  border-radius: 16px;
  margin: 4px;
  border: solid 1px #282828;
  cursor: pointer;
  color: #1f1f1f;
  font-size: 15px;
  text-align: center;
  flex-shrink: 0;
`;
