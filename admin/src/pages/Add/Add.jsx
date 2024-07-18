import React from "react";
import "./Add.css";
import { assets } from "../../assets/assets";

const Add = () => {
  return (
    <div className="">
      <form className="add">
        <form className="flex-row">
          <div className="add-image-upload flex-col">
            <p>Tải ảnh lên</p>
            <label htmlFor="image">
              <img src={assets.upload_area} alt="" />
            </label>
            <input type="file" id="image" hidden required />
          </div>
          <div>
            <div className="add-product-name flex-col">
              <p>Tên món ăn</p>
              <input type="text" name="tên" placeholder="Nhập ở đây" />
            </div>
            <div className="add-product-description flex-col">
              <p>Mô tả món ăn</p>
              <textarea
                name="Mô tả"
                rows="6"
                placeholder="Viết mô tả ở đây"
                required
              ></textarea>
            </div>
            <div className="add-category-price">
              <div className="add-category flex-col">
                <p>Loại món ăn</p>
                <select name="Loại">
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
              <div className="add-category-price">
                <div className="add-category flex-col">
                  <p>Khẩu phần</p>
                  <select name="Loại">
                    <option value="1-2 người">1 - 2 người</option>
                    <option value="2-3 người">2- 3 người</option>
                  </select>
                </div>
              </div>
              <div className="add-category-price">
                <div className="add-category flex-col">
                  <p>Thời gian chế biến</p>
                  <select name="Loại">
                    <option value="5-10 phút">5-10 phút</option>
                    <option value="20-30 phút">20-30 phút</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="add-price flex-col">
              <p>Giá món ăn</p>
              <input type="Number" name="price" placeholder="VNĐ" />
            </div>
            <button type="submit" className="add-btn">
              Thêm món ăn
            </button>
          </div>
        </form>
      </form>
    </div>
  );
};

export default Add;
