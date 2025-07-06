import { zodResolver } from "@hookform/resolvers/zod";
import React, { ChangeEvent, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { ButtonSendComponent } from "../../../components/buttonSendComponent";
import ComponentVerifielEmail from "../../../components/componentVerifieldEmail";
import { ContainerComponent } from "../../../components/Container";
import { InputForm } from "../../../components/inputForm";
import { Spacer } from "../../../components/spacer";
import { AuthContext } from "../../../contexts/AuthContext";
import { fuelList } from "../../../data/fuelList";
import { marcaList } from "../../../data/marcasList";
import { createDocCarFirestore } from "../../../functions/firestore";
import { IFormNewCar } from "../../../interface";
import { TitleDashboard } from "../styled";
import ContainerContactUser from "./components/containerContactUser";
import {
  ButtonFile,
  ContainerInput,
  ContainerSelect,
  ContainerTextArea,
  Div,
  DivImage,
  DivX,
  Form,
  IconX,
  ImageCar,
  InputFile,
  Label,
  LabelTextArea,
  Option,
  Select,
  TextArea,
  TitleForm,
} from "./styled";

const New: React.FunctionComponent = () => {
  const { user, setLoadingButton, emailVerified } = useContext(AuthContext);
  const transmissionList = ["Manual", "Automático", "Automatizado"];

  const [listImages, setListImages] = useState<
    { previewUrl: string; file: File }[]
  >([]);

  const schema = z.object({
    name: z.string().min(1),
    model: z.string().min(1),
    year: z.string().min(1),
    km: z.string().min(1),
    price: z.string().min(1),
    description: z.string().min(1),
    engine: z.string().min(1),
    transmission: z.string(),
    fuel: z.string(),
    generalCondition: z.string().min(1),
    documentationStatus: z.string().min(1),
    maintenanceHistory: z.string().min(1),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IFormNewCar>({
    resolver: zodResolver(schema),
    defaultValues: {
      uf: "",
      city: "",
    },
  });

  if (!emailVerified && !user?.uid) {
    return <Navigate to={"/"} />;
  }

  if (!emailVerified && user?.uid) {
    return (
      <ComponentVerifielEmail
        email={user.email}
        title="Anuncie seu veículo"
        text="Verifique seu e-mail para cadastrar seus veículos."
      />
    );
  }

  const onSubmit = async (data: IFormNewCar) => {
    await createDocCarFirestore(
      listImages,
      data,
      setLoadingButton,
      user,
      reset,
      setListImages
    );
  };

  const handleFileStorage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file?.type === "image/jpeg" || file?.type === "image/png") {
      const previewUrl = URL.createObjectURL(file);
      if (file) {
        setListImages((prevList) => [...prevList, { file, previewUrl }]);
      }
    } else {
      toast.error("Envie uma imagem jpeg ou png");
      return;
    }
  };

  const handleDeleteImage = async (item: string) => {
    setListImages((prevList) =>
      prevList.filter((image) => image.previewUrl !== item)
    );
  };

  /**
   * Limitar 10 anexos.
   * @param e
   */
  const maxImages = (e: React.MouseEvent<HTMLInputElement>) => {
    if (listImages.length >= 10) {
      e.preventDefault();
      toast.info("Você só pode adicionar até 10 imagens.");
    }
  };

  const handleTransmission = (e: any) => {
    setValue("transmission", e.target.value);
  };

  const handleName = (e: any) => {
    setValue("name", e.target.value);
  };

  const handleFuel = (e: any) => {
    setValue("fuel", e.target.value);
  };

  return (
    <ContainerComponent>
      <Spacer spacing={6} />

      <TitleDashboard>Cadastre seu veículo</TitleDashboard>

      <Div>
        <DivImage>
          <ButtonFile>
            <FiUpload />
            <InputFile
              type="file"
              accept="image/*"
              onChange={handleFileStorage}
              onClick={maxImages}
            />
          </ButtonFile>

          {listImages.map((item) => (
            <DivX key={item.previewUrl}>
              <IconX onClick={() => handleDeleteImage(item.previewUrl)} />
              <ImageCar src={item.previewUrl} alt="Imagem do veículo" />
            </DivX>
          ))}
        </DivImage>
      </Div>

      <Spacer spacing={2} />

      <Div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TitleForm>Informações gerais</TitleForm>
          <ContainerInput>
            <ContainerSelect>
              <Label>Marca</Label>
              <Select {...register("name")} onChange={handleName}>
                {marcaList.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </ContainerSelect>

            <InputForm
              errors={errors.model}
              {...register("model")}
              label="Modelo"
              placeholder="Modelo do veículo"
              id="model"
            />
          </ContainerInput>

          <ContainerInput>
            <InputForm
              errors={errors.year}
              {...register("year")}
              max={new Date().getFullYear()}
              min={1960}
              label="Ano"
              placeholder={new Date().getFullYear().toString()}
              id="year"
              type="number"
            />

            <InputForm
              errors={errors.km}
              {...register("km")}
              label="Km"
              placeholder="0"
              id="km"
              type="number"
              min={0}
            />

            <InputForm
              errors={errors.price}
              {...register("price")}
              label="Preço"
              placeholder="Preço do veículo"
              id="price"
            />
          </ContainerInput>

          <Spacer spacing={6} />

          <TitleForm>Especificações técnicas</TitleForm>
          <ContainerInput>
            <InputForm
              errors={errors.engine}
              {...register("engine")}
              label="Motor"
              placeholder="Motor"
              id="engine"
            />

            <ContainerSelect>
              <Label>Câmbio</Label>
              <Select
                {...register("transmission")}
                onChange={handleTransmission}
              >
                {transmissionList.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </ContainerSelect>

            <ContainerSelect>
              <Label>Combustível</Label>
              <Select {...register("fuel")} onChange={handleFuel}>
                {fuelList.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </ContainerSelect>
          </ContainerInput>

          <Spacer spacing={6} />

          <TitleForm>Condições</TitleForm>
          <InputForm
            errors={errors.generalCondition}
            {...register("generalCondition")}
            label="Estado geral"
            placeholder="Descreva o estado geral do veículo"
            id="generalCondition"
          />

          <InputForm
            errors={errors.maintenanceHistory}
            {...register("maintenanceHistory")}
            label="Revisões e manutenção"
            placeholder="Informe as últimas revisões e manutenções"
            id="maintenanceHistory"
          />

          <InputForm
            errors={errors.documentationStatus}
            {...register("documentationStatus")}
            label="Documentação"
            placeholder="Descreva o estado da documentação"
            id="documentationStatus"
          />

          <Spacer spacing={6} />

          <TitleForm>Contato</TitleForm>
          <ContainerContactUser />

          <Spacer spacing={6} />

          <ContainerTextArea>
            <LabelTextArea>Descrição</LabelTextArea>
            <TextArea
              style={{ border: errors.description && "2px solid #ff3030" }}
              {...register("description")}
              placeholder="Faça uma descrição completa do veículo."
              id="description"
            />
          </ContainerTextArea>

          <Spacer spacing={6} />

          <ButtonSendComponent
            disable={user?.city == "" || user?.whatsapp == ""}
            title={"Anunciar"}
            type="submit"
          />
        </Form>
      </Div>

      <Spacer spacing={6} />
    </ContainerComponent>
  );
};

export default New;
