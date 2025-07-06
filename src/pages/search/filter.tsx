import React, { useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import styled from "styled-components";
import { Spacer } from "../../components/spacer";
import { marcaList } from "../../data/marcasList";
import theme from "../../styles/theme";
import { Option, Select } from "../dashboard/new/styled";

const Filter: React.FunctionComponent = () => {
  const [localidade, setLocalidade] = useState("");
  const [minPreco, setMinPreco] = useState(0);
  const [maxPreco, setMaxPreco] = useState(0);
  const [ano, setAno] = useState("");
  const [km, setKm] = useState(0);

  const [openFilters, setOpenFilters] = useState({
    localidade: false,
    preco: false,
    marca: false,
    ano: false,
    km: false,
  });

  const toggleFilter = (key: keyof typeof openFilters) => {
    setOpenFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Container>
      <Title>Filtros</Title>
      <Spacer spacing={4} />

      <ContainerFilter>
        <DivFilter onClick={() => toggleFilter("localidade")}>
          <TextFilter>Localidade</TextFilter>
          {openFilters["localidade"] ? <FiArrowUp /> : <FiArrowDown />}
        </DivFilter>
        {openFilters["localidade"] && (
          <Input
            placeholder="Digite a cidade"
            value={localidade}
            onChange={(e) => setLocalidade(e.target.value)}
          />
        )}
      </ContainerFilter>

      <Divider />

      <ContainerFilter>
        <DivFilter onClick={() => toggleFilter("preco")}>
          <TextFilter>Preço</TextFilter>
          {openFilters["preco"] ? <FiArrowUp /> : <FiArrowDown />}
        </DivFilter>
        {openFilters["preco"] && (
          <>
            <>
              <TextPrice>Mínimo</TextPrice>
              <ContainerPrice>
                <Input
                  style={{ margin: "2px 2px 2px 2px" }}
                  value={`R$ ${minPreco.toLocaleString("pt-BR")}`}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    const value = Number(raw);
                    if (value <= maxPreco) {
                      setMinPreco(value);
                    }
                  }}
                />
                <Input
                  style={{ margin: "2px 2px 2px 2px" }}
                  placeholder="Preço"
                  value={minPreco}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value <= maxPreco) {
                      setMinPreco(value);
                    }
                  }}
                  type="range"
                  max={1000000}
                  step={5000}
                />
              </ContainerPrice>
            </>

            <>
              <TextPrice>Máximo</TextPrice>
              <ContainerPrice>
                <Input
                  style={{ margin: "2px 2px 2px 2px" }}
                  value={`R$ ${maxPreco.toLocaleString("pt-BR")}`}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    const value = Number(raw);
                    if (value >= minPreco) {
                      setMaxPreco(value);
                    }
                  }}
                />
                <Input
                  style={{ margin: "2px 2px 2px 2px" }}
                  placeholder="Preço"
                  value={maxPreco}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= minPreco) {
                      setMaxPreco(value);
                    }
                  }}
                  type="range"
                  max={1000000}
                  step={5000}
                />
              </ContainerPrice>
            </>
          </>
        )}
      </ContainerFilter>

      <Divider />

      <ContainerFilter>
        <DivFilter onClick={() => toggleFilter("marca")}>
          <TextFilter>Marca</TextFilter>
          {openFilters["marca"] ? <FiArrowUp /> : <FiArrowDown />}
        </DivFilter>
        {openFilters["marca"] && (
          <Select style={{ margin: "12px 2px 2px 2px" }}>
            {marcaList.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        )}
      </ContainerFilter>

      <Divider />

      <ContainerFilter>
        <DivFilter onClick={() => toggleFilter("ano")}>
          <TextFilter>Ano</TextFilter>
          {openFilters["ano"] ? <FiArrowUp /> : <FiArrowDown />}
        </DivFilter>
        {openFilters["ano"] && (
          <Input
            placeholder="Ano"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            type="number"
            max={new Date().getFullYear()}
            min={1960}
          />
        )}
      </ContainerFilter>

      <Divider />

      <ContainerFilter>
        <DivFilter onClick={() => toggleFilter("km")}>
          <TextFilter>Quilometragem</TextFilter>
          {openFilters["km"] ? <FiArrowUp /> : <FiArrowDown />}
        </DivFilter>
        {openFilters["km"] && (
          <Input
            placeholder="Quilometragem"
            value={`Km ${km.toLocaleString("pt-BR")}`}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "");
              setKm(Number(raw));
            }}
          />
        )}
      </ContainerFilter>
    </Container>
  );
};

export default Filter;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.white};
  padding: ${theme.padding.p12};
  border-radius: ${theme.borderRadius.radius4};
  width: 300px;
`;

const Title = styled.h3``;

const ContainerFilter = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
`;

const DivFilter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
`;

const Divider = styled.div`
  background-color: #555;
  width: 100%;
  padding: 0.4px;
  margin-bottom: 16px;
`;

const TextFilter = styled.p``;

const Input = styled.input`
  padding: 4px;
  margin: 12px 2px 2px 2px;
  border-radius: 4px;
  border: 1px solid #888;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const TextPrice = styled.p`
  font-size: 0.85rem;
  margin-top: 12px;
`;

const ContainerPrice = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;
