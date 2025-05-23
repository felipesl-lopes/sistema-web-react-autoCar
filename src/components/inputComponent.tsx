import React, { forwardRef, useState } from "react";
import { FieldError } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styled from "styled-components";
import theme from "../styles/theme";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errors: FieldError | undefined;
}

export const InputComponent = forwardRef<HTMLInputElement, IProps>(
  ({ errors, ...otherProps }, ref) => {
    return (
      <Container>
        <ContainerInput
          style={{ border: errors && `solid 2px ${theme.colors.red}` }}
        >
          <Input ref={ref} {...otherProps} />
        </ContainerInput>
        {errors && <TextError>{errors.message}</TextError>}
      </Container>
    );
  }
);

export const InputPasswordComponent = forwardRef<HTMLInputElement, IProps>(
  ({ errors, ...otherProps }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <Container>
        <ContainerInput
          style={{ border: errors && `solid 2px ${theme.colors.red}` }}
        >
          <Input
            type={visible ? "text" : "password"}
            ref={ref}
            {...otherProps}
          />
          <IconEye onClick={() => setVisible(!visible)}>
            {visible ? <FiEye /> : <FiEyeOff />}
          </IconEye>
        </ContainerInput>
        {errors && <TextError>{errors.message}</TextError>}
      </Container>
    );
  }
);

const Container = styled.div`
  width: 100%;
`;

const ContainerInput = styled.div`
  border: 2px solid ${theme.colors.clearText};
  border-radius: ${theme.borderRadius.radius4};
  width: 100%;
  background-color: ${theme.colors.white};
  display: flex;
  align-items: center;

  &:focus-within {
    border: 2px solid #4a90e2;
    box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
  }
`;

const Input = styled.input`
  display: flex;
  flex: 1;
  margin: 0;
  width: 100%;
  border: none;
  outline: none;
  padding: ${theme.padding.p12};
  background-color: transparent;
  appearance: none;
  font-size: 0.9rem;

  &:-webkit-autofill {
    background-color: transparent !important;
    border-radius: ${theme.borderRadius.radius4};
    -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
  }
`;

const IconEye = styled.div`
  cursor: pointer;
  padding: 0 ${theme.padding.p12};

  svg {
    display: flex;
    bottom: auto;
    color: ${theme.colors.gray};
  }
`;

const TextError = styled.p`
  color: ${theme.colors.red};
  margin: ${theme.pixels.px4} 0 0 ${theme.pixels.px4};
  font-size: 0.75rem;
  position: absolute;
`;
