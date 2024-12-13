import React, { useEffect, useState } from "react";
import { ContainerComponent } from "../../components/Container";
import CarList from "../../components/lists/carList";
import { Spacer } from "../../components/spacer";
import { ICarList } from "../../interface";
import axiosService from "../../services/api";
import Sliders_Home from "./sliders-home";
import { ButtonSearch, ContainerSearch, InputSearch, Title } from "./styled";

const Home: React.FunctionComponent = () => {
  const [carList, setCarList] = useState<ICarList[]>([]);

  useEffect(() => {
    (async () => {
      await axiosService.get("/firestore/carList").then(({ data }) => {
        let list = [] as ICarList[];
        setCarList([]);
        data.forEach((doc: ICarList) => {
          list.push({
            uid: doc.uid,
            id: doc.id,
            name: doc.name,
            year: doc.year,
            price: doc.price,
            city: doc.city,
            km: doc.km,
            images: doc.images,
          });
        });
        setCarList(list);
      });
    })();
  }, []);

  return (
    <ContainerComponent>
      <div>
        <Sliders_Home />
        <ContainerSearch>
          <InputSearch placeholder="Escreva a marca ou modelo do carro" />
          <ButtonSearch>Pesquisar</ButtonSearch>
        </ContainerSearch>
      </div>

      <Spacer spacing={5} />

      <Title>Carros novos e usados em todo o Brasil</Title>

      <Spacer spacing={4} />

      <CarList
        carList={carList}
        messageListEmpty="Nenhum veículo para venda foi encontrado."
      />
    </ContainerComponent>
  );
};

export default Home;
