import styled from "styled-components";
import { FiX } from "react-icons/fi";

export const Container = styled.div``;

export const Div = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 20px;
`;

export const DivImage = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  max-width: 800px;
  margin: auto;
  flex-wrap: wrap;
`;

export const ButtonFile = styled.button`
  position: relative;
  border: 2px solid gray;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 90px;
  transition: 0.3s;
  flex-shrink: 0;

  svg {
    font-size: 20px;
    color: gray;
  }

  &:hover {
    background-color: #e3e3e3;
  }
`;

export const DivX = styled.div`
  display: flex;
`;

export const IconX = styled(FiX)`
  position: absolute;
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  margin: 4px;
  padding: 2px;

  &:hover {
    color: black;
  }
`;

export const ImageCar = styled.img`
  object-fit: cover;
  width: 120px;
  height: 90px;
  border-radius: 4px;
`;

export const InputFile = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  opacity: 0;
  z-index: 1;
`;

export const Form = styled.form`
  flex-direction: column;
  display: flex;
  max-width: 800px;
  margin: auto;
`;

export const ContainerInput = styled.main`
  display: flex;
  flex-direction: row;
  column-gap: 20px;
  flex-wrap: wrap;
`;

export const ContainerTextArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const LabelTextArea = styled.p`
  font-size: 14px;
  color: #444;
  margin-left: 2px;
`;

export const TextArea = styled.textarea`
  padding: 4px;
  border-radius: 4px;
  border: 2px solid #999;
  resize: none;
  height: 70px;

  &:-webkit-autofill {
    background-color: transparent !important;
    border-radius: 4px;
    -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
  }
`;
