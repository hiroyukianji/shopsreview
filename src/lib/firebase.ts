import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
//mport "firebase/database";
//import "firebase/functions";
//import "firebase/storage";
import Constants from "expo-constants";
/* types */
import { Shop } from "../types/shop";
import { initialUser, User } from "../types/user";
import { Review } from "../types/review";

/**
 * Warning 対策 Start
 */
import { LogBox } from "react-native";
import _ from "lodash";

LogBox.ignoreLogs(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};
/**
 * Warning 対策 End
 */

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
  try {
    const snapshot = await firebase.firestore().collection("shops").orderBy("score", "desc").get();
    const shops = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Shop));
    return shops;
  } catch (err) {
    console.log(err);
    return [];
  }

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
  if (!userDoc.exists) {
    await firebase.firestore().collection("users").doc(uid).set(initialUser);
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

/**
 * ユーザ情報更新
 * @param userId 
 * @param params 
 */
export const updateUser = async (userId: string, params: any) => {
  await firebase.firestore().collection("users").doc(userId).update(params);
}

/**
 * ショップレビューの登録
 * @param shopId 
 * @param review 
 */
export const addReview = async (shopId: string, review: Review) => {
  await firebase.firestore().collection("shops").doc(shopId).collection("reviews").add(review);
}

/**
 * 登録先のレビューIDの取得
 * @param shopId 
 */
export const createReviewRef = async (shopId: string) => {
  return await firebase.firestore().collection("shops").doc(shopId).collection("reviews").doc();
}

/**
 * storageに画像をアップロードして、ダウンロード用のURLを取得する
 * @param uri 画像のパス
 * @param path アップロード先
 */
export const uploadImage = async (uri: string, path: string) => {
  // uriをblobに変換
  const localUri = await fetch(uri);
  const blob = await localUri.blob();
  // storageにupload
  const ref = firebase.storage().ref().child(path);
  let downloadUrl = "";
  try {
    await ref.put(blob);
    downloadUrl = await ref.getDownloadURL();
  } catch (err) {
    console.log(err);
  }
  return downloadUrl;
}

/**
 * レビュー全権取得 投稿日時の降順
 * @param shopId 
 */
export const getReviews = async (shopId: string) => {
  const reviewDocs = await firebase
    .firestore()
    .collection("shops")
    .doc(shopId)
    .collection("reviews")
    .orderBy("createdAt", "desc")
    .get();
  return reviewDocs.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Review)
  );
};