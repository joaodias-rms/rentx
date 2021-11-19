import React, {useEffect, useState} from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { Car } from "../../components/Car";
import Logo from "../../assets/logo.svg";
import api from "../../services/api";
import { carDTO } from "../../dtos/carDTO";

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";
import { Alert } from "react-native";

export function Home() {
  const navigation = useNavigation();

  const [cars, setCars] = useState<carDTO[]>([])
  const [loading, setLoading] = useState(true)
  function handleCarDetails() {
    navigation.navigate("CarDetails");
  }

  useEffect(()=>{
    async function fetchCars(){
      try {
        const response = await api.get('/cars')
        setCars(response.data)
      } catch (error) {
        console.log(error);
        Alert.alert('Erro ao obter carros')
      }finally{
        setLoading(false)
      }
     
      
    }
    fetchCars()
  },[])

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

      <CarList
        data={cars}
        keyExtractor={(item) => String(item)}
        renderItem={(item) => <Car onPress={handleCarDetails} data={carData} />}
      />
    </Container>
  );
}
