import React, { useContext } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { ButtonNavigateComponent } from "../../../components/buttonNavigateComponent";
import { ButtonSendComponent } from "../../../components/buttonSendComponent";
import { ContainerComponent } from "../../../components/Container";
import { HeaderAuth } from "../../../components/headerAuth";
import { Spacer } from "../../../components/spacer";
import { Container, Title } from "../styled";
import { AuthContext } from "../../../contexts/AuthContext";

const ValidateEmail: React.FunctionComponent = () => {
  const { setLoadingButton } = useContext(AuthContext);

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const checkEmail = searchParams.get("checkEmail") === "true";
  const replacePassword = searchParams.get("replacePassword") === "true";

  if (!checkEmail && !replacePassword) {
    return <Navigate to={"/"} />;
  }

  const handleVerifiedEmail = () => {
    setLoadingButton(true);
    alert("E-mail enviado.");
    setLoadingButton(false);
  };

  return (
    <Container>
      <HeaderAuth />

      <Spacer spacing={5} />

      <ContainerComponent>
        <Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerifiedEmail();
            }}
          >
            <Title>
              {checkEmail ? " Verificação de e-mail" : "Redefinição de senha"}
            </Title>

            <Spacer spacing={4} />

            <Text>
              Um e-mail foi enviado para <Email>{email}</Email>.
            </Text>

            <Spacer spacing={2} />

            {checkEmail ? (
              <Text>Siga as instruções para verificar a sua conta.</Text>
            ) : (
              <Text>Siga as instruções para redefinir a sua senha.</Text>
            )}

            <Spacer spacing={7} />

            <ButtonSendComponent title="Enviar novamente" />

            <Spacer spacing={1} />

            <ButtonNavigateComponent link="/login" title="Login" />
          </Form>
        </Body>
      </ContainerComponent>
    </Container>
  );
};

export default ValidateEmail;

const Body = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  margin-top: 10vh;
`;

const Form = styled.form`
  padding: 16px;
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  border: 2px solid #ccc;
  border-radius: 8px;
  max-width: 620px;
  margin: auto;
`;

const Text = styled.p`
  text-align: center;
`;

const Email = styled.strong`
  @media (max-width: 280px) {
    word-break: break-all;
  }
`;
