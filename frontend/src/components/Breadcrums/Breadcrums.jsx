import React from 'react'
import './Breadcrums.css'
import { FaChevronRight } from "react-icons/fa6";

const Breadcrums = (props) => {

    const { product } = props
  return (
    <div>
      <ul className="breadCrums-list" id='breadCrums'>
        <li className="breadCrums-item">
          Trang chủ
        </li>
        <li className="breadCrums-item">
          <FaChevronRight className='chercon-icon' />
          Món ăn
        </li>
        <li className="breadCrums-item">
          <FaChevronRight className='chercon-icon' />
          {product.category}
        </li>
        <li className="breadCrums-item">
          <FaChevronRight className='chercon-icon' />
          {product.name}
        </li>
      </ul>
    </div>
  )
}

export default Breadcrums
