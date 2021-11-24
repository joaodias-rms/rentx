import React, { useState }  from "react";
import { useNavigation } from "@react-navigation/native";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Calendar, DayProps, generateIntervalDate, MarkedDateProps } from "../../components/Calendar";
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
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)
  const [markedDate, setMarkedDate] = useState<MarkedDateProps>({} as MarkedDateProps)
  const navigation = useNavigation();

  function handleGoBack(){
    navigation.goBack()
  }

  function handleConfirm(){
    navigation.navigate('SchedulingDetails')
  }

  function handleChangeDate(date: DayProps){
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate; //define date caso não haja timestamp, caso contrário define a última data selecionada
    let end = date

    if(start.timestamp > end.timestamp ){ //se a primeira data selecionada for maior que a segunda, inverte os valores pra evitar erro
      start = end;
      end = start
    }

    setLastSelectedDate(end)

    const interval = generateIntervalDate(start, end);
    setMarkedDate(interval)

    console.log(markedDate);
    
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
        <Calendar markedDates={markedDate} onDayPress={handleChangeDate}/>
      </Content>

      <Footer>
          <Button onPress={handleConfirm} title="Confirmar"/>
      </Footer>
    </Container>
  );
}
