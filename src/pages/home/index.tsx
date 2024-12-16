import React, { useContext, useEffect, useState } from "react";
import { ContainerComponent } from "../../components/Container";
import CarList from "../../components/lists/carList";
import { Spacer } from "../../components/spacer";
import { AuthContext } from "../../contexts/AuthContext";
import { ICarList } from "../../interface";
import axiosService from "../../services/api";
import Sliders_Home from "./sliders-home";
import { ButtonSearch, ContainerSearch, InputSearch, Title } from "./styled";

const Home: React.FunctionComponent = () => {
  const [carList, setCarList] = useState<ICarList[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
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
            });
          }
        });
        setCarList(list);
      });
    })();
  }, [user]);

  return (
    <ContainerComponent>
      <div>
        <Sliders_Home />

        <Spacer spacing={6} />

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

      <Spacer spacing={6} />
    </ContainerComponent>
  );
};

export default Home;
