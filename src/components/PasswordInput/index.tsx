import React, { useState } from "react";
import { TextInputProps } from "react-native";

import { Feather } from "@expo/vector-icons";

import {
  Container,
  IconContainer,
  InputText,
  ChangePasswordVisible,
} from "./styles";
import theme from "../../styles/theme";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: InputProps) {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocused() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handlePasswordVisibilityChange() {
    setPasswordVisible((prevState) => !prevState);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>
      <InputText
        {...rest}
        secureTextEntry={passwordVisible}
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        isFocused={isFocused}
      />

      <ChangePasswordVisible
        isFocused={isFocused}
        onPress={handlePasswordVisibilityChange}
      >
        <Feather
          size={24}
          name={passwordVisible ? "eye" : "eye-off"}
          color={theme.colors.text_detail}
        />
      </ChangePasswordVisible>
    </Container>
  );
}
