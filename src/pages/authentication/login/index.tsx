import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { ButtonNavigateComponent } from "../../../components/buttonNavigateComponent";
import { ButtonSendComponent } from "../../../components/buttonSendComponent";
import { ContainerComponent } from "../../../components/Container";
import { HeaderAuth } from "../../../components/headerAuth";
import {
  InputComponent,
  InputPasswordComponent,
} from "../../../components/inputComponent";
import { PanelAuth } from "../../../components/panelAuth";
import { Spacer } from "../../../components/spacer";
import { AuthContext } from "../../../contexts/AuthContext";
import { getErrorMessage } from "../../../errors/authErrors";
import { IFormLogin } from "../../../interface";
import { auth } from "../../../services/firebase";
import {
  Authentication,
  Body,
  BoxRecoverPassword,
  Container,
  RecoverPassword,
  Title,
} from "../styled";

const Login: React.FunctionComponent = () => {
  const { setLoadingButton } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await signOut(auth);
    })();
  }, []);

  const schema = z.object({
    email: z
      .string()
      .min(1, "Campo obrigatório")
      .email("Digite um e-mail válido"),
    password: z
      .string()
      .min(1, "Campo obrigatório")
      .min(6, "Mínimo de 6 dígitos"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>({
    resolver: zodResolver(schema),
  });

  const handleLogin = async (data: IFormLogin) => {
    setLoadingButton(true);
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        navigate("/dashboard", { replace: true });
      })
      .catch(async (error) => {
        toast.error(getErrorMessage(await error.code));
      })
      .finally(() => {
        setLoadingButton(false);
      });
  };

  return (
    <Container>
      <HeaderAuth />

      <Spacer spacing={5} />

      <ContainerComponent>
        <Body>
          <PanelAuth />

          <Authentication onSubmit={handleSubmit(handleLogin)}>
            <Title>Faça o login</Title>

            <Spacer spacing={4} />

            <InputComponent
              {...register("email")}
              placeholder="E-mail"
              type="email"
              id="email"
              errors={errors.email}
            />

            <Spacer spacing={5} />

            <InputPasswordComponent
              {...register("password")}
              placeholder="Senha"
              autoCapitalize="none"
              autoComplete="none"
              id="password"
              errors={errors.password}
            />

            <Spacer spacing={5} />

            <BoxRecoverPassword>
              <RecoverPassword to={"/recoverPassword"}>
                Esqueci minha senha
              </RecoverPassword>
            </BoxRecoverPassword>

            <Spacer spacing={7} />

            <ButtonSendComponent type="submit" title="Entrar" />

            <Spacer spacing={1} />

            <ButtonNavigateComponent title="Criar conta" link="/register" />
          </Authentication>
        </Body>
      </ContainerComponent>
    </Container>
  );
};

export default Login;
