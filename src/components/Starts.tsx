import React from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
/* type */
import { Shop } from "../types/Shop";

type Props = {
  score: number;
  starSize?: number;
  textSize?: number;
};

/**
 * 星を１つから５までの表示
 * 設定項目
 * ・星の数
 * ・星のサイズ[16]
 * ・数値のフォントサイズ[14]
 * 星の数は、３項演算子を用いて、表示する星のnameを動的に指定する事で、星の数を表現
 */
export const Starts: React.FC<Props> = ({
  score,
  starSize = 16,
  textSize = 14,
}: Props) => {
  return (
    <View style={styles.container}>
      <FontAwesome name={score >= 1 ? "star" : score >= 0.5 ? "star-half-o" :"star-o"} style={[styles.star, { fontSize: starSize }]} />
      <FontAwesome name={score >= 2 ? "star" : score >= 1.5 ? "star-half-o" :"star-o"} style={[styles.star, { fontSize: starSize }]} />
      <FontAwesome name={score >= 3 ? "star" : score >= 2.5 ? "star-half-o" :"star-o"} style={[styles.star, { fontSize: starSize }]} />
      <FontAwesome name={score >= 4 ? "star" : score >= 3.5 ? "star-half-o" :"star-o"} style={[styles.star, { fontSize: starSize }]} />
      <FontAwesome name={score >= 5 ? "star" : score >= 4.5 ? "star-half-o" :"star-o"} style={[styles.star, { fontSize: starSize }]} />
      <Text style={[styles.scoreText, { fontSize: textSize }]}>{score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    color: "#800",
    marginRight: 4,
  },
  scoreText: {
    color: "#000",
    fontWeight: "bold",
  },
});
