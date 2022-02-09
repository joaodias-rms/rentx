import React, { useEffect, useState } from "react";
import { StatusBar, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import {useNetInfo} from '@react-native-community/netinfo'

import { synchronize } from '@nozbe/watermelondb/sync'
import { database } from "../../database";
import api from "../../services/api";
import {Car as ModelCar} from '../../database/models/Car'

import { LoadAnimation } from "../../components/LoadAnimation";
import { Car } from "../../components/Car";
import Logo from "../../assets/logo.svg";
import { carDTO } from "../../dtos/carDTO";

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";


export function Home() {
  const netInfo = useNetInfo();
  const navigation = useNavigation();


  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  function handleCarDetails(car: carDTO) {
    navigation.navigate("CarDetails", { car });
  }

  async function offlineSynchronize(){
    await synchronize({
      database,
      pullChanges: async ({lastPulledAt})=>{
        const response = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)
        const {changes, latestVersion} = response.data
        
        return {changes, timestamp: latestVersion}
      },

      pushChanges: async ({changes})=>{
       const user = changes.users;
       await api.post('/users/sync', user).catch(console.log)
       
      }
    })
  }

  useEffect(() => {
    let isMounted = true;
    async function fetchCars() {
      try {      
        const carCollection = database.get<ModelCar>('cars')
        const cars = await carCollection.query().fetch()
        
        if (isMounted) {
          setCars(cars);
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Erro ao obter carros");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(()=>{
    if(netInfo.isConnected === true){
      offlineSynchronize()
    }
  },[netInfo.isConnected])

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
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car onPress={() => handleCarDetails(item)} data={item} />
          )}
        />
      )}
    </Container>
  );
}
