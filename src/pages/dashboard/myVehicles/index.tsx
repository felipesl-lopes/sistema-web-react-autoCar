import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ContainerComponent } from "../../../components/Container";
import CarList from "../../../components/lists/carList";
import { AuthContext } from "../../../contexts/AuthContext";
import { ICarList } from "../../../interface";
import axiosService from "../../../services/api";
import { Title } from "./styled";
import { TitleDashboard } from "../styled";

export const MyVehicles: React.FunctionComponent = () => {
  const { emailVerified, user } = useContext(AuthContext);
  const [carList, setCarList] = useState<ICarList[]>([]);

  if (!emailVerified) {
    return <Navigate to={"/"} />;
  }

  useEffect(() => {
    (async () => {
      await axiosService
        .get("/firestore/carList")
        .then(({ data }) => {
          let list = [] as ICarList[];
          setCarList([]);
          data.forEach((doc: ICarList) => {
            if (user?.uid === doc.uidUser) {
              list.push({
                uidUser: doc.uidUser,
                id: doc.id,
                name: doc.name,
                year: doc.year,
                price: doc.price,
                city: doc.city,
                km: doc.km,
                images: doc.images,
                uf: doc.uf
              });
            }
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
      <TitleDashboard>Meus anúncios</TitleDashboard>

      <CarList
        carList={carList}
        messageListEmpty="Você não possui nenhum veículo para venda."
      />
    </ContainerComponent>
  );
};
