import BackgroundChatImage from "../../components/svgs/BackgroundChatImage";
import Button from "../../components/Button";
import "../../css/Login.css";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Toast, { ErrorToast } from "../../components/Toast";
import { sendOTP } from "../../Api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ number: "", checked: false });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const numberChange = (phone) => {
    console.log({ phone });
    setUser((prev) => ({ ...prev, number: phone }));
  };
  const checkedChange = () => {
    setUser((prev) => ({ ...prev, checked: !user.checked }));
  };
  const loginFn = async () => {
    if (!user.number) {
      return ErrorToast("Please Enter Your Number");
    }
    if (!user.checked) {
      return ErrorToast("Please Accecpt Terms ");
    }
    setLoading(true);
    let res = await sendOTP(user.number);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    if (res.status === 200) {
      navigate("/otp", { state: { number: user.number } });
    }
    console.log("loginResponse", res);
  };
  return (
    <div className="login-bg-container">
      <h1 className="heading"> --Chat App--</h1>
      <BackgroundChatImage className="background-chat-image" />
      <div className="login-container">
        <PhoneInput
          country={"in"}
          value={user.phone}
          onChange={numberChange}
          onlyCountries={["in"]}
          disableCountryCode={true}
          containerClass="container-class"
          //   containerStyle={{ width: "100%" }}
          inputStyle={{ width: "100%", margin: "auto" }}
        />
      </div>
      <div className="checkbox-container">
        <input
          type="checkbox"
          className="checkbox-element"
          defaultChecked={user.checked}
          onChange={checkedChange}
        />
        <p>Accept Terms & Conditions</p>
      </div>
      <Button
        buttonText={"Login"}
        className="button-element"
        onClick={loginFn}
        loading={loading}
      />
    </div>
  );
};
export default Login;
