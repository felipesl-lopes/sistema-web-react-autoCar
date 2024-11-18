import React from "react";
import styled from "styled-components";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onChange?: () => void;
}

export const ButtonSendComponent: React.FunctionComponent<IProps> = ({
  title,
  onChange,
  ...otherProps
}) => {
  return (
    <Container onClick={onChange} {...otherProps}>
      <Title>{title}</Title>
    </Container>
  );
};

const Container = styled.button`
  border-radius: 4px;
  width: 100%;
  background-color: #3485ff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #237bff;
    transition-duration: 0.5s;
  }

  &:active {
    background-color: #0066ff;
    transition-duration: 0.5s;
  }
`;

const Title = styled.p`
  padding: 10px;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
`;
