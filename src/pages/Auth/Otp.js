import BackgroundChatImage from "../../components/svgs/BackgroundChatImage";
import CountryCodeImage from "../../components/svgs/CountryCodeImage";
import Button from "../../components/Button";
import "../../css/Login.css";
import { useContext, useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import { sendOTP, verifyOtp } from "../../Api";
import { useNavigate, useLocation } from "react-router-dom";
import OTPInput from "react-otp-input";
import { MainContext } from "../../Context";
import { ErrorToast } from "../../components/Toast";

const OtpScreen = () => {
  const { loginToken, setLoginToken } = useContext(MainContext);
  const [otp, setOtp] = useState();
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const location = useLocation();
  let number = location?.state?.number || null;
  console.log({ number });
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  //   const number = route.number || null;

  useEffect(() => {
    if (!number) {
      return navigate("/login");
    }
  }, []);
  const submitFn = async (e) => {
    e.persist();
    if (!otp) {
      return ErrorToast("Please Enter Your OTP");
    }
    if (otp.length !== 6) {
      return ErrorToast("Please Fill OTP");
    }
    setLoading(true);
    let res = await verifyOtp(number, otp);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    if (res.status === 200) {
      setLoginToken((prev) => res.token);
      return navigate("/profile");
    }
    // console.log("loginResponse", res);
  };
  const resendFn = async (e) => {
    e.persist();
    if (timeLeft === 0) {
      setTimeLeft((prev) => 60);
      let res = await sendOTP(number);
    }
  };
  return (
    <div className="login-bg-container">
      <h1 className="heading"> --Chat App--</h1>
      <BackgroundChatImage className="background-chat-image" />
      <div className="login-container" style={{ margin: "50px 0" }}>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputType="number"
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{ width: 30, height: 30, marginBottom: 20 }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {timeLeft ? (
          <p style={{ color: "white", margin: "0px 30px" }}>
            {"Resend In "}
            {timeLeft}
          </p>
        ) : (
          <button className={"resendBtn"} onClick={resendFn}>
            {"Resend"}
          </button>
        )}
      </div>
      <Button
        buttonText={"Submit"}
        className="button-element"
        onClick={submitFn}
        loading={loading}
      />
    </div>
  );
};
export default OtpScreen;
