import React, { useContext, useEffect, useState } from "react";
import { ContainerComponent } from "../../components/Container";
import CarList from "../../components/lists/carList";
import { Spacer } from "../../components/spacer";
import { AuthContext } from "../../contexts/AuthContext";
import { ICarList } from "../../interface";
import axiosService from "../../services/api";
import Sliders_Home from "./sliders-home";
import {
  ButtonSearch,
  ContainerHome,
  ContainerSearch,
  InputSearch,
  TextResult,
  Title,
} from "./styled";

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
      <div>
        <Sliders_Home />

        <Spacer spacing={6} />

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
      </div>

      <Spacer spacing={10} />

      <TextResult>
        {oldInputCar
          ? `Exibindo resultado de pesquisa para: ${oldInputCar}`
          : `Todos os resultados:`}
      </TextResult>

      <Spacer spacing={10} />

      <ContainerComponent>
        <CarList
          carList={carList}
          messageListEmpty="Nenhum veículo para venda foi encontrado."
        />

        <Spacer spacing={6} />
      </ContainerComponent>
    </ContainerHome>
  );
};

export default Home;
