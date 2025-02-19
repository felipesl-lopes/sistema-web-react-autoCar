import styled from "styled-components";

export const TitleDashboard = styled.h2`
  margin: 24px 0;
  text-align: center;
`;

export const Container = styled.div`
  border: solid gray 1px;
  padding: 12px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const ContainerTabButtons = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 700px) {
    align-items: center;
    margin-bottom: 20px;
  }
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

  @media (max-width: 700px) {
    width: 100%;
  }
`;
