import { createContext, useContext, useEffect, useState } from "react";
import ProfileUtils from "../utils/profile";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = ProfileUtils.getProfile();

    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
