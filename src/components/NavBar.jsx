import "./NavBar.css";

const NavBar = ({ title, userImage, userName }) => {
  return (
    <nav>
      <div className="logo">{title}</div>
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
