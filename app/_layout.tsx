import {
  Kanit_400Regular,
  Kanit_500Medium,
  Kanit_600SemiBold,
  Kanit_700Bold,
  useFonts,
} from "@expo-google-fonts/kanit";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_700Bold,
    Kanit_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="home"
        options={{
          title: "Top 10 Bangkok Coffees",
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
          headerTitleStyle: {
            fontFamily: "Kanit_400Regular",
            color: "#ffffff",
          },
          headerStyle: {
            backgroundColor: "#4A3B32",
          },
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: "รายละเอียดร้าน",
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
          headerTitleStyle: {
            fontFamily: "Kanit_400Regular",
            color: "#ffffff",
          },

          headerStyle: {
            backgroundColor: "#4A3B32",
          },
        }}
      />
    </Stack>
  );
}
