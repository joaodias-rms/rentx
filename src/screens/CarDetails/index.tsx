import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";

import { Button } from "../../components/Button";
import { Acessory } from "../../components/Acessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

import {
  Container,
  Header,
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
  OfflineInfo,
} from "./styles";

import { carDTO } from "../../dtos/carDTO";
import { Car as ModelCar } from "../../database/models/Car";
import api from "../../services/api";

interface Params {
  car: ModelCar;
}

export function CarDetails() {
  const [carUpdated, setCarUpdated] = useState<carDTO>({} as carDTO);

  const netinfo = useNetInfo();
  const navigation = useNavigation();
  const route = useRoute();
  

  const { car } = route.params as Params;
  

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  function handleChooseRentalPeriod() {
    navigation.navigate("Scheduling", { car });
  }

  function handleGoBack() {
    navigation.goBack();
  }

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
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View style={[headerStyleAnimation]}>
        <Header>
          <BackButton onPress={handleGoBack} style={{ marginBottom: 5 }} />
        </Header>
        <Animated.View
          style={[
            sliderCarStyleAnimation,
            { marginTop: getStatusBarHeight() + 32 },
          ]}
        >
          <ImageSlider
            imagesUrl={
              !!carUpdated.photos
                ? carUpdated.photos
                : [{ id: car.thumbnail, photo: car.thumbnail }]
            }
          />
        </Animated.View>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: getStatusBarHeight(),
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R${netinfo.isConnected === true ? car.price : "..."}</Price>
          </Rent>
        </Details>
        {carUpdated.accessories && (
          <Acessories>
            {carUpdated.accessories.map((acessory) => (
              <Acessory
                key={acessory.id}
                name={acessory.name}
                icon={getAccessoryIcon(acessory.type)}
              />
            ))}
          </Acessories>
        )}
        <About>{car.about}</About>
      </Animated.ScrollView>
      <Footer>
        <Button
          onPress={handleChooseRentalPeriod}
          title="Escolher período do aluguel"
          enabled={netinfo.isConnected === true}
        />
        {netinfo.isConnected === false && (
          <OfflineInfo>
            Conecte-se a internet para ver mais detalhes
          </OfflineInfo>
        )}
      </Footer>
    </Container>
  );
}
