import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ButtonSendComponent } from "./buttonSendComponent";
import { ContainerComponent } from "./Container";
import { Spacer } from "./spacer";

interface IProps {
  email: string;
  title: string;
  text: string;
}

const ComponentVerifielEmail: React.FunctionComponent<IProps> = ({
  email,
  title,
  text,
}) => {
  const navigate = useNavigate();

  return (
    <ContainerComponent>
      <TitleDashboard>{title}</TitleDashboard>
      <Spacer spacing={4} />
      <Title style={{ textAlign: "center" }}>{text}</Title>
      <Spacer spacing={15} />
      <div style={{ width: "50%", margin: "auto" }}>
        <ButtonSendComponent
          onClick={() => {
            navigate(
              `/verificar-email?email=${encodeURIComponent(
                email as any
              )}&checkEmail=true`
            );
          }}
          title="Verificar e-mail"
        />
      </div>
    </ContainerComponent>
  );
};

const TitleDashboard = styled.h2`
  margin: 24px 0;
  text-align: center;
`;

const Title = styled.p`
  text-align: center;
`;

export default ComponentVerifielEmail;
