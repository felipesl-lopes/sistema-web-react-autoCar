import React, { useContext } from "react";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";

const HeaderProfileComponent: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { user, emailVerified } = useContext(AuthContext);

  return (
    <Container>
      <Header>
        <DivSection>
          <ComponentImage>
            {!user?.urlPhoto ? (
              <FiUser size={64} />
            ) : (
              <Image src={user.urlPhoto} />
            )}
          </ComponentImage>
          <DivUser style={{ width: "360px" }}>
            <Name>{user?.name}</Name>
            <div style={{ margin: "8px 0" }}>
              <InfoUser>
                {user?.email}
                {""}
                <strong>
                  {" "}
                  {emailVerified ? "(verificado)" : "(não verificado)"}
                </strong>
              </InfoUser>

              {/* A condição deve ser feita fora e não dentro do InfoUser */}
              <InfoUser>
                {!!user?.city ? (
                  <strong>
                    {user.uf}, {user.city}
                  </strong>
                ) : (
                  <strong>Adicione seu endereço</strong>
                )}
              </InfoUser>

              <InfoUser>
                {!!user?.whatsapp ? (
                  <strong>{`(${user.whatsapp.slice(
                    0,
                    2
                  )}) ${user.whatsapp.slice(2, 7)}-${user.whatsapp.slice(
                    7,
                    12
                  )}`}</strong>
                ) : (
                  <strong>Adicione seu telefone</strong>
                )}
              </InfoUser>
            </div>
            <ButtonEditInfo onClick={() => navigate("/dashboard")}>
              Editar informações
            </ButtonEditInfo>
          </DivUser>
          <Line />
        </DivSection>

        <DivSection>
          <DivUser>
            <TitleSection>Atividade</TitleSection>
            <LinkRoute to={"/dashboard/meus-veiculos"}>Meus anúncios</LinkRoute>
            <LinkRoute to={"#"}>Meus favoritos</LinkRoute>
            <LinkRoute to={"/dashboard/new"}>Vender</LinkRoute>
          </DivUser>

          <DivUser>
            <TitleSection>Configurações</TitleSection>
            <LinkRoute to={"#"}>Preferências de notificação</LinkRoute>
            <LinkRoute to={"#"}>Privacidade</LinkRoute>
            <LinkRoute to={"#"}>Alterar senha</LinkRoute>
          </DivUser>
        </DivSection>
      </Header>
    </Container>
  );
};

export default HeaderProfileComponent;

const Container = styled.div`
  background-color: #ddd;
  padding: 20px 12px;
`;

const Header = styled.header`
  display: flex;
  max-width: 1200px;
  margin: auto;
  width: 100%;

  @media (max-width: 924px) {
    /* flex-direction: column; */
  }
`;

const ComponentImage = styled.div`
  background-color: #fff;
  border-radius: 100px;
  width: 120px;
  height: 120px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-right: 20px;

  svg {
    display: flex;
  }
`;

const Image = styled.img`
  object-fit: cover;
  border-radius: 100px;
  width: 120px;
  height: 120px;
`;

const DivUser = styled.div`
  margin: 0 16px;
  display: flex;
  flex-direction: column;
`;

const Name = styled.h2``;

const InfoUser = styled.p`
  margin-bottom: 4px;

  strong {
    color: gray;
    font-weight: 400;
  }
`;

const ButtonEditInfo = styled.strong`
  cursor: pointer;
  font-size: 14px;
  color: #3485ff;
`;

const Line = styled.div`
  height: 100px;
  width: 2px;
  background-color: #444;
  margin: 0 20px;

  @media (max-width: 924px) {
    /* display: none; */
  }
`;

const DivSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const TitleSection = styled.h3`
  margin: 4px 0 8px;
`;

const LinkRoute = styled(Link)`
  text-decoration: none;
  margin-bottom: 4px;
`;
