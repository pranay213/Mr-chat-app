import React, { useContext, useEffect, useRef, useState } from "react";
import "../css/Home.css";
import Button from "../components/Button";
import AppInput from "../components/AppInput";
import blankImage from "../assets/images/blankimg.webp";
import Camera from "../components/svgs/Camera";
import { ErrorToast } from "../components/Toast";
import { uploadImage, fetchImage, getImage, updateName } from "../Api";
import { Buffer } from "buffer";
import btoa from "btoa";
import { ClimbingBoxLoader, ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../Context";
const ProfileSetup = () => {
  const { setUserName } = useContext(MainContext);
  const [user, setUser] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const inputElement = useRef();
  let navigate = useNavigate();

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.value) setUser((prev) => ({ ...prev, name: e.target.value }));
  };
  const focusInput = () => {
    inputElement.current.click();
  };

  const updateNameFn = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (user.name) {
      let Response = await updateName(user.name);
      console.log("Response", Response);
      if (Response.status === 200) {
        setLoading(false);
        setUserName((prev) => user.name);
        return navigate("/");
      }
    }
    setLoading(false);
  };

  const ImageUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    var formData = new FormData();
    if ((file?.type).includes("image")) {
      formData.append("image", file);
      setImageLoading(true);
      let res = await uploadImage(formData);
      if (res.status === 200) {
        setFetch((prev) => prev + 1);
      }
      console.log({ formData });
    } else {
      ErrorToast("Please Upload Image Only");
    }
    setImageLoading(false);
  };

  const ImageFetch = async () => {
    setImageLoading(true);
    let res = await fetchImage();
    console.log({ res });
    if (res.status === 200) {
      const { name, image } = res.data;
      setUser((prev) => ({ ...prev, name: name, image: image }));
      if (name) {
        setUserName((prev) => name);
      }
    }
    setImageLoading(false);
  };

  useEffect(() => {
    ImageFetch();
  }, [fetch]);
  return (
    <div className="bg-container">
      <div className="bg-userImage">
        {imageLoading && (
          <div className="loader-img">
            <ClipLoader color="#36d7b7" />
          </div>
        )}
        <img
          // src={user?.image ? user.image : blankImage}
          // className="bg-UserImage"
          src={user.image ? "data:image/webp;base64," + user.image : blankImage}
          className="bg-UserImage"
          style={{ opacity: imageLoading ? 0.25 : 1 }}
        />
        <div className="bg-Camera-div">
          <button
            className="bg-camera"
            onClick={focusInput}
            disabled={imageLoading}
          >
            <Camera />
            <input
              type="file"
              id="bg-camera-id"
              hidden
              ref={inputElement}
              accept="capture=camera,image/*"
              onChange={ImageUpload}
            />
          </button>
        </div>
      </div>
      <AppInput placeholder="Your name" onChange={onChange} value={user.name} />

      <Button buttonText={"Save"} loading={loading} onClick={updateNameFn} />
    </div>
  );
};

export default ProfileSetup;
