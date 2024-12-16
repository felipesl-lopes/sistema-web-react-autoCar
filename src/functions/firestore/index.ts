import { toast } from "react-toastify";
import { IFormNewCar, IImageItemProps, IUser } from "../../interface";
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
  data: IFormNewCar,
  carImages: IImageItemProps[],
  setLoadingButton: (value: React.SetStateAction<boolean>) => void,
  user: IUser | null,
  reset: (values?: IFormNewCar) => void,
  setCarImages: React.Dispatch<React.SetStateAction<IImageItemProps[]>>
) => {
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
    uf: data.uf,
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
