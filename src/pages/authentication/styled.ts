import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div``;

export const Body = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${theme.padding.p20};
  justify-content: center;
  margin-top: 10vh;

  @media (max-width: 800px) {
    display: block;
    margin-top: 0;
  }
`;

export const Title = styled.h2`
  margin-bottom: ${theme.pixels.px12};
  text-align: center;

  @media (max-width: 450px) {
    font-size: ${theme.fontSize.fs24};
  }

  @media (max-width: 210px) {
    word-break: break-all;
  }
`;

export const Authentication = styled.form`
  padding: ${theme.padding.p16};
  width: 40%;
  align-items: center;
  display: flex;
  flex-direction: column;
  border: 2px solid #ccc;
  border-radius: ${theme.borderRadius.radius8};
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
  color: ${theme.colors.gray};
  font-size: ${theme.fontSize.fs14};
`;
