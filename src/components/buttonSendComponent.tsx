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

export const ButtonSendComponent2: React.FunctionComponent<IProps> = ({
  title,
  onChange,
  ...otherProps
}) => {
  return (
    <Container2 onClick={onChange} {...otherProps}>
      <Title>{title}</Title>
    </Container2>
  );
};

const Container = styled.button`
  border-radius: 4px;
  width: 100%;
  background-color: #3485ff;
  border: none;
  cursor: pointer;
  transition-duration: 0.5s;

  &:hover {
    background-color: #237bff;
  }

  &:active {
    background-color: #0066ff;
  }
`;

const Container2 = styled.button`
  border-radius: 4px;
  width: 100%;
  background-color: #0f081e;
  border: none;
  cursor: pointer;
  transition-duration: 0.5s;

  &:hover {
    background-color: #2b1753;
  }

  &:active {
    background-color: #0f081e;
  }
`;

const Title = styled.p`
  padding: 10px;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
`;
