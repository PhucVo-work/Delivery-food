import React, { useEffect, useRef } from 'react'
import './Header.css'
import Typed from 'typed.js';

const Header = () => {

  const typedElement = useRef(null);

  useEffect(() => {
    const options = {
      strings: ['Đặt món ăn yêu thích của bạn'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: false,
      showCursor: false,
    };

    const typed = new Typed(typedElement.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className='header' >
      <div className="header-contents">
        <div className="typing-container">
          <h2 className='header-title' ref={typedElement}></h2>
        </div>
        <p className='header-introduce'>Được chọn từ thực đơn đa dạng, các món ăn ngon được chế biến từ nguyên liệu tốt nhất với chuyên môn ẩm thực cao. Với sứ mệnh thỏa mản cơn thèm ăn và nâng cao trải nghiêm của bạn, ăn ngon mỗi lần chọn.</p>
        <a href="#explore-menu">
          <button>Xem thực đơn</button>  
        </a>
      </div>
    </div>
  )
}

export default Header
