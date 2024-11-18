import React from "react";
import { ContainerComponent } from "../../components/Container";
import { Spacer } from "../../components/spacer";
import {
  ButtonSearch,
  ContainerInfo,
  ContainerSearch,
  Description,
  Divider,
  ImgCar,
  InputSearch,
  Locality,
  Main,
  NameCar,
  Price,
  Section,
  Title,
} from "./styled";

const Home: React.FunctionComponent = () => {
  return (
    <ContainerComponent>
      <Spacer spacing={6} />

      <ContainerSearch>
        <InputSearch placeholder="Escreva a marca ou modelo do carro" />
        <ButtonSearch>Pesquisar</ButtonSearch>
      </ContainerSearch>

      <Spacer spacing={5} />

      <Title>Carros novos e usados em todo o Brasil</Title>

      <Spacer spacing={4} />

      <Main>
        <Section>
          <ImgCar
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Fiat_Strada_2020_Volcano_in_Montevideo_%28front%29.jpg/800px-Fiat_Strada_2020_Volcano_in_Montevideo_%28front%29.jpg"
            alt="Imagem carro"
          />

          <ContainerInfo>
            <NameCar>Fiat Strada</NameCar>
            <Description>Ano 2019 | 38.000 km</Description>
            <Price>R$68.900,00</Price>
            <Divider />
            <Locality>Nova Iguaçu, RJ</Locality>
          </ContainerInfo>
        </Section>

        <Section>
          <ImgCar
            src="https://cdn.motor1.com/images/mgl/0eVXr9/s1/vw-polo-mpi-2023.jpg"
            alt="Imagem carro"
          />

          <ContainerInfo>
            <NameCar>Volkswagen Polo</NameCar>
            <Description>Ano 2021 | 20.000 km</Description>
            <Price>R$44.500,00</Price>
            <Divider />
            <Locality>Niterói, RJ</Locality>
          </ContainerInfo>
        </Section>

        <Section>
          <ImgCar
            src="https://www.autocerto.com/fotos/2041/1331649/1.jpg"
            alt="Imagem carro"
          />

          <ContainerInfo>
            <NameCar>Chevrolet Onix</NameCar>
            <Description>Ano 2018 | 00 km</Description>
            <Price>R$98.300,00</Price>
            <Divider />
            <Locality>Campinas, SP</Locality>
          </ContainerInfo>
        </Section>
      </Main>
    </ContainerComponent>
  );
};

export default Home;
