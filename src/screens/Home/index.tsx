import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import { Load } from "../../components/Load";
import { Car } from "../../components/Car";
import Logo from "../../assets/logo.svg";
import api from "../../services/api";
import { carDTO } from "../../dtos/carDTO";

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";
import { Alert } from "react-native";
import theme from "../../styles/theme";

export function Home() {
  const navigation = useNavigation();

  const [cars, setCars] = useState<carDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const yPosition = useSharedValue(0);
  const xPosition = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: xPosition.value },
        { translateY: yPosition.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = xPosition.value;
      ctx.positionY = yPosition.value;
    },
    onActive(event, ctx: any) {
      xPosition.value = ctx.positionX + event.translationX;
      yPosition.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      xPosition.value = withSpring(0);
    },
  });

  function handleCarDetails(car: carDTO) {
    navigation.navigate("CarDetails", { car });
  }

  function handleMyCars() {
    navigation.navigate("MyCars");
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (error) {
        console.log(error);
        Alert.alert("Erro ao obter carros");
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCars>total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car onPress={() => handleCarDetails(item)} data={item} />
          )}
        />
      )}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            { position: "absolute", bottom: 13, right: 22 },
          ]}
        >
          <ButtonAnimated
            style={[style.button, { backgroundColor: theme.colors.main }]}
            onPress={handleMyCars}
          >
            <Ionicons
              color={theme.colors.shape}
              size={32}
              name="ios-car-sport"
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const style = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
