import styled from "styled-components";

export const Title = styled.h2``;

export const Container = styled.div`
  border: solid gray 1px;
  padding: 12px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
`;

export const ContainerTabButtons = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TabButton = styled.button`
  border: none;
  text-align: start;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
  background-color: transparent;
  cursor: pointer;
`;

export const ContainerTabIten = styled.div`
  display: flex;
  flex: 1;
  max-width: 500px;
  margin: 0 auto;
`;
