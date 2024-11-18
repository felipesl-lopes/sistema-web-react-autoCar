import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  padding: 10px;
`;

const Title = styled(Link)`
  color: #3485ff;
  font-weight: bold;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    color: #237bff;
    transition-duration: 0.5s;
  }

  &:active {
    color: #0066ff;
    transition-duration: 0.5s;
  }
`;
