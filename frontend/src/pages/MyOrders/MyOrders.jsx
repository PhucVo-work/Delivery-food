import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import assert from "assert";
import { assets } from "../../assets/assets";
import { FaCheck } from "react-icons/fa6";
import { FaExclamation } from "react-icons/fa";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>Đơn hàng của bạn</h2>
      <div className="wrapper">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <div className="order-item-container">
                <img src={assets.parcel_icon1} alt="" />
                <p className="order-item-date">
                  {new Date(order.date).toLocaleDateString("vi-VN")}
                </p>
                <p className="order-item-hour">
                  {new Date(order.date).toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="order-item-info">
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <div  >
                  {order.payment ? (
                    <div className="order-payment">
                      <FaCheck className="icon-success" />
                      <p>Đã thanh toán</p>
                    </div>
                  ) : (
                    <div className="order-payment">
                      <FaExclamation className="icon-false" />
                      <p>Chưa Thanh Toán</p>
                    </div>
                  )}
                </div>
              </div>
              <p>Số món ăn: {order.items.length}</p>
              <p className="order-item-price">Tổng tiền: {order.amount}.000₫</p>
              <div className="space-between">
                <p>
                  <span>&#x25cf;</span>
                  <b>{order.status}</b>
                </p>
                <button onClick={fetchOrders}>Theo dõi đơn hàng</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
