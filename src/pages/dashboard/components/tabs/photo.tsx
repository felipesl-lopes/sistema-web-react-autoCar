import React, { ChangeEvent, useContext, useState } from "react";
import { FiImage, FiTrash, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import styled from "styled-components";
import { ButtonSendComponent } from "../../../../components/buttonSendComponent";
import { Spacer } from "../../../../components/spacer";
import { AuthContext } from "../../../../contexts/AuthContext";
import axiosService from "../../../../services/api";

export const Photo: React.FunctionComponent = () => {
  const { user, setLoadingButton } = useContext(AuthContext);
  const [imagePreview, setImagePreview] = useState(user?.urlPhoto || "");
  const [imageFile, setImageFile] = useState<File>();

  const handleFileStorage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFile(e.target.files?.[0]);

    if (file?.type === "image/jpeg" || file?.type === "image/png") {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      toast.error("Envie uma imagem jpeg ou png");
      return;
    }
  };

  const handleDeleteImage = async () => {
    setImagePreview("");
    setImageFile(undefined);
  };

  const handleUpdatePhotoUser = async () => {
    if (!imagePreview && !user?.urlPhoto) {
      toast.info("Não tem imagem.");
      return;
    }

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
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleUpdatePhotoUser();
      }}
    >
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
                type="file"
                accept="image/*"
                onChange={handleFileStorage}
              />
            </ButtonImg>
          </ContainerButtons>
        ) : (
          <ContainerButtons>
            <ButtonImg>
              <FiImage /> Trocar foto
              <InputFile
                type="file"
                accept="image/*"
                onChange={handleFileStorage}
              />
            </ButtonImg>

            <ButtonImg onClick={handleDeleteImage}>
              <FiTrash /> Excluir foto
            </ButtonImg>
          </ContainerButtons>
        )}
      </div>

      <Spacer spacing={10} />

      <ButtonSendComponent title="Salvar" />
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex: 1;
  justify-content: space-between;
  flex-direction: column;
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
