import firebase from "firebase";

type userRef = {
  id: string;
  name: string;
}

type shopRef = {
  id: string;
  name: string;
}

/**
 * Shop Review
 */
export type Review = {
  id?: string;
  text: string;
  score: number;
  imageUrl:string;
  user: userRef;
  shop: shopRef;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
};
