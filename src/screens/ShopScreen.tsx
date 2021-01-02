import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
/* types */
import { Shop } from "../types/Shop";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
/* components */
import { ShopDetail } from "../components/ShopDetail";
import { FloatingActionButton } from "../components/FloatingActionButton";
/**
 * 画面遷移時の型定義
 *
 * HomeScreenから、ショップ情報を受け取るので、これについても定義
 */
type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Shop">;
  route: RouteProp<RootStackParamList, "Shop">;
};

/**
 * ショップ詳細表示画面
 *
 * 投稿されているレビューを最新順で表示
 * ＋タッチで、レビュー投稿画面へ遷移
 */
export const ShopScreen: React.FC<Props> = ({ navigation, route }) => {
  const { shop } = route.params;

  /**
   * shop変更時、ヘッダ名を設定
   */
  useEffect(() => {
    navigation.setOptions({ title: shop.name });
  }, [shop]);

  return (
    <SafeAreaView style={styles.container}>
      <ShopDetail shop={shop} />
      <FloatingActionButton iconName={"plus"} onPress={() => navigation.navigate("CreateReview", {shop})}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
});
