import React, { useContext } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { ButtonNavigateComponent } from "../../../components/buttonNavigateComponent";
import { ButtonSendComponent } from "../../../components/buttonSendComponent";
import { ContainerComponent } from "../../../components/Container";
import { Spacer } from "../../../components/spacer";
import { AuthContext } from "../../../contexts/AuthContext";
import { getErrorMessage } from "../../../errors/authErrors";
import axiosService from "../../../services/api";
import theme from "../../../styles/theme";
import { Container, Title } from "../styled";

const CheckEmail: React.FunctionComponent = () => {
  const { setLoadingButton, signed } = useContext(AuthContext);

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const checkEmail = searchParams.get("checkEmail") === "true";
  const replacePassword = searchParams.get("replacePassword") === "true";

  if (!checkEmail && !replacePassword) {
    return <Navigate to={"/"} />;
  }

  const handleVerifiedEmail = async () => {
    setLoadingButton(true);

    await axiosService
      .post("/auth/verifieldEmail")
      .then(() => {
        toast.info(
          "E-mail enviado. Verifique suas caixas de entrada e de spam.",
          {
            autoClose: 5000,
          }
        );
      })
      .catch(async (error) => {
        toast.error(getErrorMessage(await error.response.data.code));
      })
      .finally(() => {
        setLoadingButton(false);
      });
  };

  return (
    <Container>
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

            <Spacer spacing={3} />

            {signed && <ButtonSendComponent title="Reenviar" />}

            <Spacer spacing={1} />

            <ButtonNavigateComponent link="/login" title="Entrar" />
          </Form>
        </Body>
      </ContainerComponent>
    </Container>
  );
};

export default CheckEmail;

const Body = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${theme.pixels.px20};
  justify-content: center;
  margin-top: 10vh;
`;

const Form = styled.form`
  padding: ${theme.padding.p16};
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  border: 2px solid #ccc;
  border-radius: ${theme.borderRadius.radius8};
  max-width: 620px;
  margin: auto;
`;

const Text = styled.p`
  text-align: center;
`;

const Email = styled.strong`
  color: ${theme.colors.golden};

  @media (max-width: 280px) {
    word-break: break-all;
  }
`;
