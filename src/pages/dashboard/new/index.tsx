import { zodResolver } from "@hookform/resolvers/zod";
import React, { ChangeEvent, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import { v4 as uuidV4 } from "uuid";
import { z } from "zod";
import { ButtonSendComponent2 } from "../../../components/buttonSendComponent";
import { ContainerComponent } from "../../../components/Container";
import { InputForm } from "../../../components/inputForm";
import { Spacer } from "../../../components/spacer";
import { AuthContext } from "../../../contexts/AuthContext";
import { IFormNewCar } from "../../../interface";
import axiosService from "../../../services/api";
import {
  ButtonFile,
  ContainerInput,
  ContainerTextArea,
  Div,
  DivImage,
  DivX,
  Form,
  IconX,
  ImageCar,
  InputFile,
  LabelTextArea,
  TextArea,
} from "./styled";

interface IImageItemProps {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}

const New: React.FunctionComponent = () => {
  const { user, setLoadingButton } = useContext(AuthContext);
  const [carImages, setCarImages] = useState<IImageItemProps[]>([]);
  const [load, setLoad] = useState(false);

  const schema = z.object({
    name: z.string().min(1),
    model: z.string().min(1),
    year: z.string().min(1),
    km: z.string().min(1),
    price: z.string().min(1),
    city: z.string().min(1),
    whatsapp: z.string().min(1),
    description: z.string().min(1),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormNewCar>({
    resolver: zodResolver(schema),
  });

  /**
   * Cadastrar veículo.
   * @param data
   * @returns
   */
  const onSubmit = async (data: IFormNewCar) => {
    if (carImages.length == 0) {
      alert("Anexe pelo menos uma imagem.");
      return;
    }

    setLoadingButton(true);

    const carListImages = carImages.map((car) => {
      return {
        uid: car.uid,
        name: car.name,
        url: car.url,
      };
    });

    let dataUser = {
      name: data.name,
      model: data.model,
      whatsapp: data.whatsapp,
      city: data.city,
      year: data.year,
      km: data.km,
      price: data.price,
      description: data.description,
      created: new Date(),
      owner: user?.name,
      uidUser: user?.uid,
      images: carListImages,
    };

    await axiosService
      .post("/firestore/registerCar", dataUser)
      .then(() => {
        toast.success("Veículo cadastrado para venda com sucesso!");
        reset();
        setCarImages([]);
      })
      .catch(() => {
        toast.error("Erro ao cadastrar veículo para venda.");
      })
      .finally(() => {
        setLoadingButton(false);
      });
  };

  /**
   * Adicionar arquivos no inputFile.
   * @param e
   * @returns
   */
  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        await handleUpload(image);
      } else {
        toast.error("Envie uma imagem jpeg ou png");
        return;
      }
    }
  };

  /**
   * Adicionar arquivos no storage.
   * @param image
   * @returns
   */
  const handleUpload = async (image: File) => {
    if (!user?.uid) {
      return;
    }

    setLoad(true);

    const currentUid = user?.uid;
    const uidImage = uuidV4();

    const formData = new FormData();
    formData.append("currentUid", currentUid);
    formData.append("uidImage", uidImage);
    formData.append("image", image);

    await axiosService
      .post("/storage/uploadBytes", formData)
      .then(({ data }) => {
        let imageItem = {
          name: uidImage,
          uid: currentUid,
          previewUrl: URL.createObjectURL(image),
          url: data,
        };
        setCarImages((images) => [...images, imageItem]);
      })
      .catch(() => {
        toast.error("Erro ao fazer upload da imagem.");
      });
  };

  /**
   * Deletar arquivos do storage.
   * @param item
   */
  const handleDeleteImage = async (item: IImageItemProps) => {
    const imagePath = `images/${item.uid}/${item.name}`;

    await axiosService
      .delete("/storage/deleteImage", { params: { imagePath } })
      .then(() => setCarImages(carImages.filter((car) => car.url !== item.url)))
      .catch((error) => {
        console.log(error.response.data.code);
        toast.error("Erro ao deletar imagem.");
      });
  };

  /**
   * Limitar 10 arquivos para registro.
   * @param e
   */
  const maxImages = (e: React.MouseEvent<HTMLInputElement>) => {
    if (carImages.length >= 10) {
      e.preventDefault();
      toast.info("Você só pode adicionar até 10 imagens.");
    }
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
              onChange={handleFile}
              onClick={maxImages}
            />
          </ButtonFile>

          {carImages.map((item) => (
            <DivX key={item.name}>
              <IconX onClick={() => handleDeleteImage(item)} />
              {load && <p>Carregando</p>}
              <ImageCar
                onLoad={() => setLoad(false)}
                src={item.previewUrl}
                alt="Imagem do veículo"
              />
            </DivX>
          ))}
        </DivImage>
      </Div>

      <Spacer spacing={2} />

      <Div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            errors={errors.name}
            {...register("name")}
            label="Marca"
            placeholder="Marca do veículo"
            id="name"
          />

          <ContainerInput>
            <InputForm
              errors={errors.model}
              {...register("model")}
              label="Modelo"
              placeholder="Modelo do veículo"
              id="model"
            />

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

          <ContainerInput>
            <InputForm
              errors={errors.city}
              {...register("city")}
              label="Cidade"
              placeholder="Sua cidade"
              id="city"
              autoComplete="address-level1"
            />

            <InputForm
              errors={errors.whatsapp}
              {...register("whatsapp")}
              label="Telefone / Whatsapp"
              placeholder="(xx) xxxxx-xxxx"
              id="whatsapp"
              type="tel"
            />
          </ContainerInput>

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

          <ButtonSendComponent2 title="Cadastrar" type="submit" />
        </Form>
      </Div>
    </ContainerComponent>
  );
};

export default New;
