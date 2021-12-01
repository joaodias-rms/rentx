import React from "react";
import { StatusBar } from "react-native";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { PasswordInput } from "../../components/PasswordInput";

import theme from "../../styles/theme";

import { Container, Header, Title, Subtitle, Footer, Form } from "./styles";

export function SignIn() {
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <Title>Estamos {"\n"}quase lá.</Title>
        <Subtitle>
          Faça seu login para começar{"\n"}uma experiência incrível.
        </Subtitle>
      </Header>

      <Form>
        <Input
          iconName="mail"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
        />
        <PasswordInput
          iconName="lock"
          placeholder="Senha"
          autoCapitalize="none"
        />
      </Form>

      <Footer>
        <Button
          title="Login"
          onPress={() => {}}
          enabled={false}
          loading={false}
        />
        <Button
          title="Criar conta gratuita"
          onPress={() => {}}
          enabled
          loading={false}
          color={theme.colors.background_secondary}
          text_color={theme.colors.header}
        />
      </Footer>
    </Container>
  );
}
