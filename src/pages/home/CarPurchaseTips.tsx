import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";
import styled from "styled-components";
import car from "../../assets/car.png";
import { ContainerComponent } from "../../components/Container";
import theme from "../../styles/theme";

const CarPurchaseTips: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [contentHeight, setContentHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  const tips = [
    "Defina seu orçamento antes de pesquisar. Evite gastos além do que pode pagar e lembre-se de considerar IPVA, seguro e manutenção.",
    "Pesquise o modelo desejado. Veja consumo, peças e avaliações de outros donos.",
    "Verifique a documentação. Exija comprovantes de IPVA pago, licenciamento e ausência de multas.",
    "Faça um test drive. Se possível, avalie conforto, ruídos e desempenho do veículo.",
    "Desconfie de preços muito abaixo do mercado. Pode ser golpe ou problema mecânico grave.",
    "Considere levar um mecânico de confiança para avaliar o carro.",
    "Veja o histórico de revisões e acidentes, se disponível.",
    "Compare com outros modelos da mesma faixa de preço.",
  ];

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, [showAll, tips]);

  const tipsToRender = tips;

  return (
    <ContainerComponent>
      <SectionContainer>
        <ImageContainer>
          <VehicleImage src={car} alt="Carro ilustrativo" />
        </ImageContainer>

        <TipsContainer>
          <Title>Dicas para comprar seu próximo carro</Title>
          <Subtitle>
            Evite problemas e faça uma boa escolha com essas recomendações:
          </Subtitle>

          <TipsWrapper
            style={{
              maxHeight: showAll ? contentHeight : "120px",
            }}
          >
            <TipsList ref={contentRef as any}>
              {tipsToRender.map((tip, index) => (
                <TipItem key={index}>{tip}</TipItem>
              ))}
            </TipsList>
          </TipsWrapper>

          <ToggleButton onClick={() => setShowAll(!showAll)}>
            {showAll ? "Ver menos" : "Ver mais dicas "}
            {showAll ? <IoMdArrowRoundUp /> : <IoMdArrowRoundDown />}
          </ToggleButton>
        </TipsContainer>
      </SectionContainer>
    </ContainerComponent>
  );
};

export default CarPurchaseTips;

const SectionContainer = styled.section`
  display: flex;
  gap: ${theme.pixels.px24};
  justify-content: center;
  padding: 40px 20px;
`;

const ImageContainer = styled.div`
  min-width: 180px;
  max-width: 280px;

  @media (max-width: 538px) {
    display: none;
  }
`;

const VehicleImage = styled.img`
  width: 100%;
`;

const TipsContainer = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 500px;

  @media (max-width: 538px) {
    min-width: 0;
  }
`;

const Title = styled.h2`
  font-size: ${theme.fontSize.fs24};
  margin-bottom: ${theme.pixels.px12};
`;

const Subtitle = styled.p`
  font-size: ${theme.fontSize.fs16};
  margin-bottom: ${theme.pixels.px16};
`;

const TipsWrapper = styled.div`
  overflow: hidden;
  transition: max-height 0.5s ease;
`;

const TipsList = styled.ul`
  list-style: disc;
  padding-left: ${theme.pixels.px16};
  gap: ${theme.pixels.px8};
`;

const TipItem = styled.li`
  margin-bottom: ${theme.pixels.px12};
  line-height: 1.5;
`;

const ToggleButton = styled.button`
  margin-top: ${theme.pixels.px16};
  border: none;
  font-size: ${theme.fontSize.fs16};
  cursor: pointer;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: transparent;

  svg {
    display: flex;
    margin-left: ${theme.pixels.px4};
  }
`;
