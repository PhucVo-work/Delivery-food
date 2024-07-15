import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { MdFastfood } from "react-icons/md";
import { TbShoppingBagEdit, TbShoppingBagPlus } from "react-icons/tb";


const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <div className="sidebar-option">
        <TbShoppingBagPlus className="icon" />
          <p>Thêm món ăn</p>
        </div>
        <div className="sidebar-option">
          <MdFastfood className="icon" />
          <p>Danh sách các món ăn</p>
        </div>
        <div className="sidebar-option">
          <TbShoppingBagEdit className="icon"/>
          <p>Đơn đặt hàng</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
