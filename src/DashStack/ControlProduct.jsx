import { useEffect, useState } from "react";
import "./ControlProduct.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const ControlProduct = ({ process }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [isGettingLoading, setIsGettingLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const param = useParams();
  function handleSubmitting(e) {
    e.preventDefault();
    setIsLoading(true);
    process == "Add"
      ? axios
          .post(
            "https://vica.website/api/items",
            { name, price, image },
            {
              headers: {
                Authorization: localStorage.getItem("token"),
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            setIsLoading(false);
            navigate("/products");
          })
          .catch((err) => console.log(err))
      : axios
          .post(
            `https://vica.website/api/items/${param.id}`,
            { name, price, image, _method: "PUT" },
            {
              headers: {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            setIsLoading(false);
            navigate("/products");
          })
          .catch((err) => console.log(err));
  }
  process == "Edit" &&
    useEffect(() => {
      setIsGettingLoading(true);
      axios
        .get(`https://vica.website/api/items/${param.id}`, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          setIsGettingLoading(false);
          setName(res.data.name);
          setPrice(res.data.price);
          setImage(res.data.image_url);
        })
        .catch((err) => console.log(err));
    }, []);
  return (
    <div className="control-products content">
      {isGettingLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <>
          <p>{process} Product</p>
          <div className="holder">
            <form onSubmit={handleSubmitting}>
              <div className="name">
                <label htmlFor="product-name">Product Name</label>
                <input
                  type="text"
                  id="product-name"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="price">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  id="price"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              {isLoading ? (
                <div className="btn">
                  <Loader isbtn={true} />
                </div>
              ) : (
                <input className="btn" type="submit" value="Save" />
              )}
            </form>
            <div className="product-image">
              <div className="upload">
                <input
                  className="upload-input"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <img
                  src={
                    process == "Add"
                      ? "/public/assets/Upload icon.svg"
                      : `${
                          typeof image == "string"
                            ? image
                            : "/public/assets/Upload icon.svg"
                        }`
                  }
                  alt="product image"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ControlProduct;
