import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("online"); // state để lưu phương thức thanh toán

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    
    // thanh toán online
    // let response = await axios.post(url+"/api/order/place", orderData, {headers: {token}});
    // if( response.data.success){
    //   const {session_url} = response.data;
    //   window.location.replace(session_url);
    // }else{
    //   alert("Lỗi")
    // }

    // tự code

    if (paymentMethod === "online") {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Ui...',
          text: response.data.message,
        });
      }
    } else if (paymentMethod === "cod") {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Thành công!',
          text: 'Thanh toán khi nhận hàng',
        });
        navigate("/myorders");
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Ui...',
          text: response.data.message,
        });
      }
    }
  };

  useEffect(()=>{
    if(!token){
      Swal.fire({
        icon: 'warning',
        title: 'Ui...',
        text: 'bạn cần đăng nhập để làm bước tiếp theo',
      });
      navigate('/cart') 
    } else if(getTotalCartAmount()===0){
      Swal.fire({
        icon: 'question',
        title: 'Ui...',
        text: 'Giỏ hàng của bạn đang trống',
      });
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            className=""
            placeholder="Tên đầu"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            className=""
            placeholder="Tên cuối"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="text"
          placeholder="Địa chỉ email"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Nhập địa chỉ cụ thể của bạn"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            className=""
            placeholder="Thành phố"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            className=""
            placeholder="Quận"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            className=""
            placeholder="Mã bưu chính"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            className=""
            placeholder="Đất nước"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Tổng tiền món ăn</p>
              <p>
                {getTotalCartAmount() === 0
                  ? "0₫"
                  : `${getTotalCartAmount()}.000₫`}
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Phí giao hàng</p>
              <p>{getTotalCartAmount() === 0 ? "0₫" : "20.000₫"}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Tổng tiền</b>
              <b>
                {getTotalCartAmount() === 0
                  ? "0₫"
                  : `${getTotalCartAmount() + 20}.000₫`}
              </b>
            </div>
          </div>
          <h2>Phương Thức Thanh Toán</h2>
          <div className="payment-method">
            <label className="option-list">
              <input
                className="option-payment"
                type="radio"
                name="paymentMethod"
                value="online"
                checked={paymentMethod === "online"}
                onChange={() => setPaymentMethod("online")}
              />
              <p>Thanh toán trực tuyến</p>
            </label>
            <label className="option-list">
              <input
                className="option-payment"
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <p>Thanh toán khi nhận hàng</p>
            </label>
          </div>
          <button type="submit">Thanh toán</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
