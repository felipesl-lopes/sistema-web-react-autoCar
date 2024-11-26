import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ContainerComponent } from "../../components/Container";

const Dashboard: React.FunctionComponent = () => {
  const { user } = useContext(AuthContext);

  return (
    <ContainerComponent>
      <div>
        <Link to={"/dashboard/new"}>Cadastrar veículo</Link>
        {user && <p>{user.name}</p>}
        <h1>Painel</h1>
      </div>
    </ContainerComponent>
  );
};

export default Dashboard;
