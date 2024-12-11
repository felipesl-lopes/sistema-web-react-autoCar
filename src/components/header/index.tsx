import React, { useContext } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import logo from "../../assets/logo-autocar.png";
import { AuthContext } from "../../contexts/AuthContext";
import { getErrorMessage } from "../../errors/authErrors";
import axiosService from "../../services/api";

const HeaderComponent: React.FunctionComponent = () => {
  const { signed, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirm = window.confirm("Você deseja realmente sair?");

    if (confirm) {
      axiosService
        .get("/auth/logout")
        .then(() => {
          setUser(null);
          navigate("/login");
        })
        .catch(async (error) => {
          toast.error(getErrorMessage(await error));
        });
    }
  };

  return (
    <Container>
      <Header>
        <Link to={"/"}>
          <Logo src={logo} alt="Logo do site" />
        </Link>

        <MenuNav>
          <TextButtonLink to={"/"}>Início</TextButtonLink>

          {signed && (
            <TextButtonLink to={"/dashboard"}>Meus interesses</TextButtonLink>
          )}

          {signed && (
            <TextButtonLink to={"/dashboard/new"}>Vender</TextButtonLink>
          )}

          {signed && (
            <TextButtonLink to={signed ? "/dashboard" : "/login"}>
              Perfil
            </TextButtonLink>
          )}

          {signed ? (
            <TextButtonLink onClick={handleLogout} to={"#"}>
              Sair
            </TextButtonLink>
          ) : (
            <TextButtonLink to={"/login"}>Entrar</TextButtonLink>
          )}
        </MenuNav>
        <Menu />
      </Header>
    </Container>
  );
};

export default HeaderComponent;

const Container = styled.div`
  background-color: #0f081e;
  padding: 6px 12px;
  box-shadow: 0 0 4px;
  height: 56px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  height: 100%;
`;

const Logo = styled.img`
  display: flex;
  width: 100px;
  aspect-ratio: 16 / 6;
  object-fit: contain;
`;

const MenuNav = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 360px) {
    display: none;
  }
`;

const TextButtonLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 0.8em;
  margin-left: 20px;
  transition: 0.5s;

  &:hover {
    color: #fef49c;
  }

  &:active {
    color: #b07223;
  }
`;

const Menu = styled(FiMenu)`
  display: none;
  color: white;
  font-size: 20px;

  @media (max-width: 360px) {
    display: flex;
  }
`;
