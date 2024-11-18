import React, { ReactNode } from "react";
import styled from "styled-components";

interface IProps {
  children: ReactNode;
}

export const ContainerComponent: React.FunctionComponent<IProps> = ({
  children,
}) => {
  return (
    <Container1>
      <Container>{children}</Container>
    </Container1>
  );
};

const Container1 = styled.div`
  padding: 0 12px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
`;
