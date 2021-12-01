import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";
import { Container, Title } from "./styles";
import theme from "../../styles/theme";

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
  text_color?: string;
}

export function Button({
  loading = false,
  enabled = true,
  title,
  color,
  text_color,
  ...rest
}: Props) {
  return (
    <Container
      style={{ opacity: enabled == false || loading === true ? 0.5 : 1 }}
      enabled={enabled}
      color={color}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title text_color={text_color}>{title}</Title>
      )}
    </Container>
  );
}
