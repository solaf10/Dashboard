import "./Product.css";

const Product = ({ id, name, price, image }) => {
  return (
    <tr scope="row">
      <td>{id}</td>
      <td>{name}</td>
      <td>${price}</td>
      <td>
        <img src={image} alt={name} />
      </td>
      <td>
        <button className="edit">
          <img src="/public/assets/pencil-write.png" alt="edit" />
        </button>
        <button className="delete">
          <img src="/public/assets/bin.png" alt="del" />
        </button>
      </td>
    </tr>
  );
};

export default Product;
