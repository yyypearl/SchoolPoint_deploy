import { theme } from "@/styles/theme";
import React from "react";
import styled from "styled-components";
import Image from "next/image";

export interface CustomInputProps {
  inputType?: "text" | "select";
  value: string;
  onChange: (value: string) => void;
  onClick?: () => void;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
}

const CustomInput = (props: CustomInputProps) => {
  const {
    inputType = "text",
    value,
    onChange,
    onClick,
    placeholder,
    readonly = false,
    disabled = false,
  } = props;

  let inputClassName = inputType;
  if (inputType) {
    inputClassName += " " + inputType;
  }

  const handleChange = (event: any) => {
    onChange(event.target.value);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Container>
      <StyledInput
        type="text"
        value={value}
        onChange={handleChange}
        onClick={handleClick}
        placeholder={placeholder}
        className={inputClassName}
        readOnly={readonly}
        disabled={disabled}
      />
      {inputType === "select" && (
        <ImageContainer>
          <Image
            src="/assets/common/down_arrow.svg"
            alt="arrow"
            width={20}
            height={20}
          />
        </ImageContainer>
      )}
    </Container>
  );
};

export default CustomInput;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input<CustomInputProps>`
  width: 100%;
  height: 44px;
  padding: 14px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid ${theme.colors.primary100};
  background: ${(props) => (props.value ? "rgba(255, 135, 0, 0.05)" : "white")};
  color: ${theme.colors.b700};
  ${(props) => props.theme.fonts.body3_m};
  outline: none;
  ${(props) => props.theme.fonts.caption1_m};

  &::placeholder {
    color: ${theme.colors.b400};
    ${(props) => props.theme.fonts.caption1_m};
  }

  &.select {
    cursor: pointer;
    caret-color: transparent;
  }

  &:disabled {
    border: none;
    color: ${theme.colors.b400};
    background: ${theme.colors.b100};
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: -30px;
  cursor: pointer;
`;
