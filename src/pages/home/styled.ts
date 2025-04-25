import styled from "styled-components";

export const ContainerHome = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
`;

export const ContainerSearch = styled.form`
  width: 90%;
  display: flex;
  background-color: #fff;
  border-radius: 4px;
  background-color: #fff;
  padding: 12px;
  margin: 0 auto;

  @media (max-width: 350px) {
    display: block;
  }
`;

export const InputSearch = styled.input`
  flex: 1;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #666;

  @media (max-width: 350px) {
    width: 100%;
    margin-bottom: 12px;
  }
`;

export const ButtonSearch = styled.button`
  margin-left: 8px;
  padding: 6px 8px;
  background-color: #3485ff;
  color: #fff;
  border-radius: 4px;
  border: 0;
  cursor: pointer;

  @media (max-width: 350px) {
    width: 100%;
    margin: auto;
  }

  &:hover {
    background-color: rgb(30, 120, 255);
  }
`;

export const Title = styled.h1`
  text-align: center;
  font-size: clamp(1rem, 4vw, 1.3rem);
`;

export const TextResult = styled.p`
  text-align: center;
`;
