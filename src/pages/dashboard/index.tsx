import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ContainerComponent } from "../../components/Container";
import { AuthContext } from "../../contexts/AuthContext";

const Dashboard: React.FunctionComponent = () => {
  const { user, emailVerified } = useContext(AuthContext);

  return (
    <ContainerComponent>
      <div>
        {user && <p>{user.name}</p>}
        {emailVerified ? (
          <Link to={"/dashboard/meus-veiculos"}>Meus veículos</Link>
        ) : (
          <Link
            to={`/verificar-email?email=${encodeURIComponent(
              user?.email as string
            )}&checkEmail=true`}
          >
            Verifique sua conta para vender
          </Link>
        )}

        {!emailVerified && (
          <h2>
            Verifique o seu e-mail{" "}
            <Link
              to={`/verificar-email?email=${encodeURIComponent(
                user?.email as string
              )}&checkEmail=true`}
            >
              agora
            </Link>
            .
          </h2>
        )}
      </div>
    </ContainerComponent>
  );
};

export default Dashboard;
