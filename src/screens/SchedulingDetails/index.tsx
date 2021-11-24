import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { ImageSlider } from "../../components/ImageSlider";
import { BackButton } from "../../components/BackButton";
import { Acessory } from "../../components/Acessory";
import { Button } from "../../components/Button";

import SpeedSVG from "../../assets/speed.svg";
import ForceSVG from "../../assets/force.svg";
import PeopleSVG from "../../assets/people.svg";
import GasolineSVG from "../../assets/gasoline.svg";
import ExchangeSVG from "../../assets/exchange.svg";
import AccelerationSVG from "../../assets/acceleration.svg";

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

export function SchedulingDetails() {
  const navigation = useNavigation();
  const route = useRoute()


  function handleGoBack() {
    navigation.goBack();
  }

  function handleConfirm() {
    navigation.navigate("SchedulingComplete");
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>
      <CarImages>
        <ImageSlider
          imagesUrl={[
            "https://static.wikia.nocookie.net/forzamotorsport/images/4/45/HOR_XB1_Audi_RS_5.png/revision/latest?cb=20191201154056",
          ]}
        />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>BMW</Brand>
            <Name>M3</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$580</Price>
          </Rent>
        </Details>
        <Acessories>
          <Acessory name="380 Km/h" icon={SpeedSVG} />
          <Acessory name="3.2s" icon={AccelerationSVG} />
          <Acessory name="800hp" icon={ForceSVG} />
          <Acessory name="Gasolina" icon={GasolineSVG} />
          <Acessory name="Auto" icon={ExchangeSVG} />
          <Acessory name="2" icon={PeopleSVG} />
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
            <DateValue>18/11/2021</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>18/11/2021</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetail>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$2.900</RentalPriceTotal>
          </RentalPriceDetail>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          onPress={handleConfirm}
          title="Alugar agora"
          color={theme.colors.success}
        />
      </Footer>
    </Container>
  );
}
