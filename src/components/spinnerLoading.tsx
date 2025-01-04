import React from "react";
import styled, { keyframes } from "styled-components";

interface IProps {
  size: number;
}

export const SpinnerLoading: React.FunctionComponent<IProps> = ({ size }) => {
  return (
    <Spinner
      style={{
        height: size,
        width: size,
      }}
    ></Spinner>
  );
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 3px solid #ccc;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
