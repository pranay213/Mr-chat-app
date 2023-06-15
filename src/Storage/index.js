export const storeToken = async (token) => {
  let lsToken = await localStorage.setItem("lstoken", token);
  return lsToken;
};

export const getToken = async () => {
  let lsToken = await localStorage.getItem("lstoken");
  return lsToken;
};

export const clearToken = async () => {
  let clearAll = await localStorage.clear();
  return clearAll;
};

export const storeName = async (username) => {
  let name = await localStorage.setItem("name", username);
  return name;
};

export const getName = async () => {
  let name = await localStorage.getItem("name");
  return name;
};
