import { Link, Outlet, useNavigate } from "react-router-dom";
import "./DashStack.css";
import { useEffect, useState } from "react";
import ConfirmPopUp from "../components/ConfirmPopUp";

const DashStack = () => {
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <div
      className="page"
      style={
        isShow ? { height: "100vh", overflow: "hidden" } : { height: "auto" }
      }
    >
      <aside>
        <div className="container">
          <div className="holder">
            <h1 className="logo">
              <span>Dash</span>
              <span>Stack</span>
            </h1>
            <ul>
              <li>
                <img src="/public/assets/dashboard-icon.png" />
                <p>Dashboard</p>
              </li>
              <li className="active">
                <img src="/public/assets/products-icon.png" />
                <p>Products</p>
              </li>
            </ul>
          </div>
          <button onClick={() => setIsShow((prev) => !prev)}>
            <img src="/public/assets/logout-icon.png" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main>
        <Outlet />
      </main>
      {isShow && <ConfirmPopUp action="Logout" handleCancelation={setIsShow} />}
    </div>
  );
};

export default DashStack;
