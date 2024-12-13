import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { ButtonNavigateComponent } from "../../../components/buttonNavigateComponent";
import { ButtonSendComponent } from "../../../components/buttonSendComponent";
import { ContainerComponent } from "../../../components/Container";
import { InputComponent } from "../../../components/inputComponent";
import { Spacer } from "../../../components/spacer";
import { AuthContext } from "../../../contexts/AuthContext";
import { getErrorMessage } from "../../../errors/authErrors";
import { IFormRecoverPassword, IFormRegister } from "../../../interface";
import axiosService from "../../../services/api";
import { Authentication, Body, Container, Title } from "../styled";

const RecoverPassword: React.FunctionComponent = () => {
  const { setLoadingButton } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await axiosService("/auth/logout");
    })();
  }, []);

  const schema = z.object({
    email: z
      .string()
      .min(1, "Campo obrigatório")
      .email("Digite um e-mail válido"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormRegister>({
    resolver: zodResolver(schema),
  });

  const handleRecoverPassword = async (data: IFormRecoverPassword) => {
    setLoadingButton(true);

    await axiosService
      .post("/auth/recoverPassword", data)
      .then(() => {
        navigate(
          `/verificar-email?email=${encodeURIComponent(
            data.email
          )}&replacePassword=true`,
          { replace: true }
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
          <Authentication onSubmit={handleSubmit(handleRecoverPassword)}>
            <Title>Redefinição de senha</Title>

            <Spacer spacing={4} />

            <InputComponent
              {...register("email")}
              placeholder="E-mail cadastrado"
              type="email"
              id="email"
              errors={errors.email}
            />

            <Spacer spacing={7} />

            <ButtonSendComponent type="submit" title="Enviar e-mail" />

            <Spacer spacing={1} />

            <ButtonNavigateComponent title="Voltar" link="/login" />
          </Authentication>
        </Body>
      </ContainerComponent>
    </Container>
  );
};

export default RecoverPassword;
