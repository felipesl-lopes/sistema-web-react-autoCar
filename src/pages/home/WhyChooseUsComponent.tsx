import React from "react";
import { IoMdCar, IoMdCheckmark, IoMdEye, IoMdFlash } from "react-icons/io";
import styled from "styled-components";
import { Spacer } from "../../components/spacer";

const WhyChooseUsComponent: React.FunctionComponent = () => {
  return (
    <Container>
      <Title>Por que comprar ou vender pelo Autocar?</Title>
      <Spacer spacing={6} />

      <ContainerBox>
        <Box>
          <IoMdEye />
          <TitleBox>Mais visibilidade</TitleBox>
          <TextBox>
            Seu veículo é exibido para milhares de compradores em potencial
            todos os dias.
          </TextBox>
        </Box>

        <Box>
          <IoMdFlash />
          <TitleBox>Fácil de usar</TitleBox>
          <TextBox>
            Anuncie em poucos passos e encontre veículos com filtros
            inteligentes.
          </TextBox>
        </Box>

        <Box>
          <IoMdCheckmark />
          <TitleBox>Negociações seguras</TitleBox>
          <TextBox>
            Conectamos compradores e vendedores sem intermediários e com
            segurança.
          </TextBox>
        </Box>

        <Box>
          <IoMdCar />
          <TitleBox>Variedades</TitleBox>
          <TextBox>
            Desde carros populares até modelos premium — tudo em um só lugar.
          </TextBox>
        </Box>
      </ContainerBox>
    </Container>
  );
};

export default WhyChooseUsComponent;

const Container = styled.div`
  background-color: #ffebc0;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;

const Title = styled.h1``;

const ContainerBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  width: 100%;
  max-width: 1200px;
`;

const Box = styled.div`
  flex: 1 1 250px;
  max-width: 270px;
  padding: 20px;
  text-align: center;

  svg {
    background-color: #ff6600;
    border-radius: 8px;
    color: white;
    padding: 12px;
    font-size: 50px;
    margin-bottom: 12px;
  }
`;

const TitleBox = styled.h3`
  margin-bottom: 4px;
`;

const TextBox = styled.p``;
