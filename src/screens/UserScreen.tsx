import React, { useContext, useState } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput } from "react-native";
import { updateUser } from "../lib/firebase";
import firebase from "firebase";
/* types */
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
/* components */
import { Form } from "../components/Form";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
/* contexts */
import { UserContext } from "../contexts/userContext";

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
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState<string>(user.name);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setLoading(true);
    const updatedAt = firebase.firestore.Timestamp.now();
    await updateUser(user.id, { name, updatedAt });
    setUser({ ...user, name });
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Form
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
        label="名前"
      />
      <Button onPress={onSubmit} text="保存する" />
      <Loading visible={loading} />
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
