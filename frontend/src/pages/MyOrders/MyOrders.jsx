import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import { FaCheck } from "react-icons/fa6";
import { FaExclamation } from "react-icons/fa";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [orderStatus, setOrderStatus] = useState({});

  const handleProcess = (orderId, process) => {
    setOrderStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: {
        isConfirm:
          process === "Quán nhận đơn" ||
          process === "Đang làm món ăn" ||
          process === "Đang giao hàng" ||
          process === "Đã giao hàng",
        isCooking:
          process === "Đang làm món ăn" ||
          process === "Đang giao hàng" ||
          process === "Đã giao hàng",
        isDelivery: process === "Đang giao hàng" || process === "Đã giao hàng",
        isDoneDelivery: process === "Đã giao hàng",
      },
    }));
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleUpdateOrder = async (orderId, status) => {
    try {
      // Fetch dữ liệu mới từ server
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      // Cập nhật lại data từ server
      const updatedOrders = response.data.data;
      setData(updatedOrders);

      // Tìm đơn hàng mới nhất dựa vào orderId
      const updatedOrder = updatedOrders.find((order) => order._id === orderId);

      if (updatedOrder) {
        // Sau khi đã có data mới, cập nhật trạng thái cho đúng orderId và status
        handleProcess(orderId, updatedOrder.status);
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>Đơn hàng của bạn</h2>
      {data.length===0 ? (
        <div className="empty">
          <img className="empty-img" src={assets.empty_bag} alt="" />
          <p className="empty-message">Bạn hiện không có đơn hàng nào.<br/> Vui lòng đặt hàng để hiển thị</p>
        </div>
      ) : (
        <div className="wrapper">
          {data.map((order) => {
            const status = orderStatus[order._id] || {};
            return (
              <div key={order._id} className="my-orders-order">
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
                    {order.items.map((item, index) => (
                      <span key={index}>
                        {item.name} x {item.quantity}
                        {index < order.items.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                  <div>
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
                  <div className="order-process-container">
                    <img
                      className={
                        status.isConfirm
                          ? "order-process-img-active"
                          : "order-process-img"
                      }
                      src={assets.check_order}
                      alt=""
                    />
                    <div className="order-process">
                      <span
                        className={
                          status.isCooking
                            ? "line-active"
                            : "order-process-line line-diabled"
                        }
                      ></span>
                      <img
                        className={
                          status.isCooking
                            ? "order-process-img-active"
                            : "order-process-img"
                        }
                        src={assets.cooking}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="space-between">
                  <p>Số món ăn: {order.items.length}</p>
                  <div className="delivery-process">
                    <span
                      className={
                        status.isDelivery
                          ? "line-active"
                          : "order-process-line line-diabled"
                      }
                    ></span>
                    <img
                      className={
                        status.isDelivery
                          ? "order-process-img-active"
                          : "order-process-img"
                      }
                      src={assets.delivery}
                      alt=""
                    />
                  </div>
                </div>
                <div className="space-between">
                  <p className="order-item-price">
                    Tổng tiền: {order.amount}.000₫
                  </p>
                  <div className="delivery-process">
                    <span
                      className={
                        status.isDoneDelivery
                          ? "line-active"
                          : "order-process-line line-diabled"
                      }
                    ></span>
                    <img
                      className={
                        status.isDoneDelivery
                          ? "order-process-img-active"
                          : "order-process-img"
                      }
                      src={assets.done_delivery}
                      alt=""
                    />
                  </div>
                </div>
                <div className="space-between">
                  <p>
                    <span>&#x25cf;</span>
                    <b>{order.status}</b>
                  </p>
                  <button
                    onClick={() => handleUpdateOrder(order._id, order.status)}
                  >
                    Theo dõi đơn hàng
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
