import React from "react";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Acessory } from "../../components/Acessory";
import { Button } from "../../components/Button";

import {useNavigation, useRoute} from '@react-navigation/native'

import SpeedSVG from '../../assets/speed.svg'
import AccelerationSVG from '../../assets/acceleration.svg'
import ForceSVG from '../../assets/force.svg'
import GasolineSVG from '../../assets/gasoline.svg'
import ExchangeSVG from '../../assets/exchange.svg'
import PeopleSVG from '../../assets/people.svg'

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
  Footer
} from "./styles";
import { carDTO } from "../../dtos/carDTO";

interface Params{
  car: carDTO
}

export function CarDetails() {
  const navigation = useNavigation();

  const route = useRoute();

  const { car } = route.params as Params;

  function handleChooseRentalPeriod(){
    navigation.navigate('Scheduling')
  }

  function handleGoBack(){
    navigation.goBack()
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
            <Brand>{car.brand}</Brand>
            <Name>M3</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$580</Price>
          </Rent>
        </Details>
        <Acessories>
          <Acessory name="380 Km/h" icon={SpeedSVG}/>
          <Acessory name="3.2s" icon={AccelerationSVG}/>
          <Acessory name="800hp" icon={ForceSVG}/>
          <Acessory name="Gasolina" icon={GasolineSVG}/>
          <Acessory name="Auto" icon={ExchangeSVG}/>
          <Acessory name="2" icon={PeopleSVG}/>
        </Acessories>
        <About>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          iste dolores dolorum deleniti itaque ullam sequi! Eligendi quae odit
          voluptates consequatur. Consectetur dolores iure, necessitatibus
          veniam in repellendus eius expedita.
        </About>
      </Content>
      <Footer>
        <Button onPress={handleChooseRentalPeriod} title="Escolher período do aluguel"/>
      </Footer>
    </Container>
  );
}
