import { useEffect, useRef, useState } from "react";
import Product from "../components/Product";
import "./DashStack.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmPopUp from "../components/ConfirmPopUp";
import Loader from "../components/Loader/Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rerender, setRerender] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);
  // const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://vica.website/api/items", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setIsLoading(false);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, [rerender]);
  function handleOpenPopUp(id) {
    ref.current = id;
    setIsShow(true);
  }
  function handleDelete() {
    setIsLoading(true);
    axios
      .delete(`https://vica.website/api/items/${ref.current}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
          Accept: "application/json",
        },
      })
      .then((res) => {
        setIsLoading(false);
        setIsShow(false);
        setRerender((prev) => !prev);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="show-products content">
      <header>
        <p>Manage Products</p>
        <button className="btn" onClick={() => navigate("/products/add")}>
          + Add product
        </button>
      </header>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5">
                <Loader />
              </td>
            </tr>
          ) : (
            products.map((product, i) => (
              <Product
                handleOpenPopUp={handleOpenPopUp}
                key={i}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image_url}
              />
            ))
          )}
        </tbody>
      </table>
      {isShow && (
        <ConfirmPopUp
          action="delete the product"
          handleCancelation={() => setIsShow(false)}
          handleAction={handleDelete}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Products;
