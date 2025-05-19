import styled from "styled-components";
import theme from "../../styles/theme";

export const Main = styled.main`
  display: grid;
  background-color: ${theme.colors.white};
  padding: ${theme.padding.p12};
  border-radius: ${theme.borderRadius.radius4};
`;

export const SliderCar = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  max-height: 500px;
`;

export const Title = styled.h1`
  font-size: ${theme.fontSize.fs24};
`;

export const FavoriteWrapper = styled.div`
  position: relative;
`;

export const DivInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${theme.pixels.px12};
`;

export const TitleData = styled.strong`
  color: ${theme.colors.black};
  margin-bottom: ${theme.pixels.px12};
`;

export const TextInfo = styled.h2`
  color: ${theme.colors.black};
`;

export const DivInfoBasic = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 420px) {
    display: block;
    grid-column: ${theme.pixels.px12};
  }
`;

export const DivInfoConditions = styled.div`
  div {
    display: flex;
    margin-bottom: ${theme.pixels.px4};
    margin-left: ${theme.pixels.px4};

    @media (max-width: 455px) {
      display: block;
      grid-column: ${theme.pixels.px12};

      p {
        margin-left: 0;
      }
    }
  }

  p {
    margin-left: ${theme.pixels.px4};
  }
`;

export const ContainerAlign = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: ${theme.pixels.px4};
  flex-wrap: wrap;
  margin-bottom: ${theme.pixels.px4};

  @media (max-width: 420px) {
    flex-direction: row;
    margin-left: ${theme.pixels.px4};

    strong {
      margin-left: ${theme.pixels.px4};
    }
  }
`;

export const Text = styled.p`
  font-size: ${theme.fontSize.fs14};
  color: ${theme.colors.darkText};
`;

export const Data = styled.strong`
  font-size: ${theme.fontSize.fs14};
  color: ${theme.colors.darkText};
`;

export const CallButton = styled.a`
  color: white;
  align-items: center;
  justify-content: center;
  display: flex;
  height: ${theme.pixels.px40};
  border-radius: ${theme.borderRadius.radius4};
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  text-decoration: none;

  svg {
    margin-left: ${theme.pixels.px8};
    font-size: ${theme.fontSize.fs20};
  }
`;
