import { supabase } from "@/services/supabase";
import { CoffeeShop } from "@/types";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  // สร้าง State เพื่อเก็บข้อมูล coffee_shops ที่ดึงมาจากฐานข้อมูล
  const [shops, setShops] = useState<CoffeeShop[]>([]);

  // ดึงข้อมูล coffee_shops จากฐานข้อมูล และเก็บใน State ที่สร้างไว้
  useEffect(() => {
    //ฟังก์ชันสำหรับดึงข้อมูล coffee_shops
    const fetchCoffeeShops = async () => {
      const { data, error } = await supabase
        .from("coffee_shops")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        //แสดงข้อผิดพลาดถ้ามี
        Alert.alert(
          "คำเตอน",
          "เกิดข้อผิดพลาดในการดึงข้อมูล กรุณาลองใหม่อีกครั้ง",
        );
      } else {
        setShops(data);
      }
    };

    //เรียกใช้ฟังก์ชันดึงข้อมูลให้ทำงาน
    fetchCoffeeShops();
  }, []);

  // สร้างหน้าตาของ Component รายการที่จะแสดงใน FlatList
  const renderShopItem = ({ item }: { item: CoffeeShop }) => (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() =>
        router.push({
          pathname: "/detail",
          params: {
            id: item.id,
            name: item.name,
            district: item.district,
            description: item.description,
            latitude: item.latitude,
            longitude: item.longitude,
            image_url: item.image_url,
            phone: item.phone,
          },
        })
      }
    >
      <Image
        source={{ uri: item.image_url }}
        style={{ height: 75, width: 75, borderRadius: 5 }}
      />
      <View style={{ marginLeft: 10, justifyContent: "center" }}>
        <Text style={styles.shopName}>{item.name}</Text>
        <Text style={styles.shopDistrict}>🚩 {item.district}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        contentContainerStyle={{ padding: 15 }}
        showsVerticalScrollIndicator={false}
        data={shops} // กำหนดข้อมูลที่จะแสดงใน FlatList
        keyExtractor={(item) => item.id} // กำหนด key สำหรับแต่ละรายการ
        renderItem={renderShopItem} //หน้าตาของแต่ละรายการที่จะแสดงใน FlatList
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shopName: {
    fontFamily: "Kanit_700Bold",
    fontSize: 16,
  },
  shopDistrict: {
    fontFamily: "Kanit_400Regular",
    fontSize: 16,
    color: "#868686",
  },
  cardItem: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
});
