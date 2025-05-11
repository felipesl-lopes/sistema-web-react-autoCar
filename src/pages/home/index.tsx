import React, { useContext, useEffect, useState } from "react";
import { ContainerComponent } from "../../components/Container";
import CarList from "../../components/lists/carList";
import { Spacer } from "../../components/spacer";
import { AuthContext } from "../../contexts/AuthContext";
import { ICarList } from "../../interface";
import axiosService from "../../services/api";
import CarAdButtonComponent from "./CarAdButtonComponent";
import QuickFilterComponent from "./QuickFilterComponent";
import Sliders_Home from "./sliders-home";
import {
  ButtonSearch,
  ContainerHome,
  ContainerSearch,
  ContainerWrapper,
  InputSearch,
  TextResult,
  Title,
} from "./styled";
import WhyChooseUsComponent from "./WhyChooseUsComponent";

const Home: React.FunctionComponent = () => {
  const [carList, setCarList] = useState<ICarList[]>([]);
  const { user } = useContext(AuthContext);
  const [inputCar, setInputCar] = useState("");
  const [oldInputCar, setOldInputCar] = useState("");

  useEffect(() => {
    loadCarList();
  }, []);

  const loadCarList = async () => {
    await axiosService.get("/firestore/carList").then(({ data }) => {
      let list = [] as ICarList[];
      setCarList([]);
      data.forEach((doc: ICarList) => {
        if (user?.uid !== doc.uidUser) {
          list.push({
            uidUser: doc.uidUser,
            id: doc.id,
            name: doc.name,
            year: doc.year,
            price: doc.price,
            city: doc.city,
            uf: doc.uf,
            km: doc.km,
            images: doc.images,
            model: doc.model,
          });
        }
      });
      setCarList(list);
    });
  };

  const searchCarList = async () => {
    setOldInputCar(inputCar);

    if (oldInputCar == inputCar) {
      return;
    }

    if (inputCar == "") {
      await loadCarList();
      return;
    }

    setCarList([]);

    await axiosService
      .get("/firestore/searchCar", { params: { inputCar } })
      .then(({ data }) => {
        let list = [] as ICarList[];
        setCarList([]);
        data.forEach((doc: ICarList) => {
          if (user?.uid !== doc.uidUser) {
            list.push({
              uidUser: doc.uidUser,
              id: doc.id,
              name: doc.name,
              year: doc.year,
              price: doc.price,
              city: doc.city,
              uf: doc.uf,
              km: doc.km,
              images: doc.images,
              model: doc.model,
            });
          }
        });
        setCarList(list);
      });
  };

  return (
    <ContainerHome>
      <Sliders_Home />

      <Spacer spacing={6} />

      <ContainerWrapper>
        <Title>Carros novos e usados em todo o Brasil</Title>

        <Spacer spacing={4} />

        <ContainerSearch
          onClick={(e) => {
            e.preventDefault();
            searchCarList();
          }}
        >
          <InputSearch
            placeholder="Escreva a marca ou modelo do carro"
            value={inputCar}
            onChange={(e) => setInputCar(e.target.value)}
          />
          <ButtonSearch>Pesquisar</ButtonSearch>
        </ContainerSearch>

        <Spacer spacing={8} />

        <QuickFilterComponent />

        <Spacer spacing={10} />

        <TextResult>
          {oldInputCar
            ? `Exibindo resultado de pesquisa para: ${oldInputCar}`
            : `Resultados:`}
        </TextResult>

        <Spacer spacing={6} />

        <ContainerComponent>
          <CarList
            carList={carList}
            messageListEmpty="Nenhum veículo para venda foi encontrado."
          />

          <Spacer spacing={6} />
        </ContainerComponent>
      </ContainerWrapper>

      <Spacer spacing={10} />

      <CarAdButtonComponent />

      <Spacer spacing={10} />

      <WhyChooseUsComponent />

      <Spacer spacing={20} />
    </ContainerHome>
  );
};

export default Home;
