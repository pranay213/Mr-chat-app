import React from "react";
import "../../css/Appinput.css";
const AppInput = (props) => {
  const { placeholder, onChange, value } = props;
  return (
    <input
      className="App-Input"
      placeholder={placeholder ? placeholder : ""}
      onChange={onChange}
      value={value}
    />
  );
};

export default AppInput;
