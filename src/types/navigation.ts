import { Shop } from "./shop";

/**
 * 画面遷移時のパラメータ定義
 */
export type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  Shop: { shop: Shop };
  User: undefined;
  CreateReview: { shop: Shop };
}