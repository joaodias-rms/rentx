import React from "react";

import { ActivityIndicator } from "react-native";
import theme from "../../styles/theme";

export function Load() {
  return (
    <ActivityIndicator
      size="large"
      color={theme.colors.main}
      style={{ flex: 1 }}
    />
  );
}
