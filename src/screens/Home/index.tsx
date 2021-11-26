import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import { Load } from "../../components/Load";
import { Car } from "../../components/Car";
import Logo from "../../assets/logo.svg";
import api from "../../services/api";
import { carDTO } from "../../dtos/carDTO";

import { Container, Header, TotalCars, HeaderContent, CarList, MyCarsButton } from "./styles";
import { Alert } from "react-native";
import theme from "../../styles/theme";

export function Home() {
  const navigation = useNavigation();

  const [cars, setCars] = useState<carDTO[]>([]);
  const [loading, setLoading] = useState(true);
  function handleCarDetails(car: carDTO) {
    navigation.navigate("CarDetails", {car});
  }

  function handleMyCars(){
    navigation.navigate("MyCars")
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
          <TotalCars>total de {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({item })=> <Car onPress={()=> handleCarDetails(item)} data={item} />}
        />
      )}
      <MyCarsButton onPress={handleMyCars}>
        <Ionicons color={theme.colors.shape} size={32} name="ios-car-sport"/>
      </MyCarsButton>
    </Container>
  );
}
