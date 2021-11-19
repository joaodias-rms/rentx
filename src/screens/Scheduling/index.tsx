import React from "react";
import { useNavigation } from "@react-navigation/native";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";
import theme from "../../styles/theme";

import ArrowSVG from "../../assets/arrow.svg";
import { StatusBar } from "react-native";

export function Scheduling() {
  const navigation = useNavigation();

  function handleGoBack(){
    navigation.goBack()
  }

  function handleConfirm(){
    navigation.navigate('SchedulingDetails')
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton onPress={handleGoBack} color={theme.colors.shape} />
        <Title>
          Escolha uma {"\n"}data de início e {"\n"}fim do aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected></DateValue>
          </DateInfo>
          <ArrowSVG />
          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={false}></DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar />
      </Content>

      <Footer>
          <Button onPress={handleConfirm} title="Confirmar"/>
      </Footer>
    </Container>
  );
}
