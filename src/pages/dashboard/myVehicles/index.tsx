import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ContainerComponent } from "../../../components/Container";
import CarList from "../../../components/lists/carList";
import { AuthContext } from "../../../contexts/AuthContext";
import { ICarList } from "../../../interface";
import { firestore } from "../../../services/firebase";
import { Title } from "./styled";

export const MyVehicles: React.FunctionComponent = () => {
  const { emailVerified, user } = useContext(AuthContext);
  const [carList, setCarList] = useState<ICarList[]>([]);

  if (!emailVerified) {
    return <Navigate to={"/"} />;
  }

  useEffect(() => {
    (async () => {
      const carRef = collection(firestore, "cars");
      const queryRef = query(carRef, where("uid", "==", user?.uid));

      getDocs(queryRef).then((snapshot) => {
        let list = [] as ICarList[];
        setCarList([]);
        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            name: doc.data().name,
            year: doc.data().year,
            uid: doc.data().uid,
            price: doc.data().price,
            city: doc.data().city,
            km: doc.data().km,
            images: doc.data().images,
          });
        });

        setCarList(list);
      });
    })();
  }, []);

  return (
    <ContainerComponent>
      <Title>Meus veículos a venda:</Title>
      <CarList carList={carList} />
    </ContainerComponent>
  );
};
