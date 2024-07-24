import React, { useContext } from 'react'
import {  useNavigate } from 'react-router-dom'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'

const Cart = () => {

  const {cartItems, food_list, removeFromCart, getTotalCartAmount, url} = useContext(StoreContext)
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item, index) => {
            if(cartItems[item._id] > 0){
              return (
                <div key={index} >
                  <div className='cart-items-item cart-items-title'>
                    <img src={url+"/images/"+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.price}.000₫</p>
                    <p>{cartItems[item._id]}</p> 
                    <p>{item.price*cartItems[item._id]}.000₫</p>
                    <img src={assets.cross_icon}  onClick={() => removeFromCart(item._id)} className='cross'/>
                  </div>
                  <hr />
                </div>
              )
            }
          })
        }
      </div>
      <div className='cart-bottom'>
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Tổng tiền món ăn</p>
              <p>{getTotalCartAmount()===0 ? "0₫" : `${getTotalCartAmount()}.000₫`}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Phí giao hàng</p>
              <p>{getTotalCartAmount()===0 ? "0₫" : "20.000₫"}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Tổng tiền</b>
              <b>{getTotalCartAmount()===0 ? "0₫" : `${getTotalCartAmount()+20}.000₫`}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')} >Tiến hành xác nhận</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Nếu bạn có mã giảm giá, nhập ở đây!</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Mã giảm giá' />
              <button>Xác nhận</button>
            </div>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default Cart
