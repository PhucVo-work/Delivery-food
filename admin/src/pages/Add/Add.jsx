import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import { ImUpload2 } from "react-icons/im";
import axios from "axios";
import { toast } from "react-toastify";


const Add = () => {
  const url = "http://localhost:4000";
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
    amount: "1-2 người",
    time: "5-10 phút",
  });

  const onChangHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("amount", data.amount);
    formData.append("time", data.time);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    console.log("Response:", response.data); // Debug response data
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
        amount: "1-2 người",
        time: "5-10 phút",
      })
      setImage(false)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  };

  return (
    <div className="add">
      <form className="flex-row" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Tải ảnh lên</p>
          <label htmlFor="image">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="imgae-upload"
              />
            ) : (
              <div className="upload-area">
                <ImUpload2 className="icon-upload" />
                <p>Bấm vào đây để đổi ảnh</p>
              </div>
            )}
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />

          <div className="add-btn-price">
            <div className="add-price">
              <p className="fx-24">Giá món ăn</p>
              <input
                onChange={onChangHandler}
                value={data.price}
                type="Number"
                name="price"
                placeholder="VNĐ"
              />
            </div>
            <button type="submit" className="add-btn">
              Thêm món ăn
            </button>
          </div>
        </div>

        <div className="left-description">
          <div className="add-product-name flex-col">
            <p className="fx-24">Tên món ăn</p>
            <input
              onChange={onChangHandler}
              value={data.name}
              type="text"
              name="name"
              placeholder="Nhập ở đây"
            />
          </div>
          <div className="add-product-description flex-col">
            <p className="fx-24">Mô tả món ăn</p>
            <textarea
              onChange={onChangHandler}
              value={data.description}
              name="description"
              rows="6"
              placeholder="Viết mô tả ở đây"
              required
            ></textarea>
          </div>
          <div className="add-category-info">
            <div className="add-category-amount">
              <div className="add-category flex-col">
                <p className="fx-24">Khẩu phần</p>
                <select onChange={onChangHandler} name="amount">
                  <option value="1-2 người">1 - 2 người</option>
                  <option value="2-3 người">2- 3 người</option>
                </select>
              </div>
            </div>

            <div className="add-category-time">
              <div className="add-category flex-col">
                <p className="fx-24">Thời gian chế biến</p>
                <select onChange={onChangHandler} name="time">
                  <option value="5-10 phút">5-10 phút</option>
                  <option value="20-30 phút">20-30 phút</option>
                </select>
              </div>
            </div>

            <div className="add-category flex-col">
              <p className="fx-24">Loại món ăn</p>
              <select onChange={onChangHandler} name="category">
                <option value="Salad">Salad</option>
                <option value="Cuốn">Cuốn</option>
                <option value="Tráng miệng">Tráng miệng</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Mì">Mì</option>
                <option value="Pasta">Pasta</option>
                <option value="Bánh ngọt">Bánh ngọt</option>
                <option value="Thuần chay">Thuần chay</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Add;
