import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import "./App.css";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import DashStack from "./DashStack/DashStack";
import Products from "./DashStack/Products";
import ControlProduct from "./DashStack/ControlProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="products" element={<DashStack />}>
          <Route path="/products" element={<Products />} />
          <Route path="add" element={<ControlProduct process="Add" />} />
          <Route path=":id" element={<ControlProduct process="Edit" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
