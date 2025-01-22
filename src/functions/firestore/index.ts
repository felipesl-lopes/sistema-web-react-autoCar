import { toast } from "react-toastify";
import { IFormNewCar, IUser } from "../../interface";
import axiosService from "../../services/api";

/**
 * Função que envia o formulário para o firestore e cria o anúncio do veículo.
 * @param data
 * @param carImages
 * @param setLoadingButton
 * @param user
 * @param reset
 * @param setCarImages
 * @returns
 */
export const createDocCarFirestore = async (
  listImages: {
    previewUrl: string;
    file: File;
  }[],
  data: IFormNewCar,
  setLoadingButton: (value: React.SetStateAction<boolean>) => void,
  user: IUser | null,
  reset: (values?: IFormNewCar) => void,
  setListImages: React.Dispatch<
    React.SetStateAction<
      {
        previewUrl: string;
        file: File;
      }[]
    >
  >
) => {
  if (listImages.length == 0) {
    alert("Anexe pelo menos uma imagem.");
    return;
  }

  setLoadingButton(true);

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("model", data.model);
  formData.append("whatsapp", user?.whatsapp as string);
  formData.append("city", user?.city as string);
  formData.append("uf", user?.uf as string);
  formData.append("year", data.year);
  formData.append("km", data.km);
  formData.append("price", data.price);
  formData.append("description", data.description);
  formData.append("created", new Date().toLocaleDateString());
  formData.append("owner", user?.name || "");
  formData.append("uidUser", user?.uid || "");
  formData.append("documentationStatus", data.documentationStatus);
  formData.append("engine", data.engine);
  formData.append("fuel", data.fuel);
  formData.append("generalCondition", data.generalCondition);
  formData.append("maintenanceHistory", data.maintenanceHistory);
  formData.append("transmission", data.transmission);

  listImages.forEach(({ file }) => {
    formData.append("images", file);
  });

  await axiosService
    .post("/storage/registerAd", formData)
    .then(async ({ data }) => {
      toast.success("Veículo cadastrado para venda com sucesso!");
      console.log(await data);
      reset();
      setListImages([]);
    })
    .catch((error) => {
      console.error(error.message);
      toast.error("Erro ao cadastrar veículo para venda.");
    })
    .finally(() => setLoadingButton(false));
};

/**
 * Função que busca os dados do veículo anunciado através do id.
 * @param id
 * @returns
 */
export const getDataAdFirestore = async (id: string) => {
  try {
    const { data } = await axiosService.get(`/firestore/carDetails/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};
