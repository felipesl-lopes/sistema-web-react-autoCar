import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SpinnerLoading } from "../../spinnerLoading";
import { ICarList } from "../../../interface";

interface IProps {
  carList: ICarList[];
}

const CarList: React.FunctionComponent<IProps> = ({ carList }) => {
  const [load, setLoad] = useState(true);

  const handleImageLoad = () => {
    setLoad(false);
  };

  return (
    <Main>
      {carList.map((car) => (
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
              src={car.images[0].url}
              alt="Imagem carro"
              onLoad={handleImageLoad}
            />

            <ContainerInfo>
              <NameCar>{car.name}</NameCar>
              <Description>
                Ano {car.year} | {car.km} km
              </Description>
              <Price>
                R$
                {parseFloat(car.price).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </Price>
              <Divider />
              <Locality>{car.city}</Locality>
            </ContainerInfo>
          </Section>
        </Link>
      ))}
    </Main>
  );
};

export default CarList;

export const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  background-color: #fff;
  padding: 12px;
  border-radius: 4px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Section = styled.section`
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
`;

const ImgCar = styled.img`
  width: 100%;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
`;

const ContainerInfo = styled.div`
  padding: 12px;
`;

const NameCar = styled.strong`
  margin-bottom: 8px;
  display: inline-table;
`;

const Description = styled.p`
  color: #999;
  margin-bottom: 8px;
  font-size: 0.8em;
`;

const Price = styled.h3`
  margin-bottom: 12px;
  font-size: 1.1em;
`;

const Divider = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  margin: 8px 0;
`;

const Locality = styled.p`
  margin-bottom: 4px;
  color: #999;
  font-size: 0.8em;
  font-weight: bold;
`;
