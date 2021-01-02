import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, SafeAreaView } from "react-native";
/* types */
import { Shop } from "../types/Shop";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
/* lib */
import { getShops } from "../lib/firebase";
/* components */
import { ShopReviewItem } from "../components/ShopReviewItem";


/**
 * 画面遷移時の型定義
 */
type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

/**
 * ショップ一覧表示画面
 *
 * ショップタッチで、詳細画面へ遷移
 *
 * @param navigation ナビゲーション
 */
export const HomeScreen = ({ navigation }: Props ) => {
  const [shops, setShops] = useState<Shop[]>([]);

  /**
   * 起動時、fireabaseからデータ取得
   */
  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    const shops = await getShops();
    setShops(shops);
  };

  // ショップタッチで、詳細画面へ遷移
  const onPressShop = (shop: Shop) => {
    navigation.navigate("Shop",{ shop});
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={shops}
        renderItem={({ item }: { item: Shop }) => (
          <ShopReviewItem shop={item} onPress={() => onPressShop(item)} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
});
