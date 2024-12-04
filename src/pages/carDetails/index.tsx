import { doc, getDoc } from "firebase/firestore";
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
import { firestore } from "../../services/firebase";
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
      const carRef = doc(firestore, "cars", id as string);

      await getDoc(carRef)
        .then((snapshot) => {
          if (!snapshot.data()) {
            return navigate("/");
          }

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
            images: doc?.images,
          });
          setSliderPerview(doc?.images.length as number);
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
            <Text>Ano:</Text>
            <Data>{car?.year}</Data>
          </ContainerAlign>

          <ContainerAlign>
            <Text>Quilometragem:</Text>
            <Data>{car?.km}km</Data>
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

        <ContainerAlign>
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

        {user?.uid === car?.uid ? (
          <CallButton
            onClick={removeVehicle}
            style={{ backgroundColor: "#3485ff" }}
          >
            Excluir veículo
          </CallButton>
        ) : (
          <CallButton
            href={`https://wa.me/55${car?.whatsapp}?text=Ol%C3%A1%2C%20vi%20esse%20${car?.name}%20no%20site%20AutoCar%20e%20fiquei%20com%20interesse%21
`}
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
