import { createContext, useEffect, useState } from "react";
import ToasterContainer from "../components/Toast";
import { getName, getToken, storeName, storeToken } from "../Storage";

const MainContext = createContext("");

const MainContextProvider = ({ children }) => {
  const [loginToken, setLoginToken] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    (async () => {
      let token = await getToken();
      if (token) setLoginToken((prev) => token);
      let name = await getName();
      if (token) setUserName((prev) => name);
    })();
  }, []);

  useEffect(() => {
    if (loginToken) storeToken(loginToken);
  }, [loginToken]);

  useEffect(() => {
    if (userName) storeName(userName);
  }, [userName]);
  return (
    <MainContext.Provider
      value={{ loginToken, setLoginToken, userName, setUserName }}
    >
      {children}
      <ToasterContainer />
    </MainContext.Provider>
  );
};

export { MainContext, MainContextProvider };
