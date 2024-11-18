import React from "react";
import styled from "styled-components";

export const ScreenLoading: React.FunctionComponent = () => {
  return (
    <Overlay>
      <Text>Carregando...</Text>
    </Overlay>
  );
};

const Overlay = styled.div`
  background-color: rgba(100, 100, 100, 0.5);
  height: calc(100vh - 56px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p``;
