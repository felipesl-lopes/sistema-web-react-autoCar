import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 100%; 
  }

  @media (max-width: 768px) {
    html {
      font-size: 90%;
    }
  }

  @media (max-width: 480px) {
    html {
      font-size: 80%; 
    }
  }
`;

export default GlobalStyle;
