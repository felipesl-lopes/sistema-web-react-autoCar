import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import styled from "styled-components";

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
          style={{ border: errors && "2px solid #ff3030" }}
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
  margin-bottom: 20px;
  flex: 1;
  min-width: 150px; 
`;

const Label = styled.p`
  font-size: 13px;
  color: #444;
  margin: 0 0 2px 2px;
`;

const Input = styled.input`
  padding: 4px;
  border-radius: 4px;
  border: 2px solid #999;

  &:-webkit-autofill {
    background-color: transparent !important;
    border-radius: 4px;
    -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
  }
`;
