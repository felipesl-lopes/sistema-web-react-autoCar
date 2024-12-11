import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ContainerComponent } from "../../components/Container";
import CarList from "../../components/lists/carList";
import { Spacer } from "../../components/spacer";
import { ICarList } from "../../interface";
import { firestore } from "../../services/firebase";
import Sliders_Home from "./sliders-home";
import { ButtonSearch, ContainerSearch, InputSearch, Title } from "./styled";

const Home: React.FunctionComponent = () => {
  const [carList, setCarList] = useState<ICarList[]>([]);

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

      <CarList carList={carList} />
    </ContainerComponent>
  );
};

export default Home;
