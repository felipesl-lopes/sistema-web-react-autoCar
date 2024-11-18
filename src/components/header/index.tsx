import { signOut } from "firebase/auth";
import React, { useContext, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo-autocar.png";
import { AuthContext } from "../../contexts/AuthContext";
import { auth } from "../../services/firebase";

const HeaderComponent: React.FunctionComponent = () => {
  const { signed } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

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

        <MenuNav menuOpen={menuOpen}>
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

        <MenuIcon onClick={() => setMenuOpen(!menuOpen)} />
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
  width: 40%;
  aspect-ratio: 16 / 6;
  object-fit: contain;
  margin: 0;
`;

// const MenuNav = styled.nav`
//   display: flex;
//   align-items: center;

//   @media (max-width: 550px) {
//     display: none;
//   }
// `;

const MenuNav = styled.nav<{ menuOpen: boolean }>`
  display: flex;
  align-items: center;

  @media (max-width: 550px) {
    display: ${({ menuOpen }) => (menuOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 56px;
    right: 0;
    background-color: #0f081e;
    width: 100%;
    z-index: 1000;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
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

const MenuIcon = styled(FiMenu)`
  display: none;
  color: white;
  font-size: 24px;

  &:hover {
    color: #fef49c;
  }

  &:active {
    color: #b07223;
  }

  @media (max-width: 550px) {
    display: flex;
  }
`;
