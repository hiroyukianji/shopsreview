import firebase from "firebase";

/**
 * ユーザ情報
 */
export type User = {
  id?: string;
  name: string;
  updatedAt: firebase.firestore.Timestamp;
  createdAt: firebase.firestore.Timestamp;
  //  updatedAt: string;
  //  createdAt: string;
}; 

/**
 * ユーザ情報初期値
 */
export const initialUser: User = {
  name: "",
  updatedAt: firebase.firestore.Timestamp.now(),
  createdAt: firebase.firestore.Timestamp.now(),
  //  updatedAt: "",
  //  createdAt: "",
};
