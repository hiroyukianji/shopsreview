import { createContext } from "react";
import { User } from "../types/user";

type UserContextValue = {
  user: User | null;
  setUser: (user: User | null) => void;
};

/**
 * ユーザ情報：コンテキスト
 */
export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
});
