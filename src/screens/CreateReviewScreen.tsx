import React, { useEffect } from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
/* types */
import { Shop } from "../types/Shop";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
/* components */
import { IconButton } from "../components/IconButton";

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
 */
export const CrateReviewScreen: React.FC<Props> = ({ navigation, route }) => {
  const { shop } = route.params;

  /**
   * shop変更時、ヘッダ名、アイコンを設定
   */
  useEffect(() => {
    navigation.setOptions({
      title: shop.name,
      headerLeft: () => (
        <IconButton name="x" onPress={() => navigation.goBack()} />
      ),
    });
  }, [shop]);

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {},
});
