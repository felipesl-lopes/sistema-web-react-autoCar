import React, { useContext, useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { ContainerComponent } from "../../components/Container";
import { Spacer } from "../../components/spacer";
import { SpinnerLoading } from "../../components/spinnerLoading";
import { AuthContext } from "../../contexts/AuthContext";
import { getDataAdFirestore } from "../../functions/firestore";
import { ICar, IFormNewCar } from "../../interface";
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
  const [car, setCar] = useState<IFormNewCar | null>();
  const [sliderPerview, setSliderPerview] = useState<number>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  /**
   * Função assíncrona para buscar dados do anuncio no DB.
   */
  useEffect(() => {
    (async () => {
      await getDataAdFirestore(id as string)
        .then((data) => {
          setCar({
            city: data?.city,
            created: data?.created,
            description: data?.description,
            km: data?.km,
            model: data?.model,
            uf: data?.uf,
            name: data?.name,
            owner: data?.owner,
            price: data?.price,
            uidUser: data?.uidUser,
            whatsapp: data?.whatsapp,
            year: data?.year,
            images: data?.images,
            documentationStatus: data?.documentationStatus,
            engine: data?.engine,
            fuel: data?.fuel,
            generalCondition: data?.generalCondition,
            maintenanceHistory: data?.maintenanceHistory,
            transmission: data?.transmission,
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
  const deleteAd = async () => {
    const confirm = window.confirm(
      "Você deseja realmente excluir esse anúncio?"
    );

    if (confirm) {
      await axiosService
        .delete(`/firestore/deleteAd/${id}`)
        .then(async () => {
          navigate("/dashboard");
          await axiosService
            .delete(`/storage/deleteImgAd`, { data: car?.images })
            .then(() => toast.success("Anúncio deletado com sucesso!"));
        })
        .catch(() => toast.error("Erro ao tentar deletar o anúncio."));
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
            <Data>{car?.engine}</Data>
          </ContainerAlign>

          <ContainerAlign>
            <Text>Câmbio:</Text>
            <Data>{car?.transmission}</Data>
          </ContainerAlign>

          <ContainerAlign>
            <Text>Combustível:</Text>
            <Data>{car?.fuel}</Data>
          </ContainerAlign>
        </DivInfoBasic>

        <Spacer spacing={7} />

        <TitleData>Condições:</TitleData>

        <DivInfoConditions>
          <div>
            <Data>Estado geral:</Data>
            <Text>{car?.generalCondition}</Text>
          </div>

          <div>
            <Data>Revisões e Manutenções:</Data>
            <Text>{car?.maintenanceHistory}</Text>
          </div>

          <div>
            <Data>Documentação:</Data>
            <Text>{car?.documentationStatus}</Text>
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
            <Data>
              {car?.city}, {car?.uf}
            </Data>
          </ContainerAlign>

          <ContainerAlign>
            <Text>Contato:</Text>
            <Data>{car?.whatsapp}</Data>
          </ContainerAlign>
        </DivInfoBasic>

        <Spacer spacing={10} />

        {!!user && user?.uid === car?.uidUser ? (
          <CallButton onClick={deleteAd} style={{ backgroundColor: "#3485ff" }}>
            Excluir anúncio
          </CallButton>
        ) : (
          <CallButton
            href={whatsappLink(car as IFormNewCar)}
            style={{ backgroundColor: "#25d366" }}
            target="_blank"
          >
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
