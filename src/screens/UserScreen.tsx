import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
/* types */
import { Shop } from "../types/Shop";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
/* components */
import { ShopDetail } from "../components/ShopDetail";
/**
 * 画面遷移時の型定義
 *
 * HomeScreenから、ショップ情報を受け取るので、これについても定義
 */
type Props = {
  navigation: StackNavigationProp<RootStackParamList, "User">;
  route: RouteProp<RootStackParamList, "User">;
};

/**
 * ショップ詳細表示画面
 *
 * 投稿されているレビューを最新順で表示
 * ＋タッチで、レビュー投稿画面へ遷移
 */
export const UserScreen: React.FC<Props> = ({ navigation, route }) => {
 

  return (
    <SafeAreaView style={styles.container}>
      <Text>User Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
})
