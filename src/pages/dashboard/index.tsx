import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Dashboard: React.FunctionComponent = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Link to={"/dashboard/new"}>Cadastrar veículo</Link>
      {user && <p>{user.name}</p>}
      <h1>Painel</h1>
    </div>
  );
};

export default Dashboard;
