import { Link, Outlet, useNavigate } from "react-router-dom";
import "./DashStack.css";
import { useEffect, useState } from "react";
import ConfirmPopUp from "../components/ConfirmPopUp";
import NavBar from "../components/NavBar";
import axios from "axios";
import { IoClose } from "react-icons/io5";

const DashStack = () => {
  const [isShow, setIsShow] = useState(false);
  const [isOpen, setIsOpen] = useState(() =>
    window.innerWidth >= 991 ? true : false
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  function handleLogOut() {
    setIsLoading(true);
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
        setIsLoading(false);
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(true);
      });
  }
  return (
    <div
      className="page"
      style={
        isShow ? { height: "100vh", overflow: "hidden" } : { height: "auto" }
      }
    >
      <aside style={{ left: isOpen ? "0px" : "-100%" }}>
        <div className="container">
          <div className="holder">
            <div className="header">
              <h1 className="logo" onClick={() => navigate("/products")}>
                <span>Dash</span>
                <span>Stack</span>
              </h1>
              <div className="close-holder">
                <IoClose className="close" onClick={() => setIsOpen(false)} />
              </div>
            </div>
            <ul>
              <li>
                <img src="/assets/dashboard-icon.png" />
                <p>Dashboard</p>
              </li>
              <li className="active">
                <img src="/assets/products-icon.png" />
                <p>Products</p>
              </li>
            </ul>
          </div>
          <button onClick={() => setIsShow((prev) => !prev)}>
            <img src="/assets/logout-icon.png" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main>
        <NavBar
          title="Products"
          setIsOpen={setIsOpen}
          userImage="/assets/profile.png"
          // userName={location.state}
          userName={userName}
        />
        <Outlet />
      </main>
      {isShow && (
        <ConfirmPopUp
          action="Logout"
          handleCancelation={() => setIsShow(false)}
          handleAction={handleLogOut}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default DashStack;
