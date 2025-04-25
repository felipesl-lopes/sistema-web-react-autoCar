import styled from "styled-components";

export const Main = styled.main`
  display: grid;
  background-color: #fff;
  padding: 12px;
  border-radius: 4px;
`;

export const SliderCar = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  max-height: 500px;
`;

export const Title = styled.h1`
  font-size: 24px;
`;

export const FavoriteWrapper = styled.div`
  position: relative;
`;

export const DivInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
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
  gap: 30px;

  @media (max-width: 420px) {
    display: block;
    grid-column: 10px;
  }
`;

export const DivInfoConditions = styled.div`
  div {
    display: flex;
    margin-bottom: 4px;
    margin-left: 4px;

    @media (max-width: 455px) {
      display: block;
      grid-column: 10px;

      p {
        margin-left: 0;
      }
    }
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
  flex-wrap: wrap;
  margin-bottom: 4px;

  @media (max-width: 420px) {
    flex-direction: row;
    margin-left: 4px;

    strong {
      margin-left: 4px;
    }
  }
`;

export const Text = styled.p`
  font-size: 14px;
`;

export const Data = styled.strong`
  font-size: 14px;
`;

export const CallButton = styled.a`
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
  transition: 0.2s ease-in-out;
  text-decoration: none;

  svg {
    margin-left: 8px;
    font-size: 20px;
  }
`;
