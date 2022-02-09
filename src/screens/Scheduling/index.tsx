import React, { useState } from "react";
import { StatusBar } from "react-native";
import { format } from "date-fns";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { BackButton } from "../../components/BackButton";
import {
  Calendar,
  DayProps,
  generateIntervalDate,
  MarkedDateProps,
} from "../../components/Calendar";
import { Button } from "../../components/Button";
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

import ArrowSVG from "../../assets/arrow.svg";
import theme from "../../styles/theme";
import { carDTO } from "../../dtos/carDTO";

interface Params {
  car: carDTO;
}

interface RentalInterval {
  start: number;
  startDate: string;
  end: number;
  endDate: string;
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDate, setMarkedDate] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [rentalInterval, setRentalInterval] = useState<RentalInterval>(
    {} as RentalInterval
  );
  const navigation = useNavigation();
  const route = useRoute();

  const { car } = route.params as Params;

  function handleGoBack() {
    navigation.goBack();
  }

  function handleConfirm() {
    navigation.navigate("SchedulingDetails", {
      car,
      dates: Object.keys(markedDate),
    });
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate; //define date caso não haja timestamp, caso contrário define a última data selecionada
    let end = date;

    if (start.timestamp > end.timestamp) {
      //se a primeira data selecionada for maior que a segunda, inverte os valores pra evitar erro
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = generateIntervalDate(start, end);
    setMarkedDate(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalInterval({
      start: start.timestamp,
      end: end.timestamp,
      startDate: format(getPlatformDate(new Date(firstDate)), "dd/MM/yyyy"),
      endDate: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
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
            <DateValue selected={!!rentalInterval.start}>
              {" "}
              {rentalInterval.startDate}{" "}
            </DateValue>
          </DateInfo>
          <ArrowSVG />
          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={!!rentalInterval.endDate}>
              {rentalInterval.endDate}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar markedDate={markedDate} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          enabled={!!rentalInterval.start}
          onPress={handleConfirm}
          title="Confirmar"
        />
      </Footer>
    </Container>
  );
}
