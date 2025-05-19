import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import styled from "styled-components";
import theme from "../styles/theme";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errors: FieldError | undefined;
  label: string;
}

export const InputForm = forwardRef<HTMLInputElement, IProps>(
  ({ errors, label, ...otherProps }, ref) => {
    return (
      <Container>
        <Label>{label}</Label>
        <Input
          style={{ border: errors && `2px solid ${theme.colors.red}` }}
          ref={ref}
          {...otherProps}
        />
      </Container>
    );
  }
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.pixels.px20};
  flex: 1;
  min-width: 150px;
`;

const Label = styled.p`
  font-size: ${theme.fontSize.fs14};
  color: ${theme.colors.darkText};
  margin: 0 0 ${theme.pixels.px4} ${theme.pixels.px4};
`;

const Input = styled.input`
  padding: ${theme.padding.p4};
  border-radius: ${theme.borderRadius.radius4};
  border: 2px solid ${theme.colors.gray};

  &:-webkit-autofill {
    background-color: transparent !important;
    border-radius: ${theme.borderRadius.radius4};
    -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
  }
`;
