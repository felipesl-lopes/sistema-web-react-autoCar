import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { ContainerComponent } from "../../components/Container";
import { Spacer } from "../../components/spacer";
import { AuthContext } from "../../contexts/AuthContext";
import theme from "../../styles/theme";

const CarAdButtonComponent: React.FunctionComponent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavigateNew = () => {
    if (user?.uid) {
      navigate("dashboard/new");
    } else {
      navigate("login");
      toast.info("Faça login para começar a vender");
    }
  };

  return (
    <ContainerComponent>
      <Container>
        <Title>Quer vender seu carro?</Title>
        <Text>
          Está pensando em vender seu carro? Anuncie agora mesmo na nossa
          plataforma e aumente suas chances de fechar negócio com segurança e
          visibilidade!
        </Text>
        <Spacer spacing={6} />
        <Button onClick={handleNavigateNew}>Anuncie agora</Button>
      </Container>
    </ContainerComponent>
  );
};

export default CarAdButtonComponent;

const Container = styled.div`
  background-color: ${theme.colors.golden};
  padding: 40px 20px;
  text-align: center;
  border-radius: ${theme.borderRadius.radius12};
  margin: 40px auto;
  max-width: 800px;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1``;

const Text = styled.p`
  margin: ${theme.pixels.px12};
  text-align: center;
`;

const Button = styled.button`
  background-color: ${theme.colors.white};
  color: ${theme.colors.golden};
  border: none;
  padding: ${theme.padding.p16} ${theme.padding.p28};
  border-radius: ${theme.borderRadius.radius8};
  font-size: ${theme.fontSize.fs18};
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
