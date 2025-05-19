import React, { useContext, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import logo from "../../assets/logo-autocar.png";
import { AuthContext } from "../../contexts/AuthContext";
import { getErrorMessage } from "../../errors/authErrors";
import axiosService from "../../services/api";
import theme from "../../styles/theme";

const HeaderComponent: React.FunctionComponent = () => {
  const { signed, setUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const authPaths = [
    "/login",
    "/register",
    "/recoverPassword",
    "/verificar-email",
  ];
  const isAuth = authPaths.includes(location.pathname);

  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
    <Container isOpen={menuOpen}>
      <Header>
        <div>
          <Link to={"/"}>
            <Logo src={logo} alt="Logo do site" />
          </Link>

          <Menu onClick={toggleMenu} />
        </div>

        <MenuNav
          isOpen={menuOpen}
          style={{ display: isAuth ? "none" : "flex" }}
        >
          <TextButtonLink to={"/"} onClick={() => setMenuOpen(false)}>
            Início
          </TextButtonLink>

          {signed && (
            <TextButtonLink
              to={"/dashboard/meus-favoritos"}
              onClick={() => setMenuOpen(false)}
            >
              Meus favoritos
            </TextButtonLink>
          )}

          {signed && (
            <TextButtonLink
              to={"/dashboard/new"}
              onClick={() => setMenuOpen(false)}
            >
              Vender
            </TextButtonLink>
          )}

          {signed && (
            <TextButtonLink
              to={signed ? "/dashboard" : "/login"}
              onClick={() => setMenuOpen(false)}
            >
              Perfil
            </TextButtonLink>
          )}

          {signed ? (
            <TextButtonLink
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              to={"#"}
            >
              Sair
            </TextButtonLink>
          ) : (
            <TextButtonLink to={"/login"} onClick={() => setMenuOpen(false)}>
              Entrar
            </TextButtonLink>
          )}
        </MenuNav>
      </Header>
    </Container>
  );
};

export default HeaderComponent;

const Container = styled.div<{ isOpen: boolean }>`
  background-color: ${theme.colors.darkBlue};
  padding: ${theme.padding.p8} ${theme.padding.p12};
  transition: height 0.3s ease;
  height: ${({ isOpen }) => (isOpen ? "auto" : "56px")};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  height: 100%;

  @media (max-width: 380px) {
    flex-direction: column;

    div {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

const Logo = styled.img`
  display: flex;
  width: 100px;
  aspect-ratio: 16 / 6;
  object-fit: contain;
`;

const MenuNav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;

  @media (max-width: 380px) {
    flex-direction: column;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    width: 100%;
    margin-top: ${theme.pixels.px12};
  }
`;

const TextButtonLink = styled(Link)`
  text-decoration: none;
  color: ${theme.colors.white};
  font-size: 0.8em;
  margin-left: ${theme.pixels.px12};

  &:hover {
    color: ${theme.colors.textHover};
  }

  &:active {
    color: ${theme.colors.buttonHover};
  }

  @media (max-width: 380px) {
    padding-bottom: ${theme.pixels.px8};
  }
`;

const Menu = styled(FiMenu)`
  display: none;
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.fs20};
  cursor: pointer;

  @media (max-width: 380px) {
    display: flex;
  }
`;
