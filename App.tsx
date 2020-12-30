import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";
import { LogBox } from "react-native";
import _ from "lodash";



// Optionally import the services that you want to use
//import "firebase/auth";
//mport "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";


LogBox.ignoreLogs(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

// 初期化していない場合の未初期化

console.log(firebase.apps.length);

if (!firebase.apps.length) {
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAIcrAN8GwcEIbbbRtyYFzDVZ7yrxo3uJg",
    authDomain: "shopreview-f85de.firebaseapp.com",
    projectId: "shopreview-f85de",
    storageBucket: "shopreview-f85de.appspot.com",
    messagingSenderId: "766628334389",
    appId: "1:766628334389:web:a3da4f61267ccc9ff41a7c",
    measurementId: "G-JFJK0ZZZV1"
  };

  console.log("init 1 firebase");
  firebase.initializeApp(firebaseConfig);
  console.log("init 2 firebase");
}
console.log(firebase.apps.length);

type Shop = {
  name: string;
  place: string;
};

export default function App() {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    const snapshot = await firebase.firestore().collection("shops").get();
    const shops = snapshot.docs.map((doc) => doc.data() as Shop);
    setShops(shops);
    console.log(shops);
  };

  const shopItems = shops.map((shop, index) => (
    <View style={{margin: 10}} key={index.toString()}>
      <Text>{shop.name}</Text>
      <Text>{shop.place}</Text>
    </View>
  ));

  return (
    <View style={styles.container}>
     {shopItems}      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
