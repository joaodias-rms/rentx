import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  width: 55px;
  height: 55px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
`;

export const InputText = styled.TextInput`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  padding: 0 23px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
`;
