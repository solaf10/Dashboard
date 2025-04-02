import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const data = {
    email,
    password,
  };
  function handleLogIn(e) {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("https://vica.website/api/login", data)
      .then((res) => {
        setIsLoading(false);
        localStorage.setItem("token", `Bearer ${res.data.token}`);
        localStorage.setItem("userName", res.data.user.first_name);
        navigate("/products");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="sign signin">
      <div className="title">
        <h1>Sign In</h1>
        <p>Please enter your email and password to continue</p>
      </div>
      <form onSubmit={handleLogIn}>
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
        <div className="auth-footer">
          <div className="submit">
            {isLoading ? (
              <button className="btn">
                <Loader isbtn={true} />
              </button>
            ) : (
              <input type="submit" value="Sign In" />
            )}
          </div>
          <span>Don’t have an account? </span>
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
