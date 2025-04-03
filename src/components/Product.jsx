import { useState } from "react";
import "./Product.css";
import ConfirmPopUp from "./ConfirmPopUp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Product = ({ id, name, price, image, handleOpenPopUp }) => {
  const navigate = useNavigate();
  return (
    <>
      <tr scope="row">
        <td data-label="#">{id}</td>
        <td data-label="Product Name">{name}</td>
        <td data-label="Price">${price}</td>
        <td data-label="Image">
          <img src={image} alt={name} />
        </td>
        <td data-label="Action">
          <button className="edit" onClick={() => navigate(`/products/${id}`)}>
            <img src="/assets/pencil-write.png" alt="edit" />
          </button>
          <button className="delete" onClick={() => handleOpenPopUp(id)}>
            <img src="/assets/bin.png" alt="del" />
          </button>
        </td>
      </tr>
    </>
  );
};

export default Product;
