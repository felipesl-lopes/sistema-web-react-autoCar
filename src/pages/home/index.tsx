import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContainerComponent } from "../../components/Container";
import { Spacer } from "../../components/spacer";
import { SpinnerLoading } from "../../components/spinnerLoading";
import { ICarList } from "../../interface";
import { firestore } from "../../services/firebase";
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
import { AuthContext } from "../../contexts/AuthContext";

const Home: React.FunctionComponent = () => {
  const [carList, setCarList] = useState<ICarList[]>([]);
  const [load, setLoad] = useState(true);
  const { emailVerified, signed } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const carRef = collection(firestore, "cars");
      const queryRef = query(carRef, orderBy("created", "desc"));

      getDocs(queryRef).then((snapshot) => {
        let list = [] as ICarList[];
        setCarList([]);
        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            name: doc.data().name,
            year: doc.data().year,
            uid: doc.data().uid,
            price: doc.data().price,
            city: doc.data().city,
            km: doc.data().km,
            images: doc.data().images,
          });
        });

        setCarList(list);
      });
    })();
  }, []);

  const handleImageLoad = () => {
    setLoad(false);
  };

  console.log(emailVerified);
  console.log(signed);

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
