import { zodResolver } from "@hookform/resolvers/zod";
import React, { ChangeEvent, useContext, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FiImage, FiTrash, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import styled from "styled-components";
import { z } from "zod";
import { ButtonSendComponent } from "../../../../components/buttonSendComponent";
import { Spacer } from "../../../../components/spacer";
import { AuthContext } from "../../../../contexts/AuthContext";
import axiosService from "../../../../services/api";

interface IProps {
  imagePreview: string;
}

export const Photo: React.FunctionComponent = () => {
  const { user, setLoadingButton } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState<File>();

  const schema = z.object({
    imagePreview: z.string(),
  });

  const defaultValues = useMemo(
    () => ({
      imagePreview: user?.urlPhoto || "",
    }),
    [user?.urlPhoto]
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty },
  } = useForm<IProps>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const imagePreview = watch("imagePreview");

  const handleFileStorage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFile(e.target.files?.[0]);

    if (file?.type === "image/jpeg" || file?.type === "image/png") {
      const previewUrl = URL.createObjectURL(file);
      setValue("imagePreview", previewUrl, { shouldDirty: true });
    } else {
      toast.error("Envie uma imagem jpeg ou png");
      return;
    }
  };

  const handleDeleteImage = async () => {
    setValue("imagePreview", "", { shouldDirty: true });
    setImageFile(undefined);
  };

  const handleUpdatePhotoUser = async () => {
    const currentUid = user?.uid;
    setLoadingButton(true);

    if (!imagePreview) {
      await axiosService
        .delete("/storage/deletePhotoUser", { data: { uid: user?.uid } })
        .then(() => window.location.reload())
        .catch(() => toast.error("Erro ao tentar deletar foto."))
        .finally(() => setLoadingButton(false));
      return;
    }

    const formData = new FormData();
    formData.append("currentUid", currentUid as string);
    formData.append("image", imageFile as File);

    await axiosService
      .post("/storage/updatePhotoUser", formData)
      .then(() => window.location.reload())
      .catch(() => console.log("Erro ao salvar foto."))
      .finally(() => setLoadingButton(false));
  };

  return (
    <Form onSubmit={handleSubmit(handleUpdatePhotoUser)}>
      <div>
        <ComponentImage>
          {imagePreview ? <Image src={imagePreview} /> : <FiUser size={150} />}
        </ComponentImage>

        <Spacer spacing={8} />

        {!imagePreview ? (
          <ContainerButtons>
            <ButtonImg>
              <FiImage /> Adicionar foto
              <InputFile
                {...register("imagePreview")}
                type="file"
                accept="image/*"
                onChange={handleFileStorage}
              />
            </ButtonImg>
          </ContainerButtons>
        ) : (
          <ContainerButtons>
            <ButtonImg>
              <FiImage /> <p>Trocar foto</p>
              <InputFile
                type="file"
                accept="image/*"
                onChange={handleFileStorage}
              />
            </ButtonImg>

            <ButtonImg onClick={handleDeleteImage}>
              <FiTrash /> <p>Excluir foto</p>
            </ButtonImg>
          </ContainerButtons>
        )}
      </div>

      <Spacer spacing={10} />

      <ButtonSendComponent title="Salvar" disable={!isDirty} />
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex: 1;
  justify-content: space-between;
  flex-direction: column;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const ComponentImage = styled.div`
  background-color: #fff;
  border-radius: 100px;
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: auto;

  svg {
    display: flex;
  }
`;

const ContainerButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 70%;
  margin: auto;

  @media (max-width: 550px) {
    flex-direction: column;
    align-items: center;

    button {
      &:first-of-type {
        margin-bottom: 16px;
      }
    }
  }
`;

const ButtonImg = styled.button`
  width: 160px;
  padding: 8px 12px;
  border-radius: 2px;
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  position: relative;
  transition: 0.3s;
  flex-shrink: 0;

  svg {
    font-size: 16px;
    margin-right: 6px;
  }

  &:hover {
    background-color: #e3e3e3;
  }
`;

const Image = styled.img`
  object-fit: cover;
  border-radius: 100px;
  width: 200px;
  height: 200px;
`;

const InputFile = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  opacity: 0;
  z-index: 1;
`;
