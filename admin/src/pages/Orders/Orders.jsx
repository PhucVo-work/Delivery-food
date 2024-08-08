import React, { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";
import { FaCheck } from "react-icons/fa6";
import { FaExclamation } from "react-icons/fa";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Đơn đặt hàng</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <div className="order-item-container">
              <img className="parcel-icon" src={assets.parcel_icon1} alt="" />
              <div className="order-item-time">
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
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>Địa chỉ: {order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">
                số điện thoại: {order.address.phone}
              </p>
            </div>
            <p className="f-16">Số món ăn: {order.items.length}</p>
            <div>
              <p className="f-16">Tổng Tiền: {order.amount}.000₫</p>
              <div>
                {order.payment 
                ?<div className="order-payment">
                    <FaCheck className="icon-success" />
                    <p>Đã thanh toán</p>
                </div> 
                :<div className="order-payment">
                    <FaExclamation className="icon-false" />
                    <p>Chưa Thanh Toán</p>
                </div>}
              </div>
            </div>

            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Đang làm món ăn">Đang làm món ăn</option>
              <option value="Đang giao hàng">Đang giao hàng</option>
              <option value="Đã giao hàng">Đã giao hàng</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
