import React from "react";
import { FiImage, FiTrash, FiUser } from "react-icons/fi";
import styled from "styled-components";
import { Spacer } from "../../../../components/spacer";
import { ButtonSendComponent } from "../../../../components/buttonSendComponent";

export const Photo: React.FunctionComponent = () => {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <div>
        <ComponentImage>
          <FiUser size={150} />
        </ComponentImage>

        <Spacer spacing={8} />

        <ContainerButtons>
          <ButtonImg>
            <FiImage /> Trocar
          </ButtonImg>

          <ButtonImg>
            <FiTrash /> Excluir
          </ButtonImg>
        </ContainerButtons>
      </div>

      <Spacer spacing={10} />

      <ButtonSendComponent title="Salvar" />
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex: 1;
  justify-content: space-between;
  flex-direction: column;
`;

const ComponentImage = styled.div`
  background-color: #fff;
  border-radius: 100px;
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: auto;

  svg {
    display: flex;
  }
`;

const ContainerButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 70%;
  margin: auto;
`;

const ButtonImg = styled.button`
  width: 120px;
  padding: 8px 12px;
  border-radius: 2px;
  border: none;
  background-color: #bbb;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;

  svg {
    font-size: 16px;
    margin-right: 6px;
  }
`;
