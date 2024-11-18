import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div``;

export const Body = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;

  @media (max-width: 800px) {
    display: block;
  }
`;

export const Title = styled.h1`
  margin-bottom: 12px;
  text-align: center;
  font-size: 1.7rem;

  @media (max-width: 450px) {
    font-size: 24px;
  }
`;

export const Authentication = styled.form`
  padding: 16px;
  width: 40%;
  align-items: center;
  display: flex;
  flex-direction: column;
  border: 2px solid #ccc;
  border-radius: 8px;
  max-width: 620px;

  @media (max-width: 800px) {
    width: 100%;
    border: none;
    padding: 0;
    margin: auto;
  }
`;

export const BoxRecoverPassword = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
`;

export const RecoverPassword = styled(Link)`
  color: #3485ff;
  font-size: 14px;
`;
