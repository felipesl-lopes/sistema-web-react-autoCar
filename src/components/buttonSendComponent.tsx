import React, { useContext } from "react";
import styled from "styled-components";
import { SpinnerLoading } from "./spinnerLoading";
import { AuthContext } from "../contexts/AuthContext";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onChange?: () => void;
}

export const ButtonSendComponent: React.FunctionComponent<IProps> = ({
  title,
  onChange,
  ...otherProps
}) => {
  const { loadingButton } = useContext(AuthContext);

  return (
    <Container onClick={onChange} {...otherProps}>
      {loadingButton ? <SpinnerLoading size={20} /> : <Title>{title}</Title>}
    </Container>
  );
};

export const ButtonSendComponent2: React.FunctionComponent<IProps> = ({
  title,
  onChange,
  ...otherProps
}) => {
  const { loadingButton } = useContext(AuthContext);

  return (
    <Container2 onClick={onChange} {...otherProps}>
      {loadingButton ? <SpinnerLoading size={20} /> : <Title>{title}</Title>}
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
  height: 38px;
  justify-content: center;
  display: flex;
  align-items: center;

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
  height: 38px;
  justify-content: center;
  display: flex;
  align-items: center;

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
  overflow-wrap: break-word;
`;
