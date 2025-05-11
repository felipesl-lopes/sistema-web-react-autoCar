import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { ContainerComponent } from "../../components/Container";
import { Spacer } from "../../components/spacer";
import { AuthContext } from "../../contexts/AuthContext";

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
  background-color: #ff6600;
  padding: 40px 20px;
  text-align: center;
  border-radius: 12px;
  margin: 40px auto;
  max-width: 800px;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  margin: 10px 10px 30px 10px;
  font-size: 28px;
`;

const Text = styled.p`
  margin: 10px;
  text-align: center;
`;

const Button = styled.button`
  background-color: white;
  color: #ff6600;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #ffe2d0;
  }
`;
