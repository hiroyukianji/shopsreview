import React, { useEffect, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { signin } from "../lib/firebase";
/* contexts */
import { UserContext } from "../contexts/userContext";

/**
 */
export const AuthScreen: React.FC = () => {
  const {setUser} = useContext(UserContext);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await signin();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color="#748" />
      <Text style={styles.text}>ログイン中...</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 16,
    fontSize: 12,
    color: "#888",
  },
});
