import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import { z } from "zod";
import { ButtonSendComponent2 } from "../../../components/buttonSendComponent";
import { ContainerComponent } from "../../../components/Container";
import { InputForm } from "../../../components/inputForm";
import { Spacer } from "../../../components/spacer";
import { AuthContext } from "../../../contexts/AuthContext";
import { createDocCarFirestore } from "../../../functions/firestore";
import {
  deleteImage,
  fileStorage,
  uploadStorage,
} from "../../../functions/storage";
import { IFormNewCar, IImageItemProps } from "../../../interface";
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

interface IUf {
  nome: string;
  sigla: string;
  id: number;
}

interface ICity {
  id: number;
  nome: string;
}

const New: React.FunctionComponent = () => {
  const { user, setLoadingButton } = useContext(AuthContext);
  const [carImages, setCarImages] = useState<IImageItemProps[]>([]);
  const [ufList, setUfList] = useState<IUf[]>([]);
  const [cityList, setCityList] = useState<ICity[]>([]);
  const transmissionList = ["Manual", "Automático", "Automatizado"];
  const fuelList = [
    "Gasolina",
    "Etanol",
    "Diesel",
    "GNV",
    "Flex",
    "Elétrico",
    "Híbrido",
  ];

  const schema = z.object({
    name: z.string().min(1),
    model: z.string().min(1),
    year: z.string().min(1),
    km: z.string().min(1),
    price: z.string().min(1),
    whatsapp: z.string().min(10),
    description: z.string().min(1),
    uf: z.string().min(1),
    city: z.string().min(1),
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
    watch,
    formState: { errors },
  } = useForm<IFormNewCar>({
    resolver: zodResolver(schema),
    defaultValues: {
      uf: "",
      city: "",
    },
  });

  const onSubmit = async (data: IFormNewCar) => {
    await createDocCarFirestore(
      data,
      carImages,
      setLoadingButton,
      user,
      reset,
      setCarImages
    );
  };

  const uf = watch("uf");
  const city = watch("city");

  useEffect(() => {
    (async () => {
      await axios
        .get(`https://brasilapi.com.br/api/ibge/uf/v1`)
        .then(({ data }) => {
          setUfList([]);
          let list = [];
          data.map((uf: IUf) => {
            list.push({
              nome: uf.nome,
              sigla: uf.sigla,
              id: uf.id,
            });
            setUfList(list);
          });
        });
    })();
  }, []);

  useEffect(() => {
    if (uf) {
      (async () => {
        await axios
          .get(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`)
          .then(({ data }) => {
            setCityList([]);
            let list = [];
            data.map((city: ICity) => {
              list.push({
                id: city.id,
                nome: city.nome,
              });
              setCityList(list);
            });
          });
      })();
    }
  }, [uf]);

  const handleFileStorage = async (e: ChangeEvent<HTMLInputElement>) => {
    await fileStorage(e, handleUploadStorage);
  };

  const handleUploadStorage = async (image: File) => {
    await uploadStorage(image, user, setCarImages);
  };

  const handleDeleteImage = async (item: IImageItemProps) => {
    await deleteImage(item, setCarImages, carImages);
  };

  /**
   * Limitar 10 anexos.
   * @param e
   */
  const maxImages = (e: React.MouseEvent<HTMLInputElement>) => {
    if (carImages.length >= 10) {
      e.preventDefault();
      toast.info("Você só pode adicionar até 10 imagens.");
    }
  };

  const handleUf = (e: any) => {
    setValue("uf", e.target.value);
    setValue("city", "");
  };

  const handleCity = (e: any) => {
    setValue("city", e.target.value);
  };

  const handleTransmission = (e: any) => {
    setValue("transmission", e.targer.value);
  };

  const handleFuel = (e: any) => {
    setValue("fuel", e.target.value);
  };

  return (
    <ContainerComponent>
      <Spacer spacing={6} />

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

          {carImages.map((item) => (
            <DivX key={item.name}>
              <IconX onClick={() => handleDeleteImage(item)} />
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
            <InputForm
              errors={errors.name}
              {...register("name")}
              label="Marca"
              placeholder="Marca do veículo"
              id="name"
            />

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
              placeholder="2024"
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
          <ContainerInput>
            <ContainerSelect>
              <Label>Estado</Label>
              <Select
                {...register("uf")}
                onChange={handleUf}
                style={{
                  color: uf === "" ? "gray" : "black",
                  border: errors.uf && "2px solid #ff3030",
                }}
              >
                <Option disabled value={""} style={{ color: "gray" }}>
                  Estado
                </Option>
                {ufList.map((item, index) => (
                  <Option key={index} value={item.sigla}>
                    {item.nome}
                  </Option>
                ))}
              </Select>
            </ContainerSelect>

            <ContainerSelect>
              <Label>Cidade</Label>
              <Select
                {...register("city")}
                onChange={handleCity}
                style={{
                  color: city === "" ? "gray" : "black",
                  border: errors.city && "2px solid #ff3030",
                }}
              >
                <Option disabled value={""} style={{ color: "grey" }}>
                  Cidade
                </Option>
                {cityList.map((item, index) => (
                  <Option key={index} value={item.nome}>
                    {item.nome}
                  </Option>
                ))}
              </Select>
            </ContainerSelect>

            <InputForm
              errors={errors.whatsapp}
              {...register("whatsapp")}
              label="Telefone / Whatsapp"
              placeholder="Somente DDD e números"
              id="whatsapp"
              type="tel"
              maxLength={11}
            />
          </ContainerInput>

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

          <ButtonSendComponent2 title={"Cadastrar"} type="submit" />
        </Form>
      </Div>

      <Spacer spacing={6} />
    </ContainerComponent>
  );
};

export default New;
