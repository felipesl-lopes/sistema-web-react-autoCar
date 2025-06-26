import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerComponent } from "../../components/Container";
import CarList from "../../components/lists/carList";
import { Spacer } from "../../components/spacer";
import { AuthContext } from "../../contexts/AuthContext";
import { ICarList } from "../../interface";
import axiosService from "../../services/api";
import CarAdButtonComponent from "./CarAdButtonComponent";
import CarPurchaseTips from "./CarPurchaseTips";
import InfoBarComponent from "./InfoBarComponent";
import QuickFilterComponent from "./QuickFilterComponent";
import Sliders_Home from "./sliders-home";
import {
  ButtonSearch,
  ContainerHome,
  ContainerSearch,
  ContainerWrapper,
  InputSearch,
  Title,
} from "./styled";
import WhyChooseUsComponent from "./WhyChooseUsComponent";

const Home: React.FunctionComponent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [carList, setCarList] = useState<ICarList[]>([]);
  const [inputCar, setInputCar] = useState("");

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
              model: doc.model,
            });
          }
        });
        setCarList(list);
      });
    })();
  }, [user]);

  /**
   * Função responsável por navegar para a tela de pesquisa,
   * incluindo o termo digitado no input como parâmetro na URL (query string).
   *
   * Isso permite que a tela de pesquisa capture o termo via React Router
   * e realize a busca correspondente.
   */
  const handleSearch = () => {
    navigate(`/search?carro=${encodeURIComponent(inputCar)}`);
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
          }}
        >
          <InputSearch
            placeholder="Escreva a marca ou modelo do carro"
            value={inputCar}
            onChange={(e) => setInputCar(e.target.value)}
          />
          <ButtonSearch onClick={handleSearch}>Pesquisar</ButtonSearch>
        </ContainerSearch>

        <Spacer spacing={10} />

        <ContainerComponent>
          <CarList
            carList={carList}
            limit={6}
            messageListEmpty="Nenhum veículo foi encontrado."
          />

          <Spacer spacing={6} />
        </ContainerComponent>
      </ContainerWrapper>

      <Spacer spacing={10} />

      <CarAdButtonComponent />

      <Spacer spacing={10} />

      <WhyChooseUsComponent />

      <Spacer spacing={10} />

      <QuickFilterComponent />

      <Spacer spacing={10} />

      <CarPurchaseTips />

      <Spacer spacing={10} />

      <InfoBarComponent />
    </ContainerHome>
  );
};

export default Home;
