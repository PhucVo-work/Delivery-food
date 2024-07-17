import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { MdFastfood } from "react-icons/md";
import { TbShoppingBagEdit, TbShoppingBagPlus } from "react-icons/tb";
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <TbShoppingBagPlus className="icon" />
            <p>Thêm món ăn</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <MdFastfood className="icon" />
          <p>Danh sách món ăn</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <TbShoppingBagEdit className="icon"/>
          <p>Đơn đặt hàng</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
