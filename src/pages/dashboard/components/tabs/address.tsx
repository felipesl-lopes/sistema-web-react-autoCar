import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import { z } from "zod";
import { ButtonSendComponent } from "../../../../components/buttonSendComponent";
import { Spacer } from "../../../../components/spacer";
import { AuthContext } from "../../../../contexts/AuthContext";
import axiosService from "../../../../services/api";

interface IUf {
  nome: string;
  sigla: string;
  id: number;
}

interface ICity {
  id: number;
  nome: string;
}

interface IProps {
  uf: string;
  city: string;
}

const Address: React.FunctionComponent = () => {
  const { user, setLoadingButton } = useContext(AuthContext);
  const [ufList, setUfList] = useState<IUf[]>([]);
  const [cityList, setCityList] = useState<ICity[]>([]);
  const [loadingUf, setLoadingUf] = useState(true);
  const [loadingCity, setLoadingCity] = useState(true);

  const schema = z.object({
    uf: z.string().min(1, "Selecione seu Estado"),
    city: z.string().min(1, "Selecione sua Cidade"),
  });

  const defaultValues = useMemo(
    () => ({
      uf: user?.uf,
      city: user?.city,
    }),
    [user?.uf, user?.city]
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<IProps>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const uf = watch("uf");
  const city = watch("city");

  useEffect(() => {
    (async () => {
      await axios
        .get("https://brasilapi.com.br/api/ibge/uf/v1")
        .then(async ({ data }) => {
          const list = await data.map((uf: IUf) => ({
            nome: uf.nome,
            sigla: uf.sigla,
            id: uf.id,
          }));
          setUfList(await list);
        })
        .catch(() => setUfList([]))
        .finally(() => setLoadingUf(false));
    })();
  }, [setLoadingUf]);

  useEffect(() => {
    if (uf) {
      (async () => {
        await axios
          .get(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`)
          .then(async ({ data }) => {
            const list = await data.map((city: ICity) => ({
              id: city.id,
              nome: city.nome,
            }));
            setCityList(await list);
          })
          .catch(() => setCityList([]))
          .finally(() => setLoadingCity(false));
      })();
    } else {
      setLoadingCity(false);
    }
  }, [uf, setLoadingCity]);

  const handleUf = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("uf", e.target.value, { shouldDirty: true });
    setValue("city", "", { shouldDirty: true });
  };

  const handleCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("city", e.target.value, { shouldDirty: true });
  };

  const handleAddress = async (data: IProps) => {
    setLoadingButton(true);
    const update = {
      uf: data.uf,
      city: data.city,
      uid: user?.uid,
    };
    await axiosService
      .patch("/firestore/updateAddressUser", update)
      .then(() => window.location.reload())
      .catch(() => toast.error("Erro ao atualizar endereço."))
      .finally(() => setLoadingButton(false));
  };

  if (loadingCity || loadingUf) {
    return <TextLoading>Carregando...</TextLoading>;
  }

  return (
    <Form onSubmit={handleSubmit(handleAddress)}>
      <ContainerSelect>
        <Select
          {...register("uf")}
          onChange={handleUf}
          style={{
            color: uf === "" ? "gray" : "black",
            border: errors.uf && "2px solid #ff3030",
          }}
        >
          <Option disabled value="">
            Estado
          </Option>
          {ufList.map((item, index) => (
            <Option key={index} value={item.sigla}>
              {item.nome}
            </Option>
          ))}
        </Select>
        {errors.uf && <TextError>{errors.uf.message}</TextError>}
      </ContainerSelect>

      <Spacer spacing={1} />

      <ContainerSelect>
        <Select
          {...register("city")}
          onChange={handleCity}
          style={{
            color: city === "" ? "gray" : "black",
            border: errors.city && "2px solid #ff3030",
          }}
        >
          <Option disabled value="">
            Cidade
          </Option>
          {cityList.map((item, index) => (
            <Option key={index} value={item.nome}>
              {item.nome}
            </Option>
          ))}
        </Select>
        {errors.city && <TextError>{errors.city.message}</TextError>}
      </ContainerSelect>

      <Spacer spacing={10} />

      <ButtonSendComponent title="Salvar" disable={!isDirty} />
    </Form>
  );
};

export default Address;

const Form = styled.form`
  display: flex;
  flex: 1;
  justify-content: space-between;
  flex-direction: column;
`;

const ContainerSelect = styled.div`
  width: 100%;

  &:first-of-type {
    margin-bottom: 16px;
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  flex: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  min-width: 150px;
  font-size: 0.9rem;
`;

const Option = styled.option`
  font-size: 13px;
`;

const TextError = styled.p`
  color: #ff3030;
  margin: 2px 0 0 4px;
  font-size: 0.75rem;
  position: absolute;
`;

const TextLoading = styled.p`
  text-align: center;
  margin: auto;
  color: gray;
`;
