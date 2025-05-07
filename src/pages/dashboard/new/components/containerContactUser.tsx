import styled from "styled-components";
import React, { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ContainerContactUser: React.FunctionComponent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user?.city == "" || user?.uf == "" || user?.whatsapp == "") {
    return (
      <Container style={{ backgroundColor: "#ff0000", padding: 20 }}>
        <Text
          style={{ color: "#ffffff", fontSize: 14, cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          Finalize seu cadastro para começar a vender.
        </Text>
      </Container>
    );
  }

  return (
    <Container>
      <ContainerContact>
        <div>
          <Label>Estado</Label>
          <Text>{user?.uf}</Text>
        </div>
        <div>
          <Label>Cidade</Label>
          <Text>{user?.city}</Text>
        </div>
        <div>
          <Label>Telefone/Whatsapp</Label>
          <Text>{`(${user?.whatsapp.slice(0, 2)}) ${user?.whatsapp.slice(
            2,
            7
          )}-${user?.whatsapp.slice(7, 12)}`}</Text>
        </div>
      </ContainerContact>

      <Button onClick={() => navigate("/dashboard")}>
        Alterar informações de contato?
      </Button>
    </Container>
  );
};

export default ContainerContactUser;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  padding: 8px;
  border-radius: 4px;
`;

const ContainerContact = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  column-gap: 20px;
  flex-wrap: wrap;
  width: 100%;

  div {
    text-align: center;
    width: 30%;

    @media (max-width: 500px) {
      width: 100%;
      flex-wrap: nowrap;
      margin-bottom: 8px;
    }
  }
`;

const Label = styled.p`
  font-size: 13px;
  color: #444;
  margin: 0 0 2px 2px;
`;

const Text = styled.p`
  font-size: 13px;
  font-weight: 600;
  margin: 0 0 2px 2px;
`;

const Button = styled.strong`
  cursor: pointer;
  font-size: 13px;
  color: #3485ff;
  margin-top: 10px;
`;
