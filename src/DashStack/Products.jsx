import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Product from "../components/Product";
import "./DashStack.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  // const location = useLocation();
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    axios
      .get("https://vica.website/api/items", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <NavBar
        title="Products"
        userImage="/public/assets/profile.png"
        // userName={location.state}
        userName={userName}
      />
      <div className="content">
        <header>
          <p>Manage Products</p>
          <button>+ Add product</button>
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
            {products.map((product, i) => (
              <Product
                key={i}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image_url}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
