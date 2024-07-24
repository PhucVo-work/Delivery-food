import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header' >
      <div className="header-contents">
        <h2>Đặt món ăn <br/>yêu thích của bạn</h2>
        <p className='header-introduce'>Được chọn từ thực đơn đa dạng, các món ăn ngon được chế biến từ nguyên liệu tốt nhất với chuyên môn ẩm thực cao. Với sứ mệnh thỏa mản cơn thèm ăn và nâng cao trải nghiêm của bạn, ăn ngon mỗi lần chọn.</p>
        <a href="#explore-menu">
          <button>Xem thực đơn</button>  
        </a>
      </div>
    </div>
  )
}

export default Header
