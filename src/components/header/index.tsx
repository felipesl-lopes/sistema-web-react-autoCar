import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo-autocar.png";
import { AuthContext } from "../../contexts/AuthContext";
import { auth } from "../../services/firebase";
import { FiMenu } from "react-icons/fi";

const HeaderComponent: React.FunctionComponent = () => {
  const { signed } = useContext(AuthContext);

  const handleLogout = async () => {
    const confirm = window.confirm("Você deseja realmente sair?");

    if (confirm) {
      await signOut(auth)
        .then(() => {})
        .catch(() => {
          alert("Erro ao deslogar.");
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
          <TextButtonLink to={signed ? "/dashboard" : "/login"}>
            Comprar
          </TextButtonLink>

          <TextButtonLink to={signed ? "/dashboard/new" : "/login"}>
            Vender
          </TextButtonLink>

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
  display: block;
  width: 90px;
  object-fit: contain;
  margin: 0;
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
