import React, { useEffect } from "react";

import BrandSVG from "../../assets/brand.svg";
import LogoSVG from "../../assets/logo.svg";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from "react-native-reanimated";
import { Container } from "./styles";
import { useNavigation } from "@react-navigation/native";

export function Splash() {
  const splashAnimation = useSharedValue(0);
  const navigation = useNavigation();
  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [0, 25, 51],
        [1, 0.3, 0],
        Extrapolate.CLAMP
      ),
      transform: [
        {
          translateX: interpolate(splashAnimation.value, [0, 50], [0, -50]),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [49, 75, 100],
        [0, 0.3, 1],
        Extrapolate.CLAMP
      ),
      transform: [
        {
          translateX: interpolate(splashAnimation.value, [50, 100], [-50, 0]),
        },
      ],
    };
  });

  function startApp() {
    navigation.navigate("Home");
  }

  useEffect(() => {
    splashAnimation.value = withTiming(100, { duration: 3000 }, () => {
      "worklet";
      runOnJS(startApp)();
    });
  }, []);

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: "absolute" }]}>
        <BrandSVG width={80} height={50} />
      </Animated.View>
      <Animated.View style={[logoStyle, { position: "absolute" }]}>
        <LogoSVG width={180} height={20} />
      </Animated.View>
    </Container>
  );
}
