import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { ContainerComponent } from "../../components/Container";
import { collection, getDoc } from "firebase/firestore";
import { firestore } from "../../services/firebase";

const CarDetails: React.FunctionComponent = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  // useEffect(() => {
  //   (async () => {
  //     const carRef = collection(firestore, "cars");

  //     await getDoc(carRef, {})
  //   })();
  // }, []);

  console.log(id);
  console.log(user?.uid);

  return (
    <ContainerComponent>
      <h1>Detalhes</h1>
    </ContainerComponent>
  );
};

export default CarDetails;
