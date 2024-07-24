import React from 'react'
import './DetailProduct.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { FaPeopleLine, FaClock } from "react-icons/fa6";
import { TbShoppingBag, TbShoppingBagMinus, TbShoppingBagPlus } from "react-icons/tb";

const DetailProduct = ( props ) => {
    const { product } = props
    const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext)
  return (
    <div className='detail-product row'>
      <div className='detail-product-right l-6 m-7 c-12'>
          <p className='product-name'>{product.name}</p>
          <p className="product-description">{product.description}</p> 
          <span className='line'></span>
          <div className='product-buy'>
            <div className="product-price">

              <p className="price">Giá: {product.price}.000₫</p>

              <div className='product-buy'>
                {
                  !cartItems[product._id]  
                  ?<div className='buy' onClick={() => addToCart(product._id)}>
                    <p>Mua ngay</p>
                    <TbShoppingBag className='buy-icon' alt="" />  
                  </div>
                  :<div className="food-detail-counter">
                    <TbShoppingBagMinus className='icon-action' onClick={() => removeFromCart(product._id)}  alt="" />
                    <p>{cartItems[product._id]}</p>
                    <TbShoppingBagPlus className='icon-action' onClick={() => addToCart(product._id)}  alt="" />
                  </div>    
                }
              </div>              
            </div>
          </div>
      </div>
      <div className="detail-product-img l-5 m-4 c-12">
        <img src={url+"/images/"+product.image} alt="" className='product-image' />
        <div className='detail-product-sub'>
          
          <div className='detail-product-header'>
            <div className="detail-product-time">
                <FaClock className='time-icon'/>
                {product.time}
            </div>

            <div className='detail-product-amount'>
              <FaPeopleLine className='amount-icon'/>
              {product.amount}
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default DetailProduct
