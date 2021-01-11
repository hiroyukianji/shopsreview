import React, { useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
/* types */
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
/* components */
import { ShopDetail } from "../components/ShopDetail";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { ReviewItem } from "../components/ReviewItem";
/* lib */
import { getReviews } from "../lib/firebase";
import { ReviewsContext } from "../contexts/reviewContext";

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
  //const [reviews, setReviews] = useState<Review[]>([]);
  const {reviews, setReviews } = useContext(ReviewsContext);

  /**
   * shop変更時、ヘッダ名を設定
   */
  useEffect(() => {
    navigation.setOptions({ title: shop.name });

    const fetchReviews = async () => {
      const reviews = await getReviews(shop.id);
      setReviews(reviews);
    };
    fetchReviews();
  }, [shop]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<ShopDetail shop={shop} />}
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.id}
      />
      <FloatingActionButton
        iconName={"plus"}
        onPress={() => navigation.navigate("CreateReview", { shop })}
      />
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
