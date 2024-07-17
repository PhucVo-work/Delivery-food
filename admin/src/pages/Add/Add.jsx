import React from "react";
import "./Add.css";
import { assets } from "../../assets/assets";

const Add = () => {
  return (
    <div className="add">
      <form className="add">
        <form className="flex-col">
          <div className="add-image-upload flex-col">
            <p>Tải ảnh lên</p>
            <label htmlFor="image">
              <img src={assets.upload_area} alt="" />
            </label>
            <input type="file" id="image" hidden required />
          </div>
          <div className="add-product-name flex-col">
            <p>Tên món ăn</p>
            <input type="text" name="tên" placeholder="Nhập ở đây"/>
          </div>
          <div className="add-product-description flex-col">
            <p>Mô tả món ăn</p>
            <textarea name="Mô tả" rows='6' placeholder="Viết mô tả ở đây" required></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Loại món ăn</p>
              <select name="Loại">
                <option value="Salad">Salad</option>
                <option value="Cuốn">Cuốn</option>
                <option value="Tráng miệng">Tráng miệng</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
          </div>
        </form>
      </form>
    </div>
  );
};

export default Add;
