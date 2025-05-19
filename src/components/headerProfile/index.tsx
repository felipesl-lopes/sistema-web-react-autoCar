import React, { useContext } from "react";
import { FiCheckCircle, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import theme from "../../styles/theme";

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

          <DivUser>
            <Name>{user?.name}</Name>
            <div style={{ margin: "8px 0" }}>
              <InfoUser>
                <p>{user?.email}</p>
                {emailVerified ? (
                  <FiCheckCircle color="green" />
                ) : (
                  <FiCheckCircle color="red" />
                )}
              </InfoUser>

              {!!user?.whatsapp ? (
                <InfoUser>
                  {`(${user.whatsapp.slice(0, 2)}) ${user.whatsapp.slice(
                    2,
                    7
                  )}-${user.whatsapp.slice(7, 12)}`}{" "}
                </InfoUser>
              ) : (
                <InfoUser>Adicione seu telefone</InfoUser>
              )}

              {!!user?.city ? (
                <InfoUser>
                  {user.uf}, {user.city}
                </InfoUser>
              ) : (
                <InfoUser>Adicione seu endereço</InfoUser>
              )}
            </div>

            <ButtonEditInfo onClick={() => navigate("/dashboard")}>
              Editar informações
            </ButtonEditInfo>
          </DivUser>
        </DivSection>

        <DivSection>
          <DivUser>
            <TitleSection>Atividade</TitleSection>
            <LinkRoute to={"/dashboard/meus-veiculos"}>Meus anúncios</LinkRoute>
            <LinkRoute to={"/dashboard/meus-favoritos"}>
              Meus favoritos
            </LinkRoute>
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
  background-color: ${theme.colors.backgroundPrimary};
  padding: ${theme.padding.p20} ${theme.padding.p12};
`;

const Header = styled.header`
  display: flex;
  max-width: 1200px;
  margin: auto;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const DivSection = styled.div`
  display: flex;
  flex-direction: row;

  &:first-of-type {
    margin-bottom: ${theme.padding.p20};

    @media (max-width: 320px) {
      flex-direction: column;
    }
  }
`;

const ComponentImage = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 100px;
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
  display: flex;

  svg {
    display: flex;
  }

  @media (max-width: 320px) {
    display: none;
  }
`;

const Image = styled.img`
  object-fit: cover;
  border-radius: 100px;
  width: 100px;
  height: 100px;
`;

const DivUser = styled.div`
  margin: 0 ${theme.padding.p16};
  display: flex;
  flex-direction: column;
`;

const Name = styled.h2`
  font-size: 1.4rem;
`;

const InfoUser = styled.div`
  margin-bottom: ${theme.pixels.px4};
  align-items: center;
  display: flex;

  svg {
    margin-left: ${theme.pixels.px4};
  }
`;

const ButtonEditInfo = styled.strong`
  cursor: pointer;
  font-size: ${theme.fontSize.fs14};
  color: ${theme.colors.blue};
`;

const TitleSection = styled.h3`
  margin: ${theme.padding.p4} 0 ${theme.padding.p8};
  font-size: ${theme.fontSize.fs16};
`;

const LinkRoute = styled(Link)`
  text-decoration: none;
  margin-bottom: ${theme.pixels.px4};
`;
