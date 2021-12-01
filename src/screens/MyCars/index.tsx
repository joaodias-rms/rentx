import React, { useEffect, useState } from "react";
import { Alert, FlatList, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";

import { AntDesign } from "@expo/vector-icons";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";

import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { LoadAnimation } from "../../components/LoadAnimation";

import { carDTO } from "../../dtos/carDTO";
import theme from "../../styles/theme";

interface CarProps {
  id: string;
  user_id: string;
  car: carDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/schedules_byuser?user_id=1");
        setCars(response.data);
      } catch (error) {
        console.log(error);
        Alert.alert(
          "Não foi possível carregar seus veículos",
          "Tente novamente"
        );
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
        <BackButton onPress={handleGoBack} color={theme.colors.shape} />
        <Title>
          Aqui estão {"\n"}seus veículos {"\n"}agendados
        </Title>
        <SubTitle>Conforto e segurança garantidos</SubTitle>
      </Header>
      <Content>
        {loading ? (
          <LoadAnimation />
        ) : (
          <>
            <Appointments>
              <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
              <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
            </Appointments>
            <FlatList
              data={cars}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <CarWrapper>
                  <Car data={item.car} />
                  <CarFooter>
                    <CarFooterTitle>Periodo</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>{item.startDate}</CarFooterDate>
                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={theme.colors.title}
                        style={{ marginHorizontal: 10 }}
                      />
                      <CarFooterDate>{item.endDate}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              )}
            />
          </>
        )}
      </Content>
    </Container>
  );
}
