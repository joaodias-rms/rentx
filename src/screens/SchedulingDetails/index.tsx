import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { getPlatformDate } from "../../utils/getPlatformDate";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

import { ImageSlider } from "../../components/ImageSlider";
import { BackButton } from "../../components/BackButton";
import { Acessory } from "../../components/Acessory";
import { Button } from "../../components/Button";

import { format } from "date-fns";
import api from "../../services/api";
import { carDTO } from "../../dtos/carDTO";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Acessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetail,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";
import theme from "../../styles/theme";
import { RFValue } from "react-native-responsive-fontsize";

interface Params {
  car: carDTO;
  dates: string[];
}

interface RentalInterval {
  startDate: string;
  endDate: string;
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalInterval>(
    {} as RentalInterval
  );
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentalTotal = Number(dates.length * car.rent.price);

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleConfirm() {
    setLoading(true);
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    await api.post("/schedules_byuser", {
      user_id: 1,
      car,
      startDate: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      endDate: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });

    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then(() => navigation.navigate("SchedulingComplete"))
      .catch(() => {
        Alert.alert("Não foi possível finalizar a locação");
        setLoading(false);
      });
  }

  useEffect(() => {
    setRentalPeriod({
      startDate: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      endDate: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R${car.rent.price}</Price>
          </Rent>
        </Details>
        <Acessories>
          {car.accessories.map((acessory) => (
            <Acessory
              key={acessory.type}
              name={acessory.name}
              icon={getAccessoryIcon(acessory.type)}
            />
          ))}
        </Acessories>
        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{rentalPeriod.startDate}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>{rentalPeriod.endDate}</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetail>
            <RentalPriceQuota>
              R$ {car.rent.price} x{dates.length} diárias
            </RentalPriceQuota>
            <RentalPriceTotal>R${rentalTotal}</RentalPriceTotal>
          </RentalPriceDetail>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          onPress={handleConfirm}
          title="Alugar agora"
          color={theme.colors.success}
          loading={loading}
          enabled={!loading}
        />
      </Footer>
    </Container>
  );
}
