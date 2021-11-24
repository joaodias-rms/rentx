import React from "react";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Acessory } from "../../components/Acessory";
import { Button } from "../../components/Button";

import { useNavigation, useRoute } from "@react-navigation/native";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

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
  About,
  Acessories,
  Footer,
} from "./styles";
import { carDTO } from "../../dtos/carDTO";

interface Params {
  car: carDTO;
}

export function CarDetails() {
  const navigation = useNavigation();

  const route = useRoute();

  const { car } = route.params as Params;

  function handleChooseRentalPeriod() {
    navigation.navigate("Scheduling", car);
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>
      <CarImages>
        <ImageSlider
          imagesUrl={car.photos}
        />
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
            <Acessory key={acessory.type} name={acessory.name} icon={getAccessoryIcon(acessory.type)} />
          ))}
        </Acessories>
        <About>{car.about}</About>
      </Content>
      <Footer>
        <Button
          onPress={handleChooseRentalPeriod}
          title="Escolher período do aluguel"
        />
      </Footer>
    </Container>
  );
}
