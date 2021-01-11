import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import firebase from "firebase";
import { pickImage } from "../lib/image-picker";
/* lib */
import { createReviewRef } from "../lib/firebase";
import { uploadImage } from "../lib/firebase";
import { getReviews } from "../lib/firebase";
/* types */
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { Review } from "../types/review";
/* components */
import { IconButton } from "../components/IconButton";
import { TextArea } from "../components/TextArea";
import { StarInput } from "../components/StarInput";
import { Button } from "../components/Button";
import { UserContext } from "../contexts/userContext";
import { Loading } from "../components/Loading";
/* utils */
import { getExtention } from "../utils/file";
/* context */
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
 * レビュー投稿画面
 * 登録ボタンタッチで、firebaseに登録する
 */
export const CrateReviewScreen: React.FC<Props> = ({ navigation, route }) => {
  const { shop } = route.params;
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(3);
  const { user } = useContext(UserContext);
  const [imageUri, setImageUri] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { reviews, setReviews } = useContext(ReviewsContext);

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

  /**
   * レビュー投稿処理
   * Review typeに、各値を設定して、登録処理を呼び出す
   *
   */
  const onSubmit = async () => {
    // 入力チェック
    if (!text || !imageUri) {
      Alert.alert("レビューまたは画像がありません");
      return;
    }

    setLoading(true);
    // documentIdを先に取得
    const reviewDocRef = await createReviewRef(shop.id);
    // storageのpathを決定
    const ext = getExtention(imageUri);
    const storagePath = `reviews/${reviewDocRef.id}.${ext}`;
    // 画像をstorageにアップロード
    const downloadUrl = await uploadImage(imageUri, storagePath);
    // reviewドキュメントを作成
    const review = {
      id:reviewDocRef.id,
      user: {
        name: user?.name,
        id: user?.id,
      },
      shop: {
        name: shop.name,
        id: shop.id,
      },
      text: text,
      score: score,
      imageUrl: downloadUrl,
      updatedAt: firebase.firestore.Timestamp.now(),
      createdAt: firebase.firestore.Timestamp.now(),
    } as Review;
    await reviewDocRef.set(review);
    const reviews = await getReviews(shop.id);
    // navigation.goBack() で画面遷移しても通信が発生しないので、ここで最新のデータを取得する
    setReviews(reviews);
    setLoading(false);
    navigation.goBack();
  };

  /**
   * 写真選択
   */
  const onPickImage = async () => {
    const uri = await pickImage();
    setImageUri(uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StarInput score={score} onChangeScore={(value) => setScore(value)} />
      <TextArea
        onChangeText={(value) => setText(value)}
        value={text}
        label={"レビュー"}
        placeholder={"レビューを書いてください"}
      />
      <View style={styles.photoContainer}>
        <IconButton name="camera" onPress={onPickImage} color="#cccc" />
        {!!imageUri && (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
      </View>
      <Button text="レビューを登録" onPress={onSubmit} />
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  photoContainer: {
    marginLeft: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 8,
  },
});
