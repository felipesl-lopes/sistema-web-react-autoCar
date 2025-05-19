import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";
import theme from "../styles/theme";
import { SpinnerLoading } from "./spinnerLoading";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onChange?: () => void;
  disable?: boolean;
}

export const ButtonSendComponent: React.FunctionComponent<IProps> = ({
  title,
  onChange,
  disable,
  ...otherProps
}) => {
  const { loadingButton } = useContext(AuthContext);

  return (
    <Container onClick={onChange} disabled={disable} {...otherProps}>
      {loadingButton ? <SpinnerLoading size={20} /> : <Title>{title}</Title>}
    </Container>
  );
};

const Container = styled.button`
  border-radius: ${theme.borderRadius.radius4};
  width: 100%;
  background-color: ${theme.colors.buttonFixed};
  border: none;
  cursor: pointer;
  transition-duration: 0.5s;
  height: 38px;
  justify-content: center;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #d79e38;
  }

  &:active {
    background-color: ${theme.colors.buttonHover};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: rgba(0, 0, 0, 0.2);

    &:hover,
    &:active {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

const Title = styled.p`
  padding: ${theme.padding.p12};
  color: ${theme.colors.white};
  font-weight: bold;
  font-size: ${theme.fontSize.fs14};
  overflow-wrap: break-word;
`;
