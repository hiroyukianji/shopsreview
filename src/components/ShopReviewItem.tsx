import React from "react";
import { StyleSheet, Image, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
/* type */
import { Shop } from "../types/Shop";
/* components */
import { Stars } from "./Stars";


/* コンポーネントの幅指定 */
/* 画面の幅を、Dimensionsで取得して計算 */
const { width } = Dimensions.get("window");
const CONTAINER_WIDTH = width / 2 ;
const PADDING = 16;
const IMAGE_WIDTH = CONTAINER_WIDTH - PADDING * 2 ;

/**
 * 引数定義
 */
type Props = {
  shop: Shop;
  onPress: () => void;
};

/**
 * １件のショップ情報の表示、
 * @param Shop     ショップタイプ
 * @param onPress  タッチ関数
 */
export const ShopReviewItem: React.FC<Props> = ({ shop, onPress }: Props) => {
  const { name, place, imageUrl, score } = shop;
  return <TouchableOpacity style={styles.container} onPress={onPress}>
    <Image source={{ uri:imageUrl }} style={styles.image} />
    <Text style={styles.nameText}>{shop.name}</Text>
    <Text style={styles.placeText}>{shop.place}</Text>
    <Stars score={shop.score} />
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
    padding: 16,
  },
  image:{
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH * 0.7,
  },
  nameText:{
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop:8,    
  },
  placeText:{
    fontSize: 12,
    fontWeight: "bold",
    color: "#888",
    marginTop:8,  
  }
});
