import axios from "axios";
import "./ConfirmPopUp.css";
import { useNavigate } from "react-router-dom";

const ConfirmPopUp = ({ action, handleCancelation }) => {
  const navigate = useNavigate();
  function handleLogOut() {
    axios
      .post(
        "https://vica.website/api/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="overlay">
      <div className="content">
        <p>Are You Sure You Want To {action}?</p>
        <div className="btns">
          <button className="confirm" onClick={handleLogOut}>
            Yes
          </button>
          <button
            className="cancel"
            onClick={() => handleCancelation((prev) => !prev)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopUp;
