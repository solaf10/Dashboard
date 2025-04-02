import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const SignUp = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [profile_image, setProfileImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const data = {
    first_name,
    last_name,
    user_name: first_name + "_" + last_name,
    email,
    password,
    password_confirmation,
    profile_image,
  };

  function handleRegister(e) {
    setIsLoading(true);
    e.preventDefault();
    axios
      .post("https://vica.website/api/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setIsLoading(false);
        localStorage.setItem("token", `Bearer ${res.data.data.token}`);
        localStorage.setItem("userName", first_name);
        // navigate("/products", { state: first_name });
        navigate("/products");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="sign signup">
      <div className="title">
        <h1>Sign Up</h1>
        <p>Create a account to continue</p>
      </div>
      <form onSubmit={handleRegister}>
        <div className="first-name">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            id="first-name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="last-name">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            id="last-name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="********"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="confirm">
          <label htmlFor="confirm">Confirm</label>
          <input
            type="password"
            placeholder="********"
            id="confirm"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <div className="profile-image">
          <label htmlFor="profile-image">Profile Image</label>
          <input
            type="file"
            id="profile-image"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
          <div className="upload">
            <img src="/public/assets/Upload icon.svg" alt="" />
          </div>
        </div>
        <div className="submit">
          {isLoading ? (
            <button className="btn">
              <Loader isbtn={true} />
            </button>
          ) : (
            <input type="submit" value="Sign Up" />
          )}
        </div>
      </form>
      <div className="auth-footer">
        <span>Already have an account?</span>
        <Link to="/">Sign In</Link>
      </div>
    </div>
  );
};

export default SignUp;
