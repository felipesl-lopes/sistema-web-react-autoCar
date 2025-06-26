import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ContainerComponent } from "../../components/Container";
import { Spacer } from "../../components/spacer";
import {
  ButtonSearch,
  ContainerSearch,
  InputSearch,
  Title,
} from "../home/styled";
import { Container, DivResult, TextResult } from "./styled";
import { ICarList } from "../../interface";
import axiosService from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";
import CarList from "../../components/lists/carList";

const Search: React.FunctionComponent = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("carro");
  const [inputCar, setInputCar] = useState(searchQuery ? searchQuery : "");
  const navigate = useNavigate();
  const [carList, setCarList] = useState<ICarList[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCars = async () => {
      // Se o input estiver vazio, remove o parâmetro de busca da URL
      // e exibe todos os veículos disponíveis.
      if (inputCar == "") {
        navigate(`/search`);
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
        return;
      }
      setCarList([]);

      await axiosService
        .get("/firestore/searchCar", { params: { inputCar: searchQuery } })
        .then(({ data }) => {
          let list = [] as ICarList[];
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

    fetchCars();
  }, [searchQuery, user]);

  /**
   * Função responsável por navegar para a tela de pesquisa de veículos,
   * adicionando o termo digitado no input como parâmetro na URL.
   *
   * - Se o input estiver vazio, será exibida a lista completa de veículos.
   * - Se houver um termo digitado, a tela de pesquisa usará o valor da query string (?carro=)
   *   para filtrar os resultados.
   *
   * Isso permite que a tela de pesquisa identifique o termo via URL
   * e realize a busca usando o hook useEffect.
   */
  const handleSearch = async () => {
    navigate(`/search?carro=${encodeURIComponent(inputCar)}`);
  };

  return (
    <ContainerComponent>
      <Container>
        <Spacer spacing={6} />

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

        <DivResult>
          {searchQuery ? (
            <TextResult style={{ display: searchQuery ? "inline" : "none" }}>
              Exibindo resultado de pesquisa para:{" "}
              <TextResult style={{ fontWeight: "bold", fontStyle: "italic" }}>
                {searchQuery}
              </TextResult>
            </TextResult>
          ) : (
            <TextResult>Exibindo todos os resultados</TextResult>
          )}
        </DivResult>

        <Spacer spacing={10} />

        <ContainerComponent>
          <CarList
            carList={carList}
            limit={6}
            messageListEmpty="Nenhum veículo foi encontrado."
          />

          <Spacer spacing={6} />
        </ContainerComponent>
      </Container>
    </ContainerComponent>
  );
};

export default Search;
