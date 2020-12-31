import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { LogBox } from "react-native";
import _ from "lodash";
import Constants from "expo-constants";
/* types */
import { Shop } from "../types/Shop";

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
if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(Constants.manifest.extra.firebase);
}

/**
 * Shopの取得
 * 全件
 * ソート指定なし
 */
export const getShops = async () => {
  const snapshot = await firebase.firestore().collection("shops").get();
  const shops = snapshot.docs.map((doc) => doc.data() as Shop);
  return shops;
};
