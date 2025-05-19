import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../styles/theme";

interface IProps {
  title: string;
  link: string;
}

export const ButtonNavigateComponent: React.FunctionComponent<IProps> = ({
  title,
  link,
}) => {
  return (
    <Container>
      <Title to={link}>{title}</Title>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: ${theme.padding.p12};
`;

const Title = styled(Link)`
  color: ${theme.colors.buttonFixed};
  font-weight: bold;
  text-decoration: none;
  font-size: ${theme.fontSize.fs14};

  &:hover {
    color: #d79e38;
    transition-duration: 0.5s;
  }

  &:active {
    color: ${theme.colors.buttonHover};
    transition-duration: 0.5s;
  }
`;
