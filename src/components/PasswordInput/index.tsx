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
}

export function PasswordInput({ iconName, ...rest }: InputProps) {
  const [passwordVisible, setPasswordVisible] = useState(true);

  function handlePasswordVisibilityChange() {
    setPasswordVisible((prevState) => !prevState);
  }

  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </IconContainer>
      <InputText {...rest} secureTextEntry={passwordVisible}/>

      <ChangePasswordVisible onPress={handlePasswordVisibilityChange}>
        <Feather
          size={24}
          name={passwordVisible ? "eye" : "eye-off"}
          color={theme.colors.text_detail}
        />
      </ChangePasswordVisible>
    </Container>
  );
}
