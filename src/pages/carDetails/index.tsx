import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { ContainerComponent } from "../../components/Container";
import { Spacer } from "../../components/spacer";
import { AuthContext } from "../../contexts/AuthContext";
import { ICar } from "../../interface";
import { firestore } from "../../services/firebase";
import {
  CallButton,
  ContainerAlign,
  Data,
  DivInfo,
  DivInfoBasic,
  DivInfoConditions,
  Main,
  Text,
  TextInfo,
  Title,
  TitleData,
} from "./styled";

const CarDetails: React.FunctionComponent = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [car, setCar] = useState<ICar | null>();

  useEffect(() => {
    (async () => {
      const carRef = doc(firestore, "cars", id as string);

      await getDoc(carRef).then((snapshot) => {
        console.log(snapshot.data());
        const doc = snapshot.data();
        setCar({
          city: doc?.city,
          created: doc?.created,
          description: doc?.description,
          km: doc?.km,
          model: doc?.model,
          name: doc?.name,
          owner: doc?.owner,
          price: doc?.price,
          uid: doc?.uid,
          whatsapp: doc?.whatsapp,
          year: doc?.year,
          imagens: doc?.images,
        });
      });
    })();
  }, [id]);

  // user.uid & car.uid
  // usar esses valores pra fazer verificações

  return (
    <ContainerComponent>
      <Title>Detalhes do veículo</Title>
      <Main>
        <DivInfo>
          <TextInfo>
            {car?.name} {car?.model}
          </TextInfo>
          <TextInfo>
            {" "}
            R$
            {parseFloat(car?.price as string).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </TextInfo>
        </DivInfo>

        <Spacer spacing={7} />

        <TitleData>Informações básicas:</TitleData>

        <DivInfoBasic>
          <ContainerAlign>
            <Text>Ano</Text>
            <Data>{car?.year}</Data>
          </ContainerAlign>

          <ContainerAlign>
            <Text>Quilometragem</Text>
            <Data>{car?.km}km</Data>
          </ContainerAlign>
        </DivInfoBasic>

        <Spacer spacing={7} />

        <TitleData>Especificações técnicas:</TitleData>

        <DivInfoBasic>
          <ContainerAlign>
            <Text>Motor</Text>
            <Data>2.0, 150 cv (fixo)</Data>
          </ContainerAlign>

          <ContainerAlign>
            <Text>Câmbio</Text>
            <Data>Manual (fixo)</Data>
          </ContainerAlign>

          <ContainerAlign>
            <Text>Combustível</Text>
            <Data>Gasolina (fixo)</Data>
          </ContainerAlign>
        </DivInfoBasic>

        <Spacer spacing={7} />

        <TitleData>Condições:</TitleData>

        <DivInfoConditions>
          <div>
            <Data>Estado geral:</Data>
            <Text>Sem detalhes, em ótimo estado.</Text>
          </div>

          <div>
            <Data>Revisões e Manutenções:</Data>
            <Text>Revisões em dia na concessionária.</Text>
          </div>

          <div>
            <Data>Documentação:</Data>
            <Text>IPVA 2024 pago, sem débitos.</Text>
          </div>
        </DivInfoConditions>

        <Spacer spacing={7} />

        <TitleData>Descrição:</TitleData>

        <ContainerAlign>
          <Text>{car?.description}</Text>
        </ContainerAlign>

        <Spacer spacing={7} />

        <TitleData>Contato:</TitleData>

        <DivInfoBasic>
          <ContainerAlign>
            <Text>Localização</Text>
            <Data>{car?.city}</Data>
          </ContainerAlign>

          <ContainerAlign>
            <Text>Contato</Text>
            <Data>{car?.whatsapp}</Data>
          </ContainerAlign>
        </DivInfoBasic>

        <Spacer spacing={10} />

        <CallButton>
          Conversar com o vendedor
          <FaWhatsapp />
        </CallButton>
      </Main>

      <Spacer spacing={15} />
    </ContainerComponent>
  );
};

export default CarDetails;
