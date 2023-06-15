import { createContext, useEffect, useState } from "react";
import ToasterContainer from "../components/Toast";
import { getToken, storeToken } from "../Storage";

const MainContext = createContext("");

const MainContextProvider = ({ children }) => {
  const [loginToken, setLoginToken] = useState(null);
  useEffect(() => {
    (async () => {
      let token = await getToken();
      if (token) setLoginToken((prev) => token);
    })();
  }, []);
  useEffect(() => {
    if (loginToken) storeToken(loginToken);
  }, [loginToken]);
  return (
    <MainContext.Provider value={{ loginToken, setLoginToken }}>
      {children}
      <ToasterContainer />
    </MainContext.Provider>
  );
};

export { MainContext, MainContextProvider };
