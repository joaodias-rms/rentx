import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Load } from "../../components/Load";
import { Car } from "../../components/Car";
import Logo from "../../assets/logo.svg";
import api from "../../services/api";
import { carDTO } from "../../dtos/carDTO";

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";
import { Alert } from "react-native";

export function Home() {
  const navigation = useNavigation();

  const [cars, setCars] = useState<carDTO[]>([]);
  const [loading, setLoading] = useState(true);
  function handleCarDetails(car: carDTO) {
    navigation.navigate("CarDetails", {car});
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
          <TotalCars>total de 12 carros</TotalCars>
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
    </Container>
  );
}
