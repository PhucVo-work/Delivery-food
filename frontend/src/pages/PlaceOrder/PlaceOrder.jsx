import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const { getTotalCartAmount } = useContext(StoreContext)

  return (
    <from className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" className='' placeholder='Tên đầu' />
          <input type="text" className='' placeholder='Tên cuối' />
        </div>
        <input type="text" placeholder='Địa chỉ email' />
        <input type="text" placeholder='Nhập địa chỉ cụ thể của bạn' />
        <div className="multi-fields">
          <input type="text" className='' placeholder='Thành phố' />
          <input type="text" className='' placeholder='Quận' />
        </div>
        <div className="multi-fields">
          <input type="text" className='' placeholder='Mã bưu chính' />
          <input type="text" className='' placeholder='Đất nước' />
        </div>
        <input type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
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
          <button>Thanh toán</button>
        </div>
      </div>
    </from>
  )
}

export default PlaceOrder
