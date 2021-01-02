import * as firebase from "firebase";
import { LogBox } from "react-native";
import _ from "lodash";
import Constants from "expo-constants";
/* types */
import { Shop } from "../types/Shop";
import { initialUser, User } from "../types/user";

// Optionally import the services that you want to use
import "firebase/firestore";
import "firebase/auth";
//mport "firebase/database";
//import "firebase/functions";
//import "firebase/storage";

LogBox.ignoreLogs(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

// 初期化していない場合の初期化
if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(Constants.manifest.extra.firebase);
}

/**
 * Shopの取得
 * 全件
 * ソート指定：スコアの降順
 */
export const getShops = async () => {
  const snapshot = await firebase.firestore().collection("shops").orderBy("score", "desc").get();
  const shops = snapshot.docs.map((doc) => doc.data() as Shop);
  return shops;
};

/**
 * ログイン処理（匿名ログイン処理）
 */
export const signin = async () => {
  // 匿名ログイン
  const userCredintial = await firebase.auth().signInAnonymously();
  const { uid } = userCredintial.user;
  // uidの情報取得
  const userDoc = await firebase.firestore().collection("users").doc(uid).get();
  // 既存の情報なしならば、初期値で作成し、返却
  // 取得時は、取得情報を返却
  console.log("000");
  if (!userDoc.exists) {
    console.log("123");
    await firebase.firestore().collection("users").doc(uid).set(initialUser);
    console.log("456");
    return {
      ...initialUser,
      id: uid,
    } as User
  } else {
    return {
      ...userDoc.data(),
      id: uid,
    } as User
  }
};
