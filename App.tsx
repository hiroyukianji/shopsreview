import React, { useState, useEffect } from "react";
/* navigation */
import { AppNavigation } from "./src/navigation/AppNavigator";
/* contexts */
import { UserContext } from "./src/contexts/userContext";
import { ReviewsContext } from "./src/contexts/reviewContext";
/* types */
import { User } from "./src/types/user";
import { Review } from "./src/types/review";

export default function App() {
  const [user, setUser] = useState<User>();
  const [reviews, setReviews] = useState<Review[]>([]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ReviewsContext.Provider value={{ reviews, setReviews }}>
        <AppNavigation />
      </ReviewsContext.Provider>
    </UserContext.Provider>
  );
}
