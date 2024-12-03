import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
} from "firebase/auth";
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
import { IFormRegister } from "../../../interface";
import { auth } from "../../../services/firebase";
import { Authentication, Body, Container, Title } from "../styled";

const Register: React.FunctionComponent = () => {
  const { handleInfoUser, setLoadingButton } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await signOut(auth);
    })();
  }, []);

  const schema = z
    .object({
      name: z.string().min(1, "Campo obrigatório"),
      email: z
        .string()
        .min(1, "Campo obrigatório")
        .email("Digite um e-mail válido"),
      password: z
        .string()
        .min(1, "Campo obrigatório")
        .min(6, "Mínimo de 6 dígitos"),
      passwordConfirm: z
        .string()
        .min(1, "Campo obrigatório")
        .min(6, "Mínimo de 6 dígitos"),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "As senhas não coincidem",
      path: ["passwordConfirm"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormRegister>({
    resolver: zodResolver(schema),
  });

  const handleRegister = async (data: IFormRegister) => {
    setLoadingButton(true);
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, { displayName: data.name }).then(
          async () => {
            let dataUser = {
              name: data.name,
              email: data.email,
              uid: user.user.uid,
            };
            await sendEmailVerification(user.user);
            handleInfoUser(dataUser);
            navigate(
              `/verificar-email?email=${encodeURIComponent(
                data.email
              )}&checkEmail=true`
            );
          }
        );
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

          <Authentication onSubmit={handleSubmit(handleRegister)}>
            <Title>Registre-se</Title>

            <Spacer spacing={4} />

            <InputComponent
              {...register("name")}
              placeholder="Nome completo"
              type="text"
              id="name"
              errors={errors.name}
            />

            <Spacer spacing={5} />

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

            <InputPasswordComponent
              {...register("passwordConfirm")}
              placeholder="Repita a senha"
              autoCapitalize="none"
              autoComplete="none"
              id="passwordConfirm"
              errors={errors.passwordConfirm}
            />

            <Spacer spacing={7} />

            <ButtonSendComponent type="submit" title="Cadastrar" />

            <Spacer spacing={1} />

            <ButtonNavigateComponent title="Fazer login" link="/login" />
          </Authentication>
        </Body>
      </ContainerComponent>
    </Container>
  );
};

export default Register;
