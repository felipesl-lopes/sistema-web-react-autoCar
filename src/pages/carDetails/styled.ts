import styled from "styled-components";

export const Main = styled.main`
  display: grid;
  background-color: #fff;
  padding: 12px;
  border-radius: 4px;
`;

export const Title = styled.h1`
  font-size: 24px;
`;

export const DivInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TitleData = styled.strong`
  color: #666;
  margin-bottom: 12px;
`;

export const TextInfo = styled.h3`
  font-size: 22px;
`;

export const DivInfoBasic = styled.div`
  display: flex;
  gap: 5%;
`;

export const DivInfoConditions = styled.div`
  div {
    display: flex;
    margin-bottom: 4px;
    margin-left: 4px;
  }

  p {
    margin-left: 4px;
  }
`;

export const ContainerAlign = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 4px;
`;

export const Text = styled.p`
  font-size: 14px;
`;

export const Data = styled.strong`
  font-size: 14px;
`;

export const CallButton = styled.a`
  background-color: #25d366;
  color: white;
  align-items: center;
  justify-content: center;
  display: flex;
  height: 38px;
  border-radius: 4px;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  cursor: pointer;

  svg {
    margin-left: 8px;
    font-size: 20px;
  }
`;
