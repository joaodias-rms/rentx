import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import DoneSVG from "../../assets/done.svg";
import LogoSVG from "../../assets/logo_background_gray.svg";
import { ConfirmButton } from "../../components/ConfirmButton";

import { Container, Content, Title, Message, Footer } from "./styles";

export function SchedulingComplete() {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  function handleConfirmRental(){
    navigation.navigate('Home')
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSVG width={width} />
      <Content>
        <DoneSVG width={80} height={80} />
        <Title>Carro Alugado</Title>
        <Message>
          Agora basta ir {"\n"} até uma concessionária RentX {"\n"} para retirar
          seu veículo.
        </Message>
      </Content>
      <Footer>
        <ConfirmButton onPress={handleConfirmRental} title="Ok" />
      </Footer>
    </Container>
  );
}
