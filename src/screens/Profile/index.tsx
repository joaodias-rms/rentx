import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useAuth } from "../../hooks/auth";

import { BackButton } from "../../components/BackButton";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from "./styles";

import { Feather } from "@expo/vector-icons";
import theme from "../../styles/theme";

export function Profile() {
  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");

  const { user } = useAuth();

  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSignOut = () => {};

  const handleOptionChange = (selectedOption: "dataEdit" | "passwordEdit") => {
    setOption(selectedOption);
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>
            <PhotoContainer>
              <Photo source={{ uri: "https://github.com/joaodias-rms.png" }} />
              <PhotoButton onPress={() => {}}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>
          <Content>
            <Options>
              <Option
                active={option === "dataEdit"}
                onPress={() => handleOptionChange("dataEdit")}
              >
                <OptionTitle active={option === "dataEdit"}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === "passwordEdit"}
                onPress={() => handleOptionChange("passwordEdit")}
              >
                <OptionTitle active={option === "passwordEdit"}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>
            {option === "dataEdit" ? (
              <Section style={{ marginBottom: useBottomTabBarHeight() }}>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  placeholderTextColor={theme.colors.text_detail}
                  autoCapitalize="sentences"
                  autoCorrect={false}
                  defaultValue={user.name}
                />
                <Input
                  iconName="mail"
                  placeholder="Email"
                  defaultValue={user.email}
                  editable={false}
                  autoCorrect={false}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  defaultValue={user.driver_license}
                  placeholderTextColor={theme.colors.text_detail}
                  keyboardType="numeric"
                />
              </Section>
            ) : (
              <Section style={{ marginBottom: useBottomTabBarHeight() }}>
                <PasswordInput
                  iconName="lock"
                  placeholder="Senha atual"
                  placeholderTextColor={theme.colors.text_detail}
                />
                <PasswordInput
                  iconName="lock"
                  placeholder="Nova senha"
                  placeholderTextColor={theme.colors.text_detail}
                />
                <PasswordInput
                  iconName="lock"
                  placeholder="Confirme a senha"
                  placeholderTextColor={theme.colors.text_detail}
                />
              </Section>
            )}
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
