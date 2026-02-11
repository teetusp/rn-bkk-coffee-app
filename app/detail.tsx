import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapvView, { Marker } from "react-native-maps";
export default function Detail() {
  const params = useLocalSearchParams();

  // ฟังก์ชันสำหรับเปิดแอปโทรศัพท์
  const handleCallApp = () => {
    const phoneNumber = params.phone as string;
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url);
  };
  // ฟังก์ชันสำหรับเปิดแอปแผนที่
  const handleOpenMapApp = () => {
    // สร้างตัวเปิด Google maps
    const googleMap = `https://maps.google.com/?q=${params.latitude},${params.longitude}`;
    // สร้างตัวเปิด Apple maps
    const appleMap = `http://maps.apple.com/?q=${params.name}&ll=${params.latitude},${params.longitude}`;
    // ตรวจสอบการเปิดลแอป Google Maps หรือ Apple Maps โดยยึด Google Maps เป็นหลัก
    Linking.canOpenURL(googleMap).then((supported) => {
      if (supported) {
        Linking.openURL(googleMap);
      } else {
        Linking.openURL(appleMap);
      }
    });
  };

  return (
    <ScrollView style={{ marginBottom: 20 }}>
      <Image
        source={{ uri: params.image_url as string }}
        style={{ width: "100%", height: 200 }}
      />
      {/* แสดงรายละเอียดของร้าน */}
      <View style={{ padding: 10, gap: 10 }}>
        <Text style={{ fontFamily: "Kanit_700Bold", fontSize: 20 }}>
          {params.name as string}
        </Text>
        <Text
          style={{
            fontFamily: "Kanit_400Regular",
            fontSize: 16,
            color: "#868686",
          }}
        >
          {params.district as string}
        </Text>
        <Text style={{ fontFamily: "Kanit_400Regular", fontSize: 16 }}>
          {params.description as string}
        </Text>
        <TouchableOpacity onPress={handleCallApp} style={styles.buttonCallApp}>
          <Text
            style={{
              fontFamily: "Kanit_400Regular",
              fontSize: 16,
              color: "#ffffff",
            }}
          >
            📞 {params.phone as string}
          </Text>
        </TouchableOpacity>
        <Text style={{ fontFamily: "Kanit_700Bold", fontSize: 18 }}>
          แผนที่ร้าน
          <MapvView
            style={{ width: "100%", height: 300 }}
            initialRegion={{
              latitude: parseFloat(params.latitude as string),
              longitude: parseFloat(params.longitude as string),
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: parseFloat(params.latitude as string),
                longitude: parseFloat(params.longitude as string),
              }}
              title={params.name as string}
              description={params.description as string}
              onPress={handleOpenMapApp}
            />
          </MapvView>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonCallApp: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: "#14a430",
    borderRadius: 5,
    alignItems: "center",
  },
});
