import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ContainerComponent } from "../../../components/Container";
import CarList from "../../../components/lists/carList";
import { AuthContext } from "../../../contexts/AuthContext";
import { ICarList } from "../../../interface";
import axiosService from "../../../services/api";
import { TitleDashboard } from "../styled";

export const MyFavorites: React.FunctionComponent = () => {
  const { emailVerified, user } = useContext(AuthContext);
  const [carList, setCarList] = useState<ICarList[]>([]);

  if (!emailVerified) {
    return <Navigate to={"/"} />;
  }

  useEffect(() => {
    (async () => {
      const uidUser = user?.uid;
      await axiosService
        .get("/firestore/carList/favorites", { params: { uidUser } })
        .then(({ data }) => {
          let list = [] as ICarList[];
          setCarList([]);
          data.forEach((doc: ICarList) => {
            list.push({
              uidUser: doc.uidUser,
              id: doc.id,
              name: doc.name,
              year: doc.year,
              price: doc.price,
              city: doc.city,
              km: doc.km,
              images: doc.images,
              uf: doc.uf,
            });
          });
          setCarList(list);
        })
        .catch(() => {
          toast.error("Erro ao exibir veículos");
        });
      return;
    })();
  }, []);

  return (
    <ContainerComponent>
      <TitleDashboard>Meus favoritos</TitleDashboard>

      <CarList
        carList={carList}
        messageListEmpty="Você não favoritou nenhum veículo."
      />
    </ContainerComponent>
  );
};
