import "./NavBar.css";
import { TiThMenu } from "react-icons/ti";

const NavBar = ({ title, userImage, userName, setIsOpen }) => {
  return (
    <nav>
      <div className="menu">
        <div className="icon-holder" onClick={() => setIsOpen((prev) => !prev)}>
          <TiThMenu className="icon" />
        </div>
        <div className="logo">{title}</div>
      </div>
      <div className="profile-infos">
        <img src={userImage} alt={userName} />
        <div className="user-infos">
          <p style={{ textTransform: "capitalize" }}>{userName}</p>
          <p>Admin</p>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
