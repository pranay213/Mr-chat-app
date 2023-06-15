import { PropagateLoader } from "react-spinners";
import "./index.css";

const Button = (props) => {
  const { buttonText, onClick, loading } = props;
  return (
    <button
      type="button"
      className="get-started-button"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <PropagateLoader
          size={10}
          color="#36d7b7"
          cssOverride={{
            marginTop: -5,
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      ) : (
        buttonText
      )}
    </button>
  );
};

export default Button;
