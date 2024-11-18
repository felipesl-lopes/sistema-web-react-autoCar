import styled from "styled-components";

export const ContainerSearch = styled.section`
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
  background-color: #0f081e;
  color: #fff;
  border-radius: 4px;
  border: 0;

  @media (max-width: 350px) {
    width: 100%;
    margin: auto;
  }
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 24px;
`;

export const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  background-color: #fff;
  padding: 12px;
  border-radius: 4px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Section = styled.section`
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
`;

export const ImgCar = styled.img`
  width: 100%;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
`;

export const ContainerInfo = styled.div`
  padding: 12px;
`;

export const NameCar = styled.strong`
  margin-bottom: 8px;
  display: inline-table;
`;

export const Description = styled.p`
  color: #999;
  margin-bottom: 8px;
  font-size: 0.8em;
`;

export const Price = styled.h3`
  margin-bottom: 12px;
  font-size: 1.1em;
`;

export const Divider = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  margin: 8px 0;
`;

export const Locality = styled.p`
  margin-bottom: 4px;
  color: #999;
  font-size: 0.8em;
  font-weight: bold;
`;
