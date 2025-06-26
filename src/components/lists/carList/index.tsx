import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ICarList } from "../../../interface";
import theme from "../../../styles/theme";
import { SpinnerLoading } from "../../spinnerLoading";

interface IProps {
  carList: ICarList[];
  messageListEmpty: string;
  limit?: number;
}

/**
 * Componente responsável por exibir a lista de carros.
 *
 * Props:
 * - carList: Lista de veículos a serem exibidos.
 * - messageListEmpty: Mensagem mostrada quando a lista estiver vazia.
 * - limit (opcional): Número máximo de itens a serem exibidos.
 */
const CarList: React.FunctionComponent<IProps> = ({
  carList,
  messageListEmpty,
  limit,
}) => {
  const [load, setLoad] = useState(true);

  const handleImageLoad = () => {
    setLoad(false);
  };

  return (
    <>
      {carList.length == 0 ? (
        <Main style={{ display: "flex", justifyContent: "center" }}>
          <MessageEmpty style={{ margin: theme.pixels.px40 }}>
            {messageListEmpty}
          </MessageEmpty>
        </Main>
      ) : (
        <Main>
          {carList.slice(0, limit ?? carList.length).map((car) => (
            <Link
              to={`/car/${car.id}`}
              key={car.id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Section>
                <div
                  style={{
                    display: load ? "flex" : "none",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    aspectRatio: 16 / 9,
                  }}
                >
                  <SpinnerLoading size={32} />
                </div>
                <ImgCar
                  style={{ display: load ? "none" : "flex" }}
                  src={car.images}
                  alt="Imagem carro"
                  onLoad={handleImageLoad}
                />

                <ContainerInfo>
                  <NameCar>
                    {car.name} {car.model}
                  </NameCar>
                  <Description>
                    Ano {car.year} | {car.km} km
                  </Description>
                  <Price>R${car.price}</Price>
                  <Divider />
                  <Locality>
                    {car.city}, {car.uf}
                  </Locality>
                </ContainerInfo>
              </Section>
            </Link>
          ))}
        </Main>
      )}
    </>
  );
};

export default CarList;

export const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.pixels.px20};
  background-color: ${theme.colors.white};
  padding: ${theme.pixels.px12};
  border-radius: ${theme.pixels.px4};
  box-shadow: ${theme.pixels.px0} ${theme.pixels.px4} ${theme.pixels.px8}
    rgba(0, 0, 0, 0.05);

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Section = styled.section`
  background-color: ${theme.colors.backgroundSecondary};
  display: flex;
  flex-direction: column;
  border-radius: ${theme.pixels.px4};
  overflow: hidden;
`;

const ImgCar = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
  border-top-right-radius: ${theme.pixels.px4};
  border-top-left-radius: ${theme.pixels.px4};
  aspect-ratio: 16 / 9;
  object-fit: cover;
  overflow: hidden;
`;

const ContainerInfo = styled.div`
  padding: ${theme.pixels.px12};
`;

const NameCar = styled.strong`
  margin-bottom: ${theme.pixels.px8};
  display: inline-table;
`;

const Description = styled.p`
  color: ${theme.colors.darkText};
  margin-bottom: ${theme.pixels.px8};
  font-size: 0.9em;
`;

const Price = styled.h3`
  margin-bottom: ${theme.pixels.px12};
  font-size: 1.3em;
  color: ${theme.colors.buttonHover};
`;

const Divider = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  margin: ${theme.pixels.px8} 0;
`;

const Locality = styled.p`
  margin-bottom: ${theme.pixels.px4};
  color: ${theme.colors.darkText};
  font-size: 0.8em;
  font-weight: bold;
`;

const MessageEmpty = styled.p`
  text-align: center;
  margin: ${theme.pixels.px12};
  margin-top: ${theme.pixels.px40};
`;
