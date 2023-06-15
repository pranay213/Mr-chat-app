import EachUserProfileStory from "../components/svgs/EachUserProfileStory";
import { v4 as uuidv4 } from "uuid";
import "../css/Chats.css";
import NavigationBar from "../components/NavigationBar";
import { useEffect, useState } from "react";
import Circle from "../components/svgs/Cirlce";
import { BarLoader, SkewLoader } from "react-spinners";

const Chats = () => {
  const users = [
    {
      id: uuidv4(),
      name: "vinay",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsZlQZfQdzLu4FDubq5dmk3hB41mR2XWR8OQ&usqp=CAU",
    },
    {
      id: uuidv4(),
      name: "vinni",
      imgUrl:
        "https://www.whatsappimages.in/wp-content/uploads/2021/07/Top-HD-sad-quotes-for-whatsapp-status-in-hindi-Pics-Images-Download-Free.gif",
    },
    {
      id: uuidv4(),
      name: "test1",
      imgUrl:
        "https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
    },
    {
      id: uuidv4(),
      name: "test",
      imgUrl:
        "https://www.whatsappimages.in/wp-content/uploads/2021/07/Top-HD-sad-quotes-for-whatsapp-status-in-hindi-Pics-Images-Download-Free.gif",
    },
  ];
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    setLoading((prev) => true);
    setTimeout(() => {
      setUserData((prev) => users);
      setLoading((prev) => false);
    }, 5000);
  }, []);
  return (
    <div className="chat-bg-container">
      <p className="Welcome-user">
        Welcome back, <span className="user-name">vinay</span>
      </p>
      <ul className="logos-container">
        <Circle />
        {!loading ? (
          userData.length ? (
            userData.map((eachUser) => (
              <EachUserProfileStory userdata={eachUser} key={eachUser.id} />
            ))
          ) : (
            <div className="data-loader">
              <span>{"Nothing Found"}</span>
            </div>
          )
        ) : (
          <div className="loader-spinner">
            <BarLoader color="#fff" size={25} />
          </div>
        )}
      </ul>
      {/* <NavigationBar/> */}
    </div>
  );
};
export default Chats;
