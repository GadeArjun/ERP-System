import { createContext, useState } from "react";

const userDataContext = createContext();

export function UserDataContextProvider({ children }) {
  const [userData, setUserData] = useState(null);

  return (
    <userDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </userDataContext.Provider>
  );
}

export default userDataContext;
