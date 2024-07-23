import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/admin_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [image, setImage] = useState(false);
  const url = "http://localhost:5000";

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const postData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value); 
    });
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData);

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      // alert("error");
      toast.error(response.data.message)
    }
  };

  return (
    <div className="add">
      <p>Food provides essential nutrients for overall health and well-being</p>
      <form action="" className="flex-col" onSubmit={postData}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload_img"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onInputChange}
            value={data.name}
            type="text"
            name="name"
            placeholder="type here"
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onInputChange}
            value={data.description}
            name="description"
            rows="6"
            placeholder="write content here"
            required
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              onChange={onInputChange}
              value={data.category}
              name="category"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onInputChange}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
