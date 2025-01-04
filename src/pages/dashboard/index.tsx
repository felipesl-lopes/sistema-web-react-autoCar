import React, { useState } from "react";
import { ContainerComponent } from "../../components/Container";
import Address from "./components/tabs/address";
import Email from "./components/tabs/email";
import Phone from "./components/tabs/phone";
import { Photo } from "./components/tabs/photo";
import {
  Container,
  ContainerTabButtons,
  ContainerTabIten,
  TabButton,
  TitleDashboard,
} from "./styled";
import { Spacer } from "../../components/spacer";

const Dashboard: React.FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState("photo");

  return (
    <ContainerComponent>
      <TitleDashboard>Editar informações</TitleDashboard>

      <Container>
        <ContainerTabButtons>
          <TabButton
            onClick={() => setActiveTab("photo")}
            style={{
              textDecoration: activeTab === "photo" ? "underline" : "none",
            }}
          >
            Foto de perfil
          </TabButton>

          <TabButton
            onClick={() => setActiveTab("email")}
            style={{
              textDecoration: activeTab === "email" ? "underline" : "none",
            }}
          >
            E-mail
          </TabButton>

          <TabButton
            onClick={() => setActiveTab("address")}
            style={{
              textDecoration: activeTab === "address" ? "underline" : "none",
            }}
          >
            Endereço
          </TabButton>

          <TabButton
            onClick={() => setActiveTab("phone")}
            style={{
              textDecoration: activeTab === "phone" ? "underline" : "none",
            }}
          >
            Telefone
          </TabButton>
        </ContainerTabButtons>

        <ContainerTabIten>
          {activeTab === "photo" && <Photo />}

          {activeTab === "email" && <Email />}

          {activeTab === "address" && <Address />}

          {activeTab === "phone" && <Phone />}
        </ContainerTabIten>
      </Container>

      <Spacer spacing={10} />
    </ContainerComponent>
  );
};

export default Dashboard;
