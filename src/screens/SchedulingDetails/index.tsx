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
import { useNetInfo } from "@react-native-community/netinfo";

interface Params {
  car: carDTO;
  dates: string[];
}

interface RentalInterval {
  startDate: string;
  endDate: string;
}

export function SchedulingDetails() {
  const netinfo = useNetInfo();
  const [carUpdated, setCarUpdated] = useState<carDTO>({} as carDTO);
  const [rentalPeriod, setRentalPeriod] = useState<RentalInterval>(
    {} as RentalInterval
  );
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentalTotal = Number(dates.length * car.price);

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleConfirm() {
    setLoading(true);


    await api.post("/rentals", {
      user_id: 1,
      car_id: car.id,
      start_date: new Date(dates[0]),
      end_date: new Date(dates[dates.length - 1]),
      total: rentalTotal
    })
      .then(() =>
        navigation.navigate("Confirmation", {
          title: "Carro alugado",
          message: `Agora basta ir\naté uma concessionária RentX\npara retirar seu veículo.`,
          nextScreenRoute: "Home",
        })
      )
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

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }
    if (netinfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netinfo.isConnected]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>
      <CarImages>
        <ImageSlider
          imagesUrl={
            !!carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R${car.price}</Price>
          </Rent>
        </Details>
        {carUpdated.accessories && (
          <Acessories>
            {carUpdated.accessories.map((acessory) => (
              <Acessory
                key={acessory.type}
                name={acessory.name}
                icon={getAccessoryIcon(acessory.type)}
              />
            ))}
          </Acessories>
        )}
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
              R$ {car.price} x{dates.length} diárias
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
