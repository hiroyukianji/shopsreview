import React, { useState, useEffect } from "react";
/* navigation */
import { AppNavigation } from "./src/navigation/AppNavigator";
/* contexts */
import { UserContext } from "./src/contexts/userContext";
/* types */
import { User } from "./src/types/user";

export default function App() {
  const [user, setUser] = useState<User>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppNavigation />
    </UserContext.Provider>
  );
}
