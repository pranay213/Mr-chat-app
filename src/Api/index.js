import axios from "axios";
import { ErrorToast, SuccessToast } from "../components/Toast";
import { getToken } from "../Storage";

const lstoken = await getToken();

// const baseUrl = "https://chat-api.cyclic.app/api/";
const baseUrl = "http://localhost:5000/api";
// const baseUrl = "https://chat-api-app.up.railway.app/api";

export const ApiCall = axios.create({
  baseURL: baseUrl,
  validateStatus: (status) => status < 500,
  headers: { "Content-Type": "application/json" },
});

export const sendOTP = async (number) => {
  let res = await ApiCall.post(`/user/auth`, { number });
  console.log("Response", res);
  const { data } = res;
  if (data.status == 200) {
    SuccessToast(data.message);
  } else {
    ErrorToast(data.message);
  }
  return data;
};

export const verifyOtp = async (number, otp) => {
  let res = await ApiCall.post(`user/auth/verify-otp`, { number, otp });
  const { data } = res;
  if (data.status == 200) {
    SuccessToast(data.message);
  } else {
    ErrorToast(data.message);
  }
  return data;
};

export const uploadImage = async (FormData) => {
  try {
    let headers = { "Content-Type": "multipart/form-data", lstoken };
    let res = await ApiCall.post("user/auth/update-image", FormData, {
      headers: headers,
    });
    const { data } = res;
    if (data.status == 200) {
      SuccessToast(data.message);
    } else {
      ErrorToast(data.message);
    }
    return data;
  } catch (error) {
    ErrorToast(error);
  }
};

export const fetchImage = async () => {
  try {
    let headers = { "Content-Type": "application/json", lstoken };
    let res = await ApiCall.get("user/auth/get-user", {
      headers: headers,
    });
    const { data } = res;
    if (data.status == 200) {
      // SuccessToast(data.message);
    } else {
      // ErrorToast(data.message);
    }
    return data;
  } catch (error) {
    ErrorToast(error);
  }
};

export const getImage = async () => {
  try {
    let headers = { "Content-Type": "application/json", lstoken };
    let res = await ApiCall.get("user/auth/get-image/", {
      headers: headers,
    });
    const { data } = res;
    if (data.status == 200) {
      // SuccessToast(data.message);
    } else {
      // ErrorToast(data.message);
    }
    return data;
  } catch (error) {
    ErrorToast(error);
  }
};

export const updateName = async (name) => {
  try {
    let headers = { "Content-Type": "application/json", lstoken };
    let res = await ApiCall.post(
      "user/auth/update-name/",
      { name },
      {
        headers: headers,
      }
    );
    const { data } = res;
    if (data.status == 200) {
      SuccessToast(data.message);
    } else {
      ErrorToast(data.message);
    }
    return data;
  } catch (error) {
    ErrorToast(error);
  }
};
