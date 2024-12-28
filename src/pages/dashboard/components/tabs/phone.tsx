import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import { z } from "zod";
import { ButtonSendComponent } from "../../../../components/buttonSendComponent";
import { InputComponent } from "../../../../components/inputComponent";
import { Spacer } from "../../../../components/spacer";
import { AuthContext } from "../../../../contexts/AuthContext";
import axiosService from "../../../../services/api";

interface IProps {
  whatsapp: string;
}

const Phone: React.FunctionComponent = () => {
  const { user, setLoadingButton } = useContext(AuthContext);

  const schema = z.object({
    whatsapp: z
      .string()
      .min(1, "Campo obrigatório")
      .min(10, "Digite o DDD + 8 ou 9 dígitos"),
  });

  const defaultValues = useMemo(
    () => ({
      whatsapp: user?.whatsapp,
    }),
    [user?.whatsapp]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IProps>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handlePhone = async (data: IProps) => {
    setLoadingButton(true);
    let update = {
      whatsapp: data.whatsapp,
      uid: user?.uid,
    };
    await axiosService
      .patch("/firestore/updatePhoneUser", update)
      .then(() => window.location.reload())
      .catch(() => toast.error("Erro ao tentar atualizar telefone."))
      .finally(() => setLoadingButton(false));
  };

  return (
    <Form onSubmit={handleSubmit(handlePhone)}>
      <InputComponent
        {...register("whatsapp")}
        placeholder="Telefone"
        type="tel"
        id="whatsapp"
        maxLength={11}
        errors={errors.whatsapp}
      />

      <Spacer spacing={10} />

      <ButtonSendComponent title="Salvar" disable={!isDirty} />
    </Form>
  );
};

export default Phone;

const Form = styled.form`
  display: flex;
  flex: 1;
  justify-content: space-between;
  flex-direction: column;
`;
