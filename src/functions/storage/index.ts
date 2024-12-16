import { ChangeEvent } from "react";
import { toast } from "react-toastify";
import { v4 as uuidV4 } from "uuid";
import { IImageItemProps, IUser } from "../../interface";
import axiosService from "../../services/api";

/**
 * Deletar arquivos do storage.
 * @param item
 */
export const deleteImage = async (
  item: IImageItemProps,
  setCarImages: (value: React.SetStateAction<IImageItemProps[]>) => void,
  carImages: IImageItemProps[]
) => {
  const imagePath = `images/${item.uid}/${item.name}`;

  await axiosService
    .delete("/storage/deleteImage", { params: { imagePath } })
    .then(() => {
      setCarImages(carImages.filter((car) => car.url !== item.url));
    })
    .catch(() => toast.error("Erro ao deletar imagem."));
};

export const uploadStorage = async (
  image: File,
  user: IUser | null,
  setCarImages: (value: React.SetStateAction<IImageItemProps[]>) => void
) => {
  if (!user?.uid) {
    return;
  }

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

export const fileStorage = async (
  e: ChangeEvent<HTMLInputElement>,
  handleUploadStorage: (image: File) => Promise<void>
) => {
  if (e.target.files && e.target.files[0]) {
    const image = e.target.files[0];

    if (image.type === "image/jpeg" || image.type === "image/png") {
      await handleUploadStorage(image);
    } else {
      toast.error("Envie uma imagem jpeg ou png");
      return;
    }
  }
};
