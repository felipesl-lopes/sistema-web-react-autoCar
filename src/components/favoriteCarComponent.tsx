import React, { useContext, useEffect, useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { toast } from "react-toastify";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";
import axiosService from "../services/api";
import theme from "../styles/theme";

interface IProps {
  id: string | undefined;
}

const FavoriteCarComponent: React.FunctionComponent<IProps> = ({ id }) => {
  const [favorite, setFavorite] = useState(false);
  const { user, emailVerified } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (!user?.uid || !id) return;

      await axiosService
        .get("/firestore/favorite", {
          params: {
            uidUser: user.uid,
            idCar: id,
          },
        })
        .then(({ data }) => setFavorite(data.favorite))
        .catch(() => setFavorite(false));
    })();
  }, [user?.uid, id]);

  const handleFavorite = async () => {
    if (!emailVerified) {
      toast.error("Verifique seu e-mail para favoritar veículos.");
      return;
    }

    setFavorite(!favorite);
    const data = { uidUser: user?.uid, idCar: id };
    if (favorite /** Se estiver favorito, então desfavorite */) {
      await axiosService.delete("/firestore/favorite", { data }).then(() => {
        toast.info("Veículo removido dos favoritos.");
      });
    } /** Se estiver desfavorito, então favorite */ else {
      await axiosService.post("/firestore/favorite", data).then(() => {
        toast.info("Veículo salvo em favoritos.");
      });
    }
  };

  return (
    <Container onClick={handleFavorite}>
      {favorite ? <IconFavorite /> : <IconUnfavorite />}
      <Text>{favorite ? "Remover veículo" : "Salvar veículo"}</Text>
    </Container>
  );
};

export default FavoriteCarComponent;

const Container = styled.div`
  position: absolute;
  top: ${theme.pixels.px12};
  left: ${theme.pixels.px12};
  z-index: 10;
  display: flex;
  align-items: center;
  padding: ${theme.pixels.px8} ${theme.pixels.px12};
  border-radius: ${theme.borderRadius.radius8};
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: none;
  cursor: pointer;
`;

const IconFavorite = styled(IoMdHeart)`
  font-size: ${theme.fontSize.fs24};
  color: red;
`;

const IconUnfavorite = styled(IoMdHeartEmpty)`
  font-size: ${theme.fontSize.fs24};
  color: red;
`;

const Text = styled.p`
  color: white;
  margin-left: ${theme.pixels.px4};
`;
