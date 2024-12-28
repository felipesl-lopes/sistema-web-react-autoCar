import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useMemo } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { z } from "zod";
import { ButtonSendComponent } from "../../../../components/buttonSendComponent";
import { InputComponent } from "../../../../components/inputComponent";
import { Spacer } from "../../../../components/spacer";
import { AuthContext } from "../../../../contexts/AuthContext";

interface IProps {
  email: string;
}

const Email: React.FunctionComponent = () => {
  const { user } = useContext(AuthContext);

  const schema = z.object({
    email: z
      .string()
      .min(1, "Campo obrigatório")
      .email("Digite um e-mail válido"),
  });

  const defaultValues = useMemo(
    () => ({
      email: user?.email,
    }),
    [user?.email]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IProps>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleEmail = async (data: any) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(handleEmail)}>
      <InputComponent
        {...register("email")}
        placeholder="E-mail"
        type="email"
        id="email"
        errors={errors.email}
      />

      <Spacer spacing={10} />

      <ButtonSendComponent title="Salvar" disable={!isDirty} />
    </Form>
  );
};

export default Email;

const Form = styled.form`
  display: flex;
  flex: 1;
  justify-content: space-between;
  flex-direction: column;
`;
