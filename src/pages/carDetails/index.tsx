import React, { useContext, useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { ContainerComponent } from "../../components/Container";
import { Spacer } from "../../components/spacer";
import { SpinnerLoading } from "../../components/spinnerLoading";
import { AuthContext } from "../../contexts/AuthContext";
import { ICar } from "../../interface";
import axiosService from "../../services/api";
import {
  CallButton,
  ContainerAlign,
  Data,
  DivInfo,
  DivInfoBasic,
  DivInfoConditions,
  Main,
  SliderCar,
  Text,
  TextInfo,
  Title,
  TitleData,
} from "./styled";

const CarDetails: React.FunctionComponent = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [car, setCar] = useState<ICar | null>();
  const [sliderPerview, setSliderPerview] = useState<number>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  /**
   * Função assíncrona para buscar dados da venda no DB.
   */
  useEffect(() => {
    (async () => {
      await axiosService
        .get(`/firestore/carDetails/${id}`)
        .then(async ({ data }) => {
          setCar({
            city: data?.city,
            created: data?.created,
            description: data?.description,
            km: data?.km,
            model: data?.model,
            name: data?.name,
            owner: data?.owner,
            price: data?.price,
            uidUser: data?.uidUser,
            whatsapp: data?.whatsapp,
            year: data?.year,
            images: data?.images,
          });
          setSliderPerview(data?.images.length as number);
        })
        .catch(() => {
          navigate("/");
        })
        .finally(() => {
          setLoading(false);
        });
    })();
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 680) {
        setSliderPerview(1);
      } else {
        setSliderPerview(car?.images.length);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [car?.images.length]);

  const whatsappLink = (car: ICar) => {
    if (!car?.whatsapp || !car?.name) return "#"; // Retorna um link vazio se dados estiverem ausentes
    const num = car?.whatsapp.replace(/\D/g, "");
    const baseURL = "https://wa.me/55";
    const message = `Olá, vi esse ${car.name} ${car.model} no site AutoCar e fiquei com interesse!`;
    const encodedMessage = encodeURIComponent(message);

    return `${baseURL}${num}?text=${encodedMessage}`;
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "10% auto",
        }}
      >
        <SpinnerLoading size={40} />
      </div>
    );
  }

  /**
   * Função para excluir o veículo a venda.
   */
  const removeVehicle = () => {
    const confirm = window.confirm("Você deseja realmente excluir o veículo?");

    if (confirm) {
      toast.success("Excluir veículo");
    }
  };

  return (
    <ContainerComponent>
      <Spacer spacing={4} />
      <Title>Detalhes do veículo</Title>
      <Spacer spacing={4} />

      <Swiper
        slidesPerView={Math.min(sliderPerview as number, 3)}
        pagination={{ clickable: true }}
        navigation
      >
        {car?.images.map((images) => (
          <SwiperSlide key={images.name}>
            <SliderCar src={images.url} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Main>
        <DivInfo>
          <TextInfo>
            {car?.name} {car?.model}
          </TextInfo>
          <TextInfo>R${car?.price}</TextInfo>
        </DivInfo>

        <Spacer spacing={7} />

        <TitleData>Informações básicas:</TitleData>

        <DivInfoBasic>
          <ContainerAlign>
            <Text>Ano:</Text>
            <Data>{car?.year}</Data>
          </ContainerAlign>

          <ContainerAlign>
            <Text>Quilometragem:</Text>
            <Data>{car?.km} km</Data>
          </ContainerAlign>
        </DivInfoBasic>

        <Spacer spacing={7} />

        <TitleData>Especificações técnicas:</TitleData>

        <DivInfoBasic>
          <ContainerAlign>
            <Text>Motor:</Text>
            <Data>2.0, 150 cv (fixo)</Data>
          </ContainerAlign>

          <ContainerAlign>
            <Text>Câmbio:</Text>
            <Data>Manual (fixo)</Data>
          </ContainerAlign>

          <ContainerAlign>
            <Text>Combustível:</Text>
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

        <ContainerAlign style={{ alignItems: "flex-start" }}>
          <Text>{car?.description}</Text>
        </ContainerAlign>

        <Spacer spacing={7} />

        <TitleData>Contato:</TitleData>

        <DivInfoBasic>
          <ContainerAlign>
            <Text>Vendedor:</Text>
            <Data>{car?.owner}</Data>
          </ContainerAlign>

          <ContainerAlign>
            <Text>Localização:</Text>
            <Data>{car?.city}</Data>
          </ContainerAlign>

          <ContainerAlign>
            <Text>Contato:</Text>
            <Data>{car?.whatsapp}</Data>
          </ContainerAlign>
        </DivInfoBasic>

        <Spacer spacing={10} />

        {!!user && user?.uid === car?.uidUser ? (
          <CallButton
            onClick={removeVehicle}
            style={{ backgroundColor: "#3485ff" }}
          >
            Editar informações
          </CallButton>
        ) : (
          <CallButton href={whatsappLink(car as ICar)} target="_blank">
            Conversar com o vendedor
            <FaWhatsapp />
          </CallButton>
        )}
      </Main>

      <Spacer spacing={15} />
    </ContainerComponent>
  );
};

export default CarDetails;
